<script lang="ts">
    import type { Child} from "$models/servers/subsonic/types";
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import TemporalListStore from "$stores/TemporalListStore";
	import PlaylistStore from "$stores/PlaylistStore";
	import PlayerMenuPlaylist from "./partials/PlayerMenuPlaylist.svelte";
	import PlayerStore from "$stores/PlayerStore";
	import { getAllSongFromDirectoryRecursive } from "$lib/ts/Helpers";
	import { onMount } from "svelte";

    export let api: SubsonicAPI;
    export let list: Child[] = [];

    export let callbackCheckSonByIndex: () => void;
    export let callbackUncheckSonByIndex: () => void;

    onMount(() => {
        allBtnsDisabled();
        TemporalListStore.clear();
        allBtnsEnabled();
    });

    let selectAllDisabled = false;
    let deselectAllDisabled = false;
    let addAllToPlaylistToEndDisabled = false;
    let addAllToPlaylistToEndAndPlayDisabled = false;
    let showListDisabled = false;

    /**
     * Enable all buttons
     */
    function allBtnsEnabled() {
        selectAllDisabled = false;
        deselectAllDisabled = false;
        addAllToPlaylistToEndDisabled = false;
        addAllToPlaylistToEndAndPlayDisabled = false;
        showListDisabled = false;
    }

    /**
     * Disable all buttons
     */
    function allBtnsDisabled() {
        selectAllDisabled = true;
        deselectAllDisabled = true;
        addAllToPlaylistToEndDisabled = true;
        addAllToPlaylistToEndAndPlayDisabled = true;
        showListDisabled = true;
    }

    /**
     * Button trigger
     * 
     * Add all songs to temporal list
     */
    function addAllSongToTemporalListV2() {
        allBtnsDisabled();

        TemporalListStore.clear();
        
        getAllSongFromDirectoryRecursive(list, api).then((songs) => {
            TemporalListStore.addList(songs);
            allBtnsEnabled();
            callbackCheckSonByIndex();
        });
    }

    /**
     * Add all songs to temporal list
     */
    // async function addAllSongToTemporalListV2Async() {

    //     // Prepare variables
    //     let localIndexes: number[] = [];
    //     let localSongs: Child[] = [];

    //     TemporalListStore.clear();
    //     let haveDirs = true;

    //     let _tmp_songs_ = getSongsAndDirs(list);

    //     // While we have directories, we will continue to search for songs
    //     while (haveDirs) {

    //         // If we have songs, we add them to the list
    //         if(_tmp_songs_.localSongs.length > 0){
    //             _tmp_songs_.localSongs.forEach(song => {
    //                 song.downloadSongUrl = api.downloadWoFetchSync({id: song.id});
    //                 song.songId = song.id;
    //                 song.checked = true;
    //                 localSongs.push(song);
    //             });
    //             localIndexes = localIndexes.concat(_tmp_songs_.localIndexes);
    //         }
    
    //         // If we have directories, we will search for songs in them
    //         if(_tmp_songs_.localDirIds.length > 0){
    //             let serverSongs = await getSongsFromArrayOfDirsAsync(_tmp_songs_.localDirIds);
    //             _tmp_songs_ = getSongsAndDirs(serverSongs);
    //         }else{
    //             // If we don't have directories, we finish the loop
    //             _tmp_songs_ = {
    //                 localDirIds: [],
    //                 localSongs: [],
    //                 localIndexes: []
    //             }
    //             haveDirs = false;
    //         }
    //     }

    //     // Add songs to temporal list
    //     // TemporalListStore.addList(localSongs);
    //     localSongs.forEach(song => {
    //         TemporalListStore.addSong(song);
    //     });

    //     console.log("finalizado localSongs", localSongs);
    //     callbackCheckSonByIndex();
    // }

    /**
     * Get songs and directories from a list of songs
     * 
     * @param _songs
     */
    // function getSongsAndDirs(_songs: Child[]){

    //     let localDirIds: string[] = [];
    //     let localSongs: Child[] = [];
    //     let localIndexes: number[] = [];

    //     _songs.forEach((song, index) => {
    //         if( song ){
    //             if (song.isDir) {
    //                 localDirIds.push(song.id);
    //             }else{
    //                 song.downloadSongUrl = api.downloadWoFetchSync({id: song.id});
    //                 song.songId = song.id;
    //                 song.checked = true;
    //                 localSongs.push(song);
    //                 localIndexes.push(index);
    //             }
    //         }
    //     });

    //     return {
    //         localDirIds,
    //         localSongs,
    //         localIndexes
    //     }
    // }

    /**
     * Get songs from an array of directories
     * 
     * @param ids 
     */
    // async function getSongsFromArrayOfDirsAsync(ids: string[]) {
    //     let arrOfDirs = ids.map(id => api.getMusicDirectory({id: id}) );
    //     let response = await Promise.all(arrOfDirs);
    //     let songs: Child[] = [];
    //     response.forEach(res => {
    //         songs = songs.concat(res.directory.child);
    //     });
    //     return songs;
    // }

    /**
     * Button trigger
     * 
     * Clear all songs from temporal list
     */
    function clearAllSongToTemporalList() {
        TemporalListStore.clear();
        callbackUncheckSonByIndex();
    }

    /**
     * Button trigger
     * 
     * Add all songs to main playlist
     */
    function addAllSongToMainPlaylistStore(){
        addAllSongToMainPlaylistStoreAsync()
    }

    /**
     * Add all songs to main playlist
     */
    async function addAllSongToMainPlaylistStoreAsync(){
        allBtnsDisabled();
        let _list = TemporalListStore.getSongList();

        // If list is empty, we add all songs
        if (_list.length === 0) {

            // await addAllSongToTemporalListV2Async();

            let songs = await getAllSongFromDirectoryRecursive(list, api);
            TemporalListStore.addList(songs);
            _list = TemporalListStore.getSongList();
            
        }

        PlaylistStore.addList(_list);
        
        setTimeout(() => {
            clearAllSongToTemporalList();
            allBtnsEnabled();
        }, 100);
    }

    /**
     * Button trigger
     * 
     * Add all songs to main playlist and play
     */
    function addAllSongToMainPlaylistStoreAndPlay(){
        addAllSongToMainPlaylistStoreAndPlayAsync()
    }

    /**
     * Add all songs to main playlist and play
     */
    async function addAllSongToMainPlaylistStoreAndPlayAsync(){
        allBtnsDisabled();
        let _list = TemporalListStore.getSongList();

        // If list is empty, we add all songs
        if (_list.length === 0) {

            // await addAllSongToTemporalListV2Async();

            let songs = await getAllSongFromDirectoryRecursive(list, api);
            TemporalListStore.addList(songs);
            _list = TemporalListStore.getSongList();
            
        }

        let index = PlaylistStore.getSongList().length;

        PlaylistStore.addList(_list);
        
        if (_list.length > 0) {
            let song = _list[0];
            PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
        }

        setTimeout(() => {
            clearAllSongToTemporalList();
            allBtnsEnabled();
        }, 100);
    }

    function shoGetSongList(){
        PlaylistStore.getSongList();
        TemporalListStore.getSongList();
    }

</script>

<div class="flex w-100 flex-row main-color">
    <button
        type="button"
        class="btn-small-control-list"
        disabled={selectAllDisabled}
        on:click={addAllSongToTemporalListV2}
        on:keypress={addAllSongToTemporalListV2}>
            Seleccionar todos
    </button>

    <button
        type="button"
        class="btn-small-control-list"
        disabled={deselectAllDisabled}
        on:click={clearAllSongToTemporalList}
        on:keypress={clearAllSongToTemporalList}>
            Deseleccionar todos
    </button>

    <button
        type="button"
        class="btn-small-control-list"
        disabled={addAllToPlaylistToEndDisabled}
        on:click={addAllSongToMainPlaylistStore}
        on:keypress={addAllSongToMainPlaylistStore}>
            Añadir al final
    </button>

    <button
        type="button"
        class="btn-small-control-list"
        disabled={addAllToPlaylistToEndAndPlayDisabled}
        on:click={addAllSongToMainPlaylistStoreAndPlay}
        on:keypress={addAllSongToMainPlaylistStoreAndPlay}>
            Añadir al final y Reproducir
    </button>

    <button
        type="button"
        class="btn-small-control-list cursor-help"
        disabled={showListDisabled}
        on:click={shoGetSongList}
        on:keypress={shoGetSongList}>
            Show list
    </button>

    <PlayerMenuPlaylist title="Add to playlist" />
    
    <slot name="extra-options"></slot>
</div>