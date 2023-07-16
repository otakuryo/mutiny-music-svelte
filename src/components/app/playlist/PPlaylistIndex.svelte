<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child, type PlaylistWithSongs, type Playlists } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import LineMusic from '$components/app/playlist/partials/LineMusic.svelte';
	import LineBack from '$components/app/playlist/partials/LineBack.svelte';
	import ControlsPlaylist from '$components/app/directory/partials/ControlsPlaylist.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';

    export let playlistId: string|undefined = undefined;
    let api: SubsonicAPI;
    let songsToRemoveFromPlaylist: number[] = [];

    let disableDeleteBtn = false;

    type PlaylistServerType = (SubsonicBaseResponse & { playlist: PlaylistWithSongs });

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
    function toggleDataFromServer(indexes: number[], state: boolean){
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
    function callbackCheckSongByIndex(indexes: number[] ){
        toggleDataFromServer(indexes, true);
    }

    /**
     * Callback for ControlsNavigationPlaylist
     * Set unchecked to false property on song from dataFromServer
     * 
     * @param indexes 
     */
    function callbackUncheckSongByIndex(indexes: number[] ){
        toggleDataFromServer(indexes, false);
    }

    // $: console.log(dataFromServer, dataFromServer.then((playlists) => {
    //     console.log(playlists);
    // }));

</script>

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then response}

        <LineBack refreshViewOnClick={refreshViewOnClick}/>

        <ControlsNavigationPlaylist
            list={response.playlist.entry}
            bind:api={api}
            callbackCheckSonByIndex={callbackCheckSongByIndex}
            callbackUncheckSonByIndex={callbackUncheckSongByIndex} >

            <div slot="extra-options">
                <button disabled={disableDeleteBtn} type="button" class="btn-small-control-list" on:click={updatePlaylistAndRemove} on:keydown={updatePlaylistAndRemove}>Guardar</button>
            </div>

        </ControlsNavigationPlaylist>

        {#if response.playlist.entry && response.playlist.entry.length > 0}
            {#each response.playlist.entry as song, index}
                <LineMusic bind:song={song} api={api} index={index} callbackRemove={appendSongForRemove} />
            {/each}
        {/if}
    {/await}
</div>