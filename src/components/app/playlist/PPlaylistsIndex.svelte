<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child, type Playlist, type Playlists } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import MusicFolderLineBack from '$components/app/musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import PlaylistLineSong from './partials/LinePlaylist.svelte';

    // export let playlistId: string|undefined = undefined;
    let api: SubsonicAPI;

    type PlaylistServerType = (SubsonicBaseResponse & { playlists: Playlists });

    let dataFromServer : Promise<PlaylistServerType> = Promise.resolve({} as (PlaylistServerType));

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

    async function getDataFromServer(): Promise<PlaylistServerType> {

        try {
            api = await initSubsonicApi();
            let resMusicPlaylist: PlaylistServerType = await api.getPlaylists();
            return resMusicPlaylist;
        } catch (error) {
            console.log(error); 
            return {} as PlaylistServerType;
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    // function toggleDataFromServer(indexes: number[], state: boolean){
    //     dataFromServer.then((libraries) => {
    //         libraries.forEach((library) => {
    //             if (library.directory) {
    //                 indexes.forEach((index) => {
    //                     library.directory.child[index].checked = state;
    //                 })
    //             }
    //         })
    //     })

    //     dataFromServer = dataFromServer;
    // }

    // function callbackCheckSonByIndex(indexes: number[] ){
    //     toggleDataFromServer(indexes, true);
    // }

    // function callbackUncheckSonByIndex(indexes: number[] ){
    //     toggleDataFromServer(indexes, false);
    // }

    $: console.log(dataFromServer, dataFromServer.then((playlists) => {
        console.log(playlists);
    }));

</script>

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then playlists}
        {#if playlists.playlists.playlist && playlists.playlists.playlist.length > 0}
            {#each playlists.playlists.playlist as playlist}
                <PlaylistLineSong playlist={playlist} api={api} refreshViewOnClick={refreshViewOnClick} />
            {/each}
        {/if}
    {/await}
</div>