<script lang="ts">

    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child, type IndexesID3 } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import LineArtist from './partials/LineArtist.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { indexes: IndexesID3 });

    export let musicFolderId: string|undefined = undefined;

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

            // if not playlistId, return empty object
            if (musicFolderId === undefined) return {} as IndexesTypeLocal;
            
            let resMusicPlaylist: IndexesTypeLocal = await api.getIndexesID3({musicFolderId: musicFolderId});
            return resMusicPlaylist;

        } catch (error) {
            console.log(error); 
            return {} as IndexesTypeLocal;
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}
</script>

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}

        {#if libraries.indexes.index && libraries.indexes.index.length > 0}
            {#each libraries.indexes.index as line}
                <div class="w-full pl-2"> {line.name} </div>
                {#if line.artist && line.artist.length > 0}

                    {#each line.artist as artist}
                        <LineArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    {/each}
                    
                {/if}
            {/each}
        {/if}

    {/await}
</div>