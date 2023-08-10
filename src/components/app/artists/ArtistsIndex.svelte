<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, ArtistsID3 } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineArtist from '$components/app/artists/partials/LineArtist.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
	import LoadingLineAr from './partials/LoadingLineAr.svelte';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
	import type { LetterLocal } from '$lib/types/global';

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
            return resMusic;

        } catch (error) {
            console.log(error); 
            return {} as IndexesTypeLocal;
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

</script>

<div class="main-left-panel">
    <div class="content-parent">
        {#await dataFromServer}
            <LoadingLineAr />
        {:then serverResponse}

            <div class="divide-y px-2 border-theme m-2">
                <IndexLetters letters={letters} />
            </div>

            {#if serverResponse.artists.index && serverResponse.artists.index.length > 0}
                <div class="divide-y px-2 border-theme m-2 overflow-y-scroll">
    
                    {#each serverResponse.artists.index as artistIndex}

                        <div class="main-color sticky w-full -top-1 z-10 p-2">
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
    
        {/await}
    </div>
</div>