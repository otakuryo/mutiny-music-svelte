<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Starred2, Child } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { AddItemToBreadcrumbs, MainServerSubsonicAPI, getCacheConfig } from '$lib/ts/Helpers';
	import LoadingLinePL from '$components/app/playlist/partials/LoadingLinePL.svelte';
	import LineArtist from '../artists/partials/LineArtist.svelte';

    let api: SubsonicAPI;

    type PlaylistStarredServerType2 = (SubsonicBaseResponse & { starred2: Starred2 });

    let dataFromServerStarred: Promise<PlaylistStarredServerType2> = Promise.resolve({} as (PlaylistStarredServerType2));

    onMount(async () => {
        addRouteToBreadcrumb();
        refreshViewOnClick();
    });

    function addRouteToBreadcrumb() {
        AddItemToBreadcrumbs("Starred Artists", "/playlists/starred-artists/");
    }

    async function getDataStarredFromServer(): Promise<PlaylistStarredServerType2> {

        try {
            api = MainServerSubsonicAPI();
            let resMusicPlaylist: PlaylistStarredServerType2 = await api.getStarred2();
            return resMusicPlaylist;
        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function refreshViewOnClick() {
        dataFromServerStarred = getDataStarredFromServer();
	}

    // $: console.log(dataFromServerStarred, dataFromServerStarred.then((playlists) => {
    //     console.log(playlists);
    // }));

    /**
     * Toggle checked property on song from dataFromServer
     * @param state 
     */
     function toggleDataFromServer(state: boolean){
        dataFromServerStarred.then((response) => {
            let list = response.starred2.song;
            if (!list) return;
            list.forEach((song: Child) => {
                song.checked = state;
            })
        })

        dataFromServerStarred = dataFromServerStarred;
    }

    function callbackCheckSonByIndex() {
        toggleDataFromServer(true);
    }

    function callbackUncheckSonByIndex() {
        toggleDataFromServer(false);
    }

    function clearCache(){
        console.log("clearCache");
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: "getStarred"})
        .then((count) => {
            console.log("Cache cleared", count);
            refreshViewOnClick();
        });
    }

</script>

<div class="main-left-panel">
    
    <div class="content-parent">

        {#await dataFromServerStarred}
            <LoadingLinePL />
        {:then response}
        
            <div class="main-color divide-y border-theme mx-2 mt-2">
                <LineBack url="/playlists" name="Playlists" />
            </div>
            
            <div class="divide-y border-theme mx-2 mt-2">

                <div class="flex flex-row">
                    <button
                        type="button"
                        class="btn-small-control-list"
                        on:click={clearCache}
                        on:keypress={clearCache}>
                            Clear cache
                    </button>
                </div>
                
            </div>

            {#if response.starred2.artist && response.starred2.artist.length > 0}
                <div class="main-color divide-y border-theme m-2 overflow-y-auto">
                    {#each response.starred2.artist as artist}
                        <LineArtist bind:artist={artist} api={api} refreshViewOnClick={refreshViewOnClick} />
                    {/each}
                </div>
            {/if}

        {:catch error}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">Error: {error.message}</div>
            </div>
            
        {/await}

    </div>
</div>