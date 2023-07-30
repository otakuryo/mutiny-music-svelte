<script lang="ts">
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';
	import { initSubsonicApi } from '$lib/js/Helpers';
    import type { SubsonicAPI, AlbumList2, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { onMount } from 'svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { albumList2: AlbumList2 });
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

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = await initSubsonicApi();

            let resMusic: IndexesTypeLocal = await api.getAlbumList2({type: orderBy, size: size, offset: currentOffset});
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

            if (data.albumList2.album && newData.albumList2.album) {
                data.albumList2.album = data.albumList2.album.concat(newData.albumList2.album);
            }
            
            loading = false;

            return data;
        });
    }
</script>

<div class="main-left-panel">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}

        {#if libraries.albumList2.album && libraries.albumList2.album.length > 0}
            {#each libraries.albumList2.album as album}

                <LineAlbumId3 album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}
        {/if}

        <div class="w-full flex justify-center">
            <button class="w-full dark:text-white text-zinc-700 font-bold my-1 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
        </div>

    {/await}
</div>