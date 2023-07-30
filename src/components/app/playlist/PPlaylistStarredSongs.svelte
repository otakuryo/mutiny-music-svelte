<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Starred, Child } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import LineBack from '$components/app/playlist/partials/LineBack.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { initSubsonicApi } from '$lib/js/Helpers';

    // export let playlistId: string|undefined = undefined;
    let api: SubsonicAPI;

    type PlaylistStarredServerType = (SubsonicBaseResponse & { starred: Starred });
    // type PlaylistStarredServerType2 = (SubsonicBaseResponse & { starred: Starred2 });

    let dataFromServerStarred: Promise<PlaylistStarredServerType> = Promise.resolve({} as (PlaylistStarredServerType));
    // let dataFromServerStarred2: Promise<PlaylistStarredServerType2> = Promise.resolve({} as (PlaylistStarredServerType2));

    onMount(async () => {
        dataFromServerStarred = getDataStarredFromServer();
    });

    // async function initSubsonicApi() {

    //     // Obtenemos los datos del servidor desde la memoria persistente
    //     let server = ServerConfigPersistent.get();
    //     console.log(server);
        
    //     const api = new SubsonicAPI({
    //         url: server.serverUrl,
    //         type: server.serverType, // or "generic" or "navidrome"
    //     });

    //     api.loginSync({
    //         username: server.username,
    //         password: server.password,
    //         serverName: server.serverName,
    //         version: server.serverVersion,
    //     });

    //     return api;
    // }

    async function getDataStarredFromServer(): Promise<PlaylistStarredServerType> {

        try {
            api = await initSubsonicApi();
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

    function callbackCheckSonByIndex(index: number[]) {
        toggleDataFromServer(true);
    }

    function callbackUncheckSonByIndex(index: number[]) {
        toggleDataFromServer(false);
    }
</script>

<div class="main-left-panel">
    {#await dataFromServerStarred}
        <div class="w-full">loading...</div>
    {:then response}
        <LineBack />
        
        {#if response.starred.song && response.starred.song.length > 0}
            <ControlsNavigationPlaylist api={api} list={response.starred.song} callbackCheckSonByIndex={callbackCheckSonByIndex} callbackUncheckSonByIndex={callbackUncheckSonByIndex} />

            {#each response.starred.song as song}
                <DirectoryLineMusic bind:song={song} api={api} />
            {/each}
        {/if}

    {/await}
</div>