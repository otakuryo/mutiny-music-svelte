<script lang="ts">

    import type {  SubsonicAPI, SubsonicBaseResponse, IndexesID3, IndexID3 } from '$models/servers/subsonic';
    import type { LetterLocal } from '$lib/types/global.d';
	import LineArtist from '$components/app/indexes/partials/LineArtist.svelte';
	import viewport from '$lib/js/useViewPortAction';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';
	import { AddItemToBreadcrumbs, MainServerSubsonicAPI, getCacheConfig } from '$lib/ts/Helpers';
	import LoadingLineIndex from '$components/app/indexes/partials/LoadingLineIndex.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { indexes: IndexesID3 });

    export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

    let letters: Array<LetterLocal> = [];

    // onMount(async () => {
    //     dataFromServer = getDataFromServer();
    // });

    $: if(musicFolderId) {
        refreshViewOnClick();
    }

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = MainServerSubsonicAPI();

            // if not playlistId, return empty object
            if (musicFolderId === undefined) return {} as IndexesTypeLocal;
            
            let resMusicPlaylist: IndexesTypeLocal = await api.getIndexesID3({musicFolderId: musicFolderId});

            getFirstLetterFromIndexes(resMusicPlaylist.indexes);
            
            AddItemToBreadcrumbs('Directories', `/indexes` );

            return resMusicPlaylist;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    function getFirstLetterFromIndexes(indexes: IndexesID3): Promise<void> {
        if (!indexes.index) {
            return Promise.resolve();
        }

        let _letters = indexes.index.map((element, index) => {
            return { name: element.name, active: false, id: `letter-${element.name}`};
        });

        letters = _letters;
        return Promise.resolve();
    }

    let lastActiveIndex = 0;
    function onShowLetter(index: number) {
        if (lastActiveIndex !== index) {
            letters[lastActiveIndex].active = false;
        }
        letters[index].active = true;
        lastActiveIndex = index;
    }

    function clearCache(){
        console.log("clearCache");
        if(!musicFolderId) return;
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: musicFolderId})
        .then((count) => {
            console.log("Cache cleared", count);
            refreshViewOnClick();
        });
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">
        
        {#await dataFromServer}
            <LoadingLineIndex />
        {:then libraries}
    
            <div class="main-color divide-y border-theme mx-2 mt-2">
                <BreadcrumbBase />
            </div>
    
            <div class="main-color divide-y border-theme mx-2 mt-2">
                <IndexLetters bind:letters={letters} />
            </div>

            {#if libraries.indexes.index && libraries.indexes.index.length > 0}
    
                <div class="divide-y border-theme m-2 overflow-y-scroll">
                    {#each libraries.indexes.index as line, index}
        
                        <!-- Stiky header -->
                        <div class="main-color-solid sticky w-full -top-1 z-10 p-2 ">
                            <div class="flex">
                                <!-- Letter -->
                                <div class="w-full pl-2 py-2 h-full uppercase" data-id-index="letter-{line.name}" id="letter-{line.name}"> {line.name} </div>
                                
                                <!-- Clear cache -->
                                <button
                                    type="button"
                                    class="btn-small-control-list whitespace-nowrap"
                                    on:click={clearCache}
                                    on:keypress={clearCache}>
                                        Clear cache
                                </button>

                            </div>
                        </div>
        
                        <!-- List of indexes -->
                        {#if line.artist && line.artist.length > 0}
                            <div class="divide-y" use:viewport on:enterViewport={() => {onShowLetter(index)} }>
                                {#each line.artist as artist}
                                    <LineArtist artist={artist} api={api} />
                                {/each}
                            </div>
                        {/if}
        
                    {/each}
                </div>
    
            {/if}
    
        {:catch error}

            <div class="divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">{error.message}</div>
            </div>
            
        {/await}
    </div>
</div>