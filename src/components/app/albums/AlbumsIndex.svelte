<script lang="ts">
    import { SubsonicAPI, type SubsonicBaseResponse, type AlbumList, type Child } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import LineAlbum from '$components/app/albums/partials/LineAlbum.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { albumList: AlbumList });
    type SubsonicSortType = 'alphabeticalByName'
			| 'alphabeticalByArtist'
			| 'byYear'
			| 'random'
			| 'newest'
			| 'highest'
			| 'frequent'
			| 'recent';

    // export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

    let orderBy: SubsonicSortType = 'alphabeticalByName';
    let size = 200;
    let currentOffset = 0;
    let loading = false;

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

            let resMusic: IndexesTypeLocal = await api.getAlbumList({type: orderBy, size: size, offset: currentOffset});
            currentOffset += size;
            return resMusic;

        } catch (error) {
            console.log(error); 
            return {} as IndexesTypeLocal;
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    async function loadMoreOnClick() {
        
        loading = true;

        let newData = await getDataFromServer();
        dataFromServer = Promise.resolve(dataFromServer).then((data) => {

            if (data.albumList.album && newData.albumList.album) {
                data.albumList.album = data.albumList.album.concat(newData.albumList.album);
            }
            
            loading = false;

            return data;
        });
    }
</script>

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}

        {#if libraries.albumList.album && libraries.albumList.album.length > 0}
            {#each libraries.albumList.album as album}

                <LineAlbum album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}
        {/if}

        <div class="w-full flex justify-center">
            <button class="w-full dark:text-white text-zinc-700 font-bold my-1 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
        </div>

    {/await}
</div>