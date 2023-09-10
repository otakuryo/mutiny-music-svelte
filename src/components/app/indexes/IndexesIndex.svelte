<script lang="ts">

    import type {  SubsonicAPI, SubsonicBaseResponse, IndexesID3 } from '$models/servers/subsonic';
    import type { LetterLocal } from '$lib/types/global.d';
	import { onMount } from 'svelte';
	import LineArtist from '$components/app/indexes/partials/LineArtist.svelte';
	import viewport from '$lib/js/useViewPortAction';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';
	import { AddItemToBreadcrumbs, MainServerSubsonicAPI } from '$lib/ts/Helpers';
	import LoadingLineIndex from '$components/app/indexes/partials/LoadingLineIndex.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { indexes: IndexesID3 });

    export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

    let letters: Array<LetterLocal> = [];

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    $: if(musicFolderId) {
        refreshViewOnClick();
    }

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = MainServerSubsonicAPI();

            // if not playlistId, return empty object
            if (musicFolderId === undefined) return {} as IndexesTypeLocal;
            
            let resMusicPlaylist: IndexesTypeLocal = await api.getIndexesID3({musicFolderId: musicFolderId});

            letters = getFirstLetterFromIndexes(resMusicPlaylist.indexes);
            console.log(letters);
            
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

    function getFirstLetterFromIndexes(indexes: IndexesID3): Array<LetterLocal> {
        if (!indexes.index) {
            return [];
        }

        let letters = indexes.index.map((element, index) => {
            return { name: element.name, active: false, id: `letter-${element.name}`};
        });

        return letters;
    }

    let lastActiveIndex = 0;
    function onShowLetter(index: number) {
        if (lastActiveIndex !== index) {
            letters[lastActiveIndex].active = false;
        }
        letters[index].active = true;
        lastActiveIndex = index;
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">
        
        {#await dataFromServer}
            <LoadingLineIndex />
        {:then libraries}
    
            <div class="divide-y border-theme mx-2 mt-2">
                <BreadcrumbBase />
            </div>
    
            <div class="divide-y border-theme mx-2 mt-2">
                <IndexLetters bind:letters={letters} />
            </div>
    
            {#if libraries.indexes.index && libraries.indexes.index.length > 0}
    
                <div class="divide-y border-theme m-2 overflow-y-scroll">
                    {#each libraries.indexes.index as line, index}
        
                        <div class="main-color sticky w-full -top-1 z-10 p-2 ">
                            <div class="w-full pl-2 h-8 uppercase" data-id-index="letter-{line.name}" id="letter-{line.name}"> {line.name} </div>
                        </div>
        
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