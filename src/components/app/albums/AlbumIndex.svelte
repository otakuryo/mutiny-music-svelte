<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child, type AlbumID3, type AlbumWithSongsID3 } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import MusicFolderLineBack from '$components/app/musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import ControlsPlaylist from '$components/app/directory/partials/ControlsPlaylist.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';

    type AlbumLocal = (SubsonicBaseResponse & { album: AlbumWithSongsID3 });

    export let albumId: string;
    let api: SubsonicAPI;

    let dataFromServer : Promise<AlbumLocal> = Promise.resolve({} as AlbumLocal);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function initSubsonicApi() {

        // Obtenemos los datos del servidor desde la memoria persistente
        let server = ServerConfigPersistent.get();
        console.log(server);
        
        const api = new SubsonicAPI({
            url: server.serverUrl,
            type: server.serverType, // or "generic" or "navidrome"
        });

        api.loginSync({
            username: server.username,
            password: server.password,
            serverName: server.serverName,
            version: server.serverVersion,
        });

        return api;
    }


    async function getDataFromServer(): Promise<AlbumLocal> {

        try {
            api = await initSubsonicApi();

            let resMusic: AlbumLocal = await api.getAlbum({id: albumId});
            return resMusic;

        } catch (error) {
            console.log(error); 
            return {} as AlbumLocal;
        }
    }

    // async function getDataFromServer(): Promise<AlbumLocal> {

    //     try {
    //         api = await initSubsonicApi();
    //     } catch (error) {
    //         console.log(error);
    //         return [];            
    //     }

    //     // const resPing: SubsonicBaseResponse = await api.ping()

    //     // // Si no hay una respuesta por parte del servidor, se para y no se hace nada
    //     // if (resPing.status !== "ok") {
    //     //     return [];
    //     // }

    //     await new Promise(r => setTimeout(r, 50));

    //     let resMusicDirectory: SubsonicBaseResponse[] = [];

    //     if (albumId) {
    //         resMusicDirectory.push(await api.getMusicDirectory({id: albumId}));
    //         return resMusicDirectory;
    //     }
        
    //     const resMusicFolders: SubsonicBaseResponse & { musicFolders: MusicFolders }  = await api.getMusicFolders()
    //     if (!resMusicFolders || !resMusicFolders.musicFolders || !resMusicFolders.musicFolders.musicFolder) {
    //         return [];
    //     }


    //     if (resMusicFolders.musicFolders.musicFolder.length > 0) {
    //         for(const folder of resMusicFolders.musicFolders.musicFolder) {
    //             resMusicDirectory.push(await api.getMusicDirectory({id: folder.id}))
    //         }
    //     }
        
    //     return resMusicDirectory;

    // }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    function toggleDataFromServer(indexes: number[], state: boolean){
        dataFromServer.then((albumResponse) => {
            if (albumResponse.album.song && albumResponse.album.song.length > 0) {
                albumResponse.album.song.forEach((song) => {
                      song.checked = state;
                })
            }
        })

        dataFromServer = dataFromServer;
    }

    function callbackCheckSonByIndex(indexes: number[] ){
        toggleDataFromServer(indexes, true);
    }

    function callbackUncheckSonByIndex(indexes: number[] ){
        toggleDataFromServer(indexes, false);
    }

</script>

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then albumResponse}

        {#if albumResponse.album.song && albumResponse.album.song.length > 0}
            <!-- {#if library.directory && library.directory.parent}
                <MusicFolderLineBack name={library.directory.name} id={library.directory.parent} refreshViewOnClick={refreshViewOnClick}  />
            {/if} -->

            <ControlsNavigationPlaylist
                api={api}
                list={albumResponse.album.song}
                callbackCheckSonByIndex={callbackCheckSonByIndex}
                callbackUncheckSonByIndex={callbackUncheckSonByIndex} />

            {#each albumResponse.album.song as song}

                    {#if song.isDir}
                        <DirectoryLineDirectory
                            directory={song}
                            api={api}
                            refreshViewOnClick={refreshViewOnClick} />

                    {:else}
                        <DirectoryLineMusic bind:song={song} api={api} />
                    {/if}

            {/each}
        {/if}
    {/await}
</div>