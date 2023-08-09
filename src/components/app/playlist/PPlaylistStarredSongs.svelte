<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Starred, Child } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import LineBack from '$components/app/playlist/partials/LineBack.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
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
            return resMusicPlaylist;
        } catch (error) {
            console.log(error); 
            return {} as PlaylistStarredServerType;
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
</script>

<div class="main-left-panel">
    <div class="content-parent">

        {#await dataFromServerStarred}
            <LoadingLinePL />
        {:then response}
            <div class="divide-y px-2 border-theme mx-2 mt-2">
                <LineBack />
            </div>
            
            {#if response.starred.song && response.starred.song.length > 0}

                <div class="divide-y px-2 border-theme mx-2 mt-2">
                    <ControlsNavigationPlaylist api={api} list={response.starred.song} callbackCheckSonByIndex={callbackCheckSonByIndex} callbackUncheckSonByIndex={callbackUncheckSonByIndex} />
                </div>
    
                <div class="divide-y border-theme m-2 overflow-y-auto">

                    {#each response.starred.song as song}
                        <DirectoryLineMusic bind:song={song} api={api} />
                    {/each}

                </div>
            {/if}
    
        {/await}
    </div>
</div>