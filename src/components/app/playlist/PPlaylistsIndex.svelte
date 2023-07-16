<script lang="ts">
    import { SubsonicAPI, type SubsonicBaseResponse, type Playlists, type Starred, type Starred2 } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import PlaylistLineSong from '$components/app/playlist/partials/LinePlaylist.svelte';
	import LineTitle from '$components/app/playlist/partials/LineTitle.svelte';
	import LineInternalUrl from '$components/app/playlist/partials/LineInternalUrl.svelte';
	import { Disc, Users } from 'lucide-svelte';

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

    // $: console.log(dataFromServer, dataFromServer.then((playlists) => {
    //     console.log(playlists);
    // }));

</script>

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then playlists}
    
        {#if playlists.playlists.playlist && playlists.playlists.playlist.length > 0}
            <LineTitle title="Playlists" />

            {#each playlists.playlists.playlist as playlist}
                <PlaylistLineSong playlist={playlist} api={api} refreshViewOnClick={refreshViewOnClick} />
            {/each}
        {/if}

    {/await}

    <LineInternalUrl url="/playlists/starred-songs/" title="Starred Songs" />
    <LineInternalUrl url="/playlists/starred-albums/" title="Starred Albums" >
        <div slot="icon">
            <Disc strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
        </div>
    </LineInternalUrl>

    <LineInternalUrl url="/playlists/starred-artists/" title="Starred Artists (Working)" >
        <div slot="icon">
            <Users strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
        </div>
    </LineInternalUrl>

</div>