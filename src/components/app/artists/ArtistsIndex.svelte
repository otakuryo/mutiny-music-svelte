<script lang="ts">
    import { SubsonicAPI, type SubsonicBaseResponse, type ArtistsID3 } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import LineArtist from '$components/app/artists/partials/LineArtist.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { artists: ArtistsID3 });

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

            let resMusic: IndexesTypeLocal = await api.getArtists();
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

<div class="divide-y w-6/12 fixed h-screen-wo-menu bottom-0 left-0 overflow-y-scroll">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then serverResponse}

        {#if serverResponse.artists.index && serverResponse.artists.index.length > 0}
            <div class="divide-y">

                {#each serverResponse.artists.index as artistIndex}
                    <div class="main-color sticky w-full pl-2 top-0 z-10"> {artistIndex.name} </div>

                    {#if artistIndex.artist && artistIndex.artist.length > 0}
                        {#each artistIndex.artist as artist}
                            <LineArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                        {/each}
                    {/if}
                        
                {/each}

            </div>

        {/if}

    {/await}
</div>