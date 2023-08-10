<script lang="ts">
    import type { SubsonicAPI, AlbumWithSongsID3, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
	import LoadingLineAl from './partials/LoadingLineAl.svelte';

    type AlbumLocal = (SubsonicBaseResponse & { album: AlbumWithSongsID3 });

    export let albumId: string;
    let api: SubsonicAPI;

    let dataFromServer : Promise<AlbumLocal> = Promise.resolve({} as AlbumLocal);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    $: if(albumId) {
        refreshViewOnClick();
    }

    async function getDataFromServer(): Promise<AlbumLocal> {

        try {
            api = await MainServerSubsonicAPI();

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

    function toggleDataFromServer(state: boolean){
        dataFromServer.then((albumResponse) => {
            if (albumResponse.album.song && albumResponse.album.song.length > 0) {
                albumResponse.album.song.forEach((song) => {
                      song.checked = state;
                })
            }
        })

        dataFromServer = dataFromServer;
    }

    function callbackCheckSonByIndex(){
        toggleDataFromServer(true);
    }

    function callbackUncheckSonByIndex(){
        toggleDataFromServer(false);
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">

        {#await dataFromServer}
            <LoadingLineAl />
        {:then albumResponse}
    
            {#if albumResponse.album.song && albumResponse.album.song.length > 0}
                <!-- {#if library.directory && library.directory.parent}
                    <MusicFolderLineBack name={library.directory.name} id={library.directory.parent} refreshViewOnClick={refreshViewOnClick}  />
                {/if} -->

                
                <div class="divide-y border-theme mx-2 mt-2">
                    <LineBack url="/albums" name="Albums" />
                </div>

                <div class="divide-y px-2 border-theme mx-2 mt-2">

                    <ControlsNavigationPlaylist
                        api={api}
                        list={albumResponse.album.song}
                        callbackCheckSonByIndex={callbackCheckSonByIndex}
                        callbackUncheckSonByIndex={callbackUncheckSonByIndex} />
                </div>
    
                <div class="divide-y px-2 border-theme mx-2 mt-2 overflow-y-scroll">
                    {#each albumResponse.album.song as song}
        
                            {#if song.isDir}
                                <DirectoryLineDirectory
                                    directory={song}
                                    api={api} />
        
                            {:else}
                                <DirectoryLineMusic bind:song={song} api={api} />
                            {/if}
        
                    {/each}
                </div>
                
            {/if}

        {/await}
    </div>
</div>