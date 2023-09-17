import type { BreadcrumbItem } from "$lib/types/global";
import { SubsonicAPI, type Child, type SubsonicConfigType } from "$models/servers/subsonic";
import BreadcrumbStore from "$stores/BreadcrumbStore";
import { ServerConfigObj, ServerConfigPersistent } from "$stores/ServerConfigStore";

/**
 * Returns the duration in mm:ss format
 * 
 * @param {number | undefined} duration
 */
let getDurationHuman = (duration: number|undefined) => {

    // Si no hay duración, se devuelve 00:00
    if (duration === undefined) return "00:00";

    // Si hay duración, se devuelve en formato mm:ss
    let minutes = Math.floor(duration / 60);
    let seconds = Math.round(duration - minutes * 60);

    let mmStr = minutes.toString().padStart(2, "0");
    let ssStr = seconds.toString().padStart(2, "0");
    return `${mmStr}:${ssStr}`;
}
/**
 * Convert bytes to megabytes
 * 
 * @param bytes Bytes to converter to megabytes
 * @returns Megabytes
 */
let getMegabytesFromBytes = (bytes: number|undefined, withBytes: boolean = false) => {
    
    if (bytes === undefined) return "0MB";
    
    if (withBytes) return `${Math.round(bytes / 1024 / 1024)}MB (${bytes} bytes)`;

    return `${Math.round(bytes / 1024 / 1024)}MB`;
}

let MainServerSubsonicAPI = () => {

    // Retrieve the server configuration
    let server = getServerSubsonicConfiguration()

    const api = new SubsonicAPI({
        url: server.serverUrl,
        type: server.serverType as SubsonicConfigType, // or "generic" or "navidrome"
    });

    api.loginSync({
        username: server.username,
        password: server.password,
        serverName: server.serverName,
        version: server.serverVersion,
    });

    return api;
}
/**
 * Return the server configuration
 * 
 * @returns MapStore<ServerConfig>
 */
let getServerSubsonicConfiguration = () => {

    // Retrieve the server configuration
    let server = ServerConfigObj.get();

    if (server === undefined || server && server.serverUrl == "") {

        console.log(`* MainServerSubsonicAPI -> Loading from localStorage`);

        // Retrieve the data from the persistent memory
        let serverLS = ServerConfigPersistent.get();
        Object.keys(serverLS).forEach((key) => {
            // @ts-ignore
            ServerConfigObj.setKey(key, serverLS[key]);
        });

        // Refresh the server variable
        server = ServerConfigObj.get();

    }

    return server;
}

/**
 * Add a new item to the breadcrumbs
 * 
 * @param name Text show on breadcrumbs
 * @param currentPath Url relative to the root of the app
 * 
 * @example
 * ```
 * addItemToBreadcrumbs("Home", "/serach?query=hello")
 * ```
 */
function AddItemToBreadcrumbs(name: string, currentPath: string) {
    
    let breadItem: BreadcrumbItem = {
        name: name,
        path: currentPath
    };

    BreadcrumbStore.addItem(breadItem);
}

/**
 * Remove the last item from the breadcrumbs
 */
function RemoveItemOnBreadcrumbs() {
    console.log('onGoBack');
    BreadcrumbStore.removeLastItem();
}

/**
 * Remove all items from the breadcrumbs
 */
function RemoveAllItemsOnBreadcrumbs() {
    console.log('onResetBack');
    BreadcrumbStore.clear();
}

/**
 * Get all songs from a directory and its subdirectories
 * 
 * @param list Songs list
 * @param api SubsonicAPI
 * @returns 
 */
async function getAllSongFromDirectoryRecursive(list: Child[], api: SubsonicAPI){


    /**
     * Add all songs to temporal list
     */
    async function getAllSongsRecursive() {

        // Prepare variables
        let localIndexes: number[] = [];
        let localSongs: Child[] = [];

        //// TemporalListStore.clear();
        let haveDirs = true;

        let _tmp_songs_ = getSongsAndDirs(list);

        // While we have directories, we will continue to search for songs
        while (haveDirs) {

            // If we have songs, we add them to the list
            if(_tmp_songs_.localSongs.length > 0){
                _tmp_songs_.localSongs.forEach(song => {
                    song.downloadSongUrl = api.downloadWoFetchSync({id: song.id});
                    song.songId = song.id;
                    song.checked = true;
                    localSongs.push(song);
                });
                localIndexes = localIndexes.concat(_tmp_songs_.localIndexes);
            }
    
            // If we have directories, we will search for songs in them
            if(_tmp_songs_.localDirIds.length > 0){
                let serverSongs = await getSongsFromArrayOfDirsAsync(_tmp_songs_.localDirIds);
                _tmp_songs_ = getSongsAndDirs(serverSongs);
            }else{
                // If we don't have directories, we finish the loop
                _tmp_songs_ = {
                    localDirIds: [],
                    localSongs: [],
                    localIndexes: []
                }
                haveDirs = false;
            }
        }

        // Add songs to temporal list
        // TemporalListStore.addList(localSongs);
        // localSongs.forEach(song => {
        //     TemporalListStore.addSong(song);
        // });

        console.log("Helpers.ts --> finalizado localSongs", localSongs);
        // callbackCheckSonByIndex();
        return localSongs;
    }

    /**
     * Get songs and directories from a list of songs
     * 
     * @param _songs
     */
    function getSongsAndDirs(_songs: Child[]){

        let localDirIds: string[] = [];
        let localSongs: Child[] = [];
        let localIndexes: number[] = [];

        _songs.forEach((song, index) => {
            if( song ){
                if (song.isDir) {
                    localDirIds.push(song.id);
                }else{
                    song.downloadSongUrl = api.downloadWoFetchSync({id: song.id});
                    song.songId = song.id;
                    song.checked = true;
                    localSongs.push(song);
                    localIndexes.push(index);
                }
            }
        });

        return {
            localDirIds,
            localSongs,
            localIndexes
        }
    }

    /**
     * Get songs from an array of directories
     * 
     * @param ids 
     */
    async function getSongsFromArrayOfDirsAsync(ids: string[]) {
        let arrOfDirs = ids.map(id => api.getMusicDirectory({id: id}) );
        let response = await Promise.all(arrOfDirs);
        let songs: Child[] = [];
        response.forEach(res => {
            songs = songs.concat(res.directory.child);
        });
        return songs;
    }

    return await getAllSongsRecursive();
}

/**
 * Get the configuration of the cache
 */
function getCacheConfig(){

    const cacheObj = {
        nameCache: 'MutinyMusicCache',
        checkIfSupported: function() {
            if (!('caches' in window)) {
                console.log('Cache API not supported.');
                return false;
            }
            return true;
        },
        init: async function() {
            return await caches.open(this.nameCache);
        },
        set: async function({urlKey, dataJSON}: {urlKey: string, dataJSON: string}) {
            const cache = await caches.open(this.nameCache);
            cache.put(urlKey, new Response(dataJSON));
        },
        deleteKeyMatch: async function({stringMatch}: {stringMatch: string}) {
            const cache = await caches.open(this.nameCache);
            let k = await cache.keys();
            let count = 0;
            await Promise.all(k.map(async (key) => {
                if(key.url.includes(stringMatch)){
                    await cache.delete(key);
                    count++;
                }
            }));

            return count;
        },
        delete: async function({urlKey}: {urlKey: string}) {
            const cache = await caches.delete(urlKey);
            return cache;
        },
        get: async function({urlKey}: {urlKey: string}) {
            const cache = await caches.open(this.nameCache);
            let r = await cache.match(urlKey);
            if(r === undefined) return undefined;
            let response = await r.json();
            return response;
        }
    }

    return cacheObj;
}

export { 
    getDurationHuman,
    getMegabytesFromBytes,
    MainServerSubsonicAPI,
    AddItemToBreadcrumbs,
    RemoveItemOnBreadcrumbs,
    RemoveAllItemsOnBreadcrumbs,
    getAllSongFromDirectoryRecursive,
    getCacheConfig
};