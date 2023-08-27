<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Child, PlaylistWithSongs } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineMusic from '$components/app/playlist/partials/LineMusic.svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/ts/Helpers';
	import LoadingLinePL from '$components/app/playlist/partials/LoadingLinePL.svelte';

    import { createQuery } from '@tanstack/svelte-query'

    export let playlistId: string;
    let api: SubsonicAPI = MainServerSubsonicAPI();
    let songsToRemoveFromPlaylist: number[] = [];

    let disableDeleteBtn = false;

    type PlaylistServerType = (SubsonicBaseResponse & { playlist: PlaylistWithSongs }) | undefined;

    let globalData: PlaylistServerType = undefined;

    // Access the client
    // const queryClient = useQueryClient()

    // Queries
    const queryGeneral = createQuery({
        queryKey: [api.getPlaylistWoFetchSync({id: playlistId })],
        queryFn: getDataFromServer,
        staleTime: 1000 * 60 * 15, // 15 minutes
        cacheTime: 1000 * 60 * 20, // 20 minutes
        onSuccess: (data) => {
            console.log("onSuccess >>>");
            globalData = data;
        },
    })

    onMount(async () => {
        refreshViewOnClick();
    });

    // $: if(playlistId) {
    //     refreshViewOnClick();
    // }

    async function getDataFromServer(): Promise<PlaylistServerType> {

        try {
            // if not playlistId, return empty object
            if (playlistId === undefined) return {} as PlaylistServerType;
            
            let resMusicPlaylist: PlaylistServerType = await api.getPlaylist({id: playlistId});
            return resMusicPlaylist;

        } catch (error) {
            console.log(error); 
            return {} as PlaylistServerType;
        }
    }

    function refreshViewOnClick() {
        $queryGeneral.refetch();
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
            $queryGeneral.refetch();
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
        
        if (!globalData || !globalData.playlist.entry) return;

        globalData.playlist.entry.forEach((song: Child) => {
            song.checked = state;
        })

        globalData = globalData;

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
            
        {#if $queryGeneral.isLoading}
            <LoadingLinePL />
        {:else if $queryGeneral.error}
            <div>
                Error...
            </div>
        {:else if $queryGeneral.isSuccess && $queryGeneral.data }

            {#if globalData && globalData.playlist.entry && globalData.playlist.entry.length > 0}
                <div class="divide-y px-2 border-theme mx-2 mt-2">
                    <LineBack url="/playlists" name={globalData.playlist.name} />
                </div>
    
                <div class="divide-y px-2 border-theme mx-2 mt-2">

                    <ControlsNavigationPlaylist
                        list={globalData.playlist.entry}
                        callbackCheckSonByIndex={callbackCheckSongByIndex}
                        callbackUncheckSonByIndex={callbackUncheckSongByIndex} >

                        <div slot="extra-options">
                            <button disabled={disableDeleteBtn} type="button" class="btn-small-control-list" on:click={updatePlaylistAndRemove} on:keydown={updatePlaylistAndRemove}>Guardar</button>
                        </div>
            
                    </ControlsNavigationPlaylist>
                </div>

                <div class="divide-y px-2 border-theme m-2 overflow-y-scroll">
                    {#each globalData.playlist.entry as song, index}
                        <LineMusic bind:song={song} index={index} callbackRemove={appendSongForRemove} />
                    {/each}
                </div>

            {/if}
        {:else}

            <div class="divide-y px-2 border-theme mx-2 mt-2">
                <LineBack url="/playlists" name="Playlists" />
            </div>
            
            <div class="divide-y px-2 border-theme mx-2 mt-2 p-2">
                No data...
            </div>
        {/if}

    </div>
</div>