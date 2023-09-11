<script lang="ts">
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';
	import { MainServerSubsonicAPI } from '$lib/ts/Helpers';
    import type { SubsonicAPI, AlbumList2, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { afterUpdate, onMount } from 'svelte';
	import LoadingLineAl from '$components/app/albums/partials/LoadingLineAl.svelte';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';
	import BreadcrumbStore from '$stores/BreadcrumbStore';
	import { AddItemToBreadcrumbs } from '$lib/ts/Helpers';

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
            api = MainServerSubsonicAPI();

            let resMusic: IndexesTypeLocal = await api.getAlbumList2({type: orderBy, size: size, offset: currentOffset});
            AddItemToBreadcrumbs('Albums', `/albums` );
            currentOffset += size;
            return resMusic;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
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

    // Elements for update scroll on refresh
    let elementContentParent: HTMLElement;
    let lastScrollTop = 0;

    afterUpdate(() => {
        if (elementContentParent)
            elementContentParent.scrollTop = lastScrollTop;
    });

    function onScroll(e: Event) {
        lastScrollTop = (e.target as HTMLElement).scrollTop;
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">
        
        {#await dataFromServer}
            <LoadingLineAl />
        {:then libraries}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <BreadcrumbBase />
            </div>

            <div class="main-color overflow-y-auto divide-y border-theme m-2" bind:this={elementContentParent} on:scroll={onScroll}>
        
                {#if libraries.albumList2.album && libraries.albumList2.album.length > 0}
                    {#each libraries.albumList2.album as album}
        
                        <LineAlbumId3 album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                            
                    {/each}
                {/if}
        
                <div class="w-full flex justify-center">
                    <button class="w-full dark:text-white text-zinc-700 font-bold m-1 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
                </div>
            </div>
    
        {:catch error}
            <div class="divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">{error.message}</div>
            </div>
            
        {/await}
    </div>
</div>