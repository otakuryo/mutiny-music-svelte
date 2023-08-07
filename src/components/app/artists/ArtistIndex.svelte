<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, ArtistWithAlbumsID3 } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';

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
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then serverResponse}

        {#if serverResponse.artist.album && serverResponse.artist.album.length > 0}
        
            <div class="navigation-sticky">
                <LineBack url="/artists" name="Volver" />
            </div>
            
            {#each serverResponse.artist.album as album}

                <LineAlbumId3 album={album} api={api} />
                    
            {/each}

        {/if}

    {/await}
</div>