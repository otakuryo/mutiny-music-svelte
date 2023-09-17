<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, ArtistsID3 } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineArtist from '$components/app/artists/partials/LineArtist.svelte';
	import { MainServerSubsonicAPI, getCacheConfig } from '$lib/ts/Helpers';
	import LoadingLineAr from './partials/LoadingLineAr.svelte';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
	import type { LetterLocal } from '$lib/types/global';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';
	import { AddItemToBreadcrumbs } from '$lib/ts/Helpers';

    type IndexesTypeLocal = (SubsonicBaseResponse & { artists: ArtistsID3 });

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;
    let letters: Array<LetterLocal>;

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = MainServerSubsonicAPI();

            let resMusic: IndexesTypeLocal = await api.getArtists();
            letters = getFirstLetterFromArtists(resMusic.artists);

            AddItemToBreadcrumbs('Artists', `/artists` );
            
            return resMusic;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function getFirstLetterFromArtists(artists: ArtistsID3): Array<LetterLocal> {
        if (!artists.index) {
            return [];
        }

        let letters = artists.index.map((element, index) => {
            return { name: element.name, active: false, id: `letter-${element.name}`};
        });

        return letters;
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    function clearCache(){
        console.log("clearCache");
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: "getArtists"})
        .then((count) => {
            console.log("Cache cleared", count);
            refreshViewOnClick();
        });
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">
        {#await dataFromServer}
            <LoadingLineAr />
        {:then serverResponse}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <BreadcrumbBase />
            </div>

            <div class="main-color divide-y px-2 border-theme m-2">
                <IndexLetters letters={letters} />
            </div>

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <div class="flex w-100 flex-row main-color">
                    <button
                        type="button"
                        class="btn-small-control-list"
                        on:click={clearCache}
                        on:keypress={clearCache}>
                            Clear cache
                    </button>
                </div>
            </div>

            {#if serverResponse.artists.index && serverResponse.artists.index.length > 0}
                <div class="main-color divide-y border-theme m-2 overflow-y-scroll">
    
                    {#each serverResponse.artists.index as artistIndex}

                        <div class="main-color-solid sticky w-full -top-1 z-10 p-2">
                            {artistIndex.name} 
                        </div>

                        <div data-id-index="letter-{artistIndex.name}" class="opacity-0"></div>
                        
                        {#if artistIndex.artist && artistIndex.artist.length > 0}
                            {#each artistIndex.artist as artist}
                                <LineArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                            {/each}
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