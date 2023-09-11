<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Child, PlaylistWithSongs } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineMusic from '$components/app/playlist/partials/LineMusic.svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/ts/Helpers';
	import LoadingLinePL from '$components/app/playlist/partials/LoadingLinePL.svelte';

    export let playlistId: string|undefined = undefined;
    let api: SubsonicAPI;
    let songsToRemoveFromPlaylist: number[] = [];

    let disableDeleteBtn = false;

    type PlaylistServerType = (SubsonicBaseResponse & { playlist: PlaylistWithSongs });

    let dataFromServer : Promise<PlaylistServerType> = Promise.resolve({} as (PlaylistServerType));

    onMount(async () => {
        refreshViewOnClick();
    });

    $: if(playlistId) {
        refreshViewOnClick();
    }

    async function getDataFromServer(): Promise<PlaylistServerType> {

        try {
            api = MainServerSubsonicAPI();

            // if not playlistId, return empty object
            if (playlistId === undefined) return {} as PlaylistServerType;
            
            let resMusicPlaylist: PlaylistServerType = await api.getPlaylist({id: playlistId});
            return resMusicPlaylist;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    /**
     * Update playlist and remove songs
     */
    async function updatePlaylistAndRemove(){
        console.log("updatePlaylistAndRemove");
        
        // if songsToRemoveFromPlaylist is empty or playlistId is undefined, break function
        if (songsToRemoveFromPlaylist.length === 0 || playlistId === undefined) return;
        if (disableDeleteBtn) return;
        disableDeleteBtn = true;
        
        let response = await api.updatePlaylist({playlistId: playlistId, songIndexToRemove: songsToRemoveFromPlaylist});

        if (response.status === "ok") {
            songsToRemoveFromPlaylist = [];
            dataFromServer = getDataFromServer();
            disableDeleteBtn = false;
        }
    }

    /**
     * Append song to remove from playlist
     * @param songId 
     * @param push 
     */
    function appendSongForRemove(songId: number, push: boolean = true) {
        if (push) {
            songsToRemoveFromPlaylist.push(songId);
        } else {
            songsToRemoveFromPlaylist = songsToRemoveFromPlaylist.filter((song) => song !== songId)
        };
    }


    /**
     * Toggle checked property on song from dataFromServer
     * @param indexes 
     * @param state 
     */
    function toggleDataFromServer(state: boolean){
        dataFromServer.then((response) => {
            let list = response.playlist.entry;
            if (!list) return;
            list.forEach((song: Child) => {
                song.checked = state;
            })
        })

        dataFromServer = dataFromServer;
    }

    /**
     * Callback for ControlsNavigationPlaylist
     * Set checked to true property on song from dataFromServer
     * 
     * @param indexes 
     */
    function callbackCheckSongByIndex(){
        toggleDataFromServer(true);
    }

    /**
     * Callback for ControlsNavigationPlaylist
     * Set unchecked to false property on song from dataFromServer
     * 
     * @param indexes 
     */
    function callbackUncheckSongByIndex(){
        toggleDataFromServer(false);
    }

    // $: console.log(dataFromServer, dataFromServer.then((playlists) => {
    //     console.log(playlists);
    // }));

</script>

<div class="main-left-panel">
    <div class="content-parent">
            
        {#await dataFromServer}
            <LoadingLinePL />
        {:then response}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <LineBack url="/playlists" name="Playlists" />
            </div>
    
            <div class="divide-y border-theme mx-2 mt-2">

                <ControlsNavigationPlaylist
                    list={response.playlist.entry}
                    bind:api={api}
                    callbackCheckSonByIndex={callbackCheckSongByIndex}
                    callbackUncheckSonByIndex={callbackUncheckSongByIndex} >

                    <div slot="extra-options">
                        <button disabled={disableDeleteBtn} type="button" class="btn-small-control-list" on:click={updatePlaylistAndRemove} on:keydown={updatePlaylistAndRemove}>Guardar</button>
                    </div>
        
                </ControlsNavigationPlaylist>
            </div>
    
    
            {#if response.playlist.entry && response.playlist.entry.length > 0}

                <div class="main-color divide-y border-theme m-2 overflow-y-scroll">
                    {#each response.playlist.entry as song, index}
                        <LineMusic bind:song={song} api={api} index={index} callbackRemove={appendSongForRemove} />
                    {/each}
                </div>
            {/if}

        {:catch error}

            <div class="divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">Error: {error.message}</div>
            </div>
            
        {/await}

    </div>
</div>