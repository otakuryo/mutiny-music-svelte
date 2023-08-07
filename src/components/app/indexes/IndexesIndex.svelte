<script lang="ts">

    import type {  SubsonicAPI, SubsonicBaseResponse, IndexesID3 } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineArtist from './partials/LineArtist.svelte';
	import viewport from '$lib/js/useViewPortAction';
    import type { LetterLocal } from '$lib/types/global.d';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';

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
            

            return resMusicPlaylist;

        } catch (error) {
            console.log(error); 
            return {} as IndexesTypeLocal;
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
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}

        <IndexLetters bind:letters={letters} />

        {#if libraries.indexes.index && libraries.indexes.index.length > 0}

            {#each libraries.indexes.index as line, index}

                <div class="border-b-0">
                    <div class="w-full pl-2 h-8 uppercase" data-id-index="letter-{line.name}" id="letter-{line.name}"> {line.name} </div>
                </div>

                {#if line.artist && line.artist.length > 0}
                    <div class="divide-y" use:viewport on:enterViewport={() => {onShowLetter(index)} }>
                        {#each line.artist as artist}
                            <LineArtist artist={artist} api={api} refreshViewOnClick={()=>{}}/>
                        {/each}
                    </div>
                {/if}

            {/each}

        {/if}

    {/await}
</div>