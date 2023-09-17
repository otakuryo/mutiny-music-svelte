<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Starred, Child } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { MainServerSubsonicAPI, getCacheConfig } from '$lib/ts/Helpers';
	import LoadingLinePL from '$components/app/playlist/partials/LoadingLinePL.svelte';

    // export let playlistId: string|undefined = undefined;
    let api: SubsonicAPI;

    type PlaylistStarredServerType = (SubsonicBaseResponse & { starred: Starred });
    // type PlaylistStarredServerType2 = (SubsonicBaseResponse & { starred: Starred2 });

    let dataFromServerStarred: Promise<PlaylistStarredServerType> = Promise.resolve({} as (PlaylistStarredServerType));
    // let dataFromServerStarred2: Promise<PlaylistStarredServerType2> = Promise.resolve({} as (PlaylistStarredServerType2));

    onMount(async () => {
        dataFromServerStarred = getDataStarredFromServer();
    });

    async function getDataStarredFromServer(): Promise<PlaylistStarredServerType> {

        try {
            api = MainServerSubsonicAPI();
            let resMusicPlaylist: PlaylistStarredServerType = await api.getStarred();

            // console.log("Sort 1");

            // if (!resMusicPlaylist.starred.song) return resMusicPlaylist;

            // console.log("Sort 2");
            
            // resMusicPlaylist.starred.song = resMusicPlaylist.starred.song.sort((a, b) => {

            //     if (a.created === undefined || b.created === undefined) return 0;

            //     if (a.created < b.created) return 1;
            //     if (a.created > b.created) return -1;
                
            //     return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
            // });

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
            let list = response.starred.song;
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
            
            {#if response.starred.song && response.starred.song.length > 0}

                <div class="divide-y border-theme mx-2 mt-2">
                    <ControlsNavigationPlaylist
                        api={api}
                        list={response.starred.song}
                        callbackCheckSonByIndex={callbackCheckSonByIndex}
                        callbackUncheckSonByIndex={callbackUncheckSonByIndex} >

                        <div slot="extra-options">
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

                    </ControlsNavigationPlaylist>
                </div>
    
                <div class="main-color divide-y border-theme m-2 overflow-y-auto">

                    {#each response.starred.song as song}
                        <DirectoryLineMusic bind:song={song} api={api} />
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