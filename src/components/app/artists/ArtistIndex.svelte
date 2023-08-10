<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, ArtistWithAlbumsID3 } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
	import LoadingLineAr from './partials/LoadingLineAr.svelte';

    type IndexesTypeLocal = (SubsonicBaseResponse & { artist: ArtistWithAlbumsID3 });

    export let artistID: string;

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    $: if(artistID) {
        refreshViewOnClick();
    }

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = MainServerSubsonicAPI();

            let resMusic: IndexesTypeLocal = await api.getArtistWithAlbums({id: artistID});
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
    <div class="content-parent">

        {#await dataFromServer}
            <LoadingLineAr />
        {:then serverResponse}
    
            {#if serverResponse.artist.album && serverResponse.artist.album.length > 0}

                <div class="divide-y px-2 border-theme mx-2 mt-2">
                    <LineBack url="/artists" name="Volver" />
                </div>
                
                <div class="divide-y px-2 border-theme mx-2 mt-2">
                    {#each serverResponse.artist.album as album}
        
                        <LineAlbumId3 album={album} api={api} />
                            
                    {/each}
                </div>
            {/if}
        {/await}
    </div>
</div>