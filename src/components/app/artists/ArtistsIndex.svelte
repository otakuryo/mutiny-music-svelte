<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, ArtistsID3 } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineArtist from '$components/app/artists/partials/LineArtist.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';

    type IndexesTypeLocal = (SubsonicBaseResponse & { artists: ArtistsID3 });

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = MainServerSubsonicAPI();

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

<div class="main-left-panel">
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