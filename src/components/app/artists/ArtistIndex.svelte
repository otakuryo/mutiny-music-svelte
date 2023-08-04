<script lang="ts">
    import { SubsonicAPI, type SubsonicBaseResponse, type ArtistsID3, type ArtistWithAlbumsID3 } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { artist: ArtistWithAlbumsID3 });

    export let artistID: string;

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

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

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = await initSubsonicApi();

            let resMusic: IndexesTypeLocal = await api.getArtist({id: artistID});
            return resMusic;

        } catch (error) {
            console.log(error); 
            return {} as IndexesTypeLocal;
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

</script>

<div class="main-left-panel">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then serverResponse}

        {#if serverResponse.artist.album && serverResponse.artist.album.length > 0}
        
            <div class="navigation-sticky">
                <LineBack url="/artists" name="Volver" refreshViewOnClick={refreshViewOnClick} />
            </div>
            
            {#each serverResponse.artist.album as album}

                <LineAlbumId3 album={album} api={api} refreshViewOnClick={refreshViewOnClick} />
                    
            {/each}

        {/if}

    {/await}
</div>