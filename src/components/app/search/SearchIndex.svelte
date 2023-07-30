<script lang="ts">
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
    import type { SearchResult3, SubsonicAPI, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import BoxAlbum from './partials/BoxAlbum.svelte';
	import BoxArtist from './partials/BoxArtist.svelte';
	import BoxSong from './partials/BoxSong.svelte';

    type SearchResult = (SubsonicBaseResponse & { searchResult3: SearchResult3 });

    // export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<SearchResult> = Promise.resolve({} as (SearchResult));
    let api: SubsonicAPI;

    let loading = false;

    export let query: string = 'a';
    let artistCount = 10;
    let artistOffset = 0;
    let albumCount = 10;
    let albumOffset = 0;
    let songCount = 10;
    let songOffset = 0;
    let musicFolderId: string|undefined = undefined;
    
    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<SearchResult> {

        try {
            api = MainServerSubsonicAPI();

            console.log(query);
            
            let resMusic: SearchResult = await api.search3({
                query,
                artistCount,
                artistOffset,
                albumCount,
                albumOffset,
                songCount,
                songOffset,
                musicFolderId,
            });

            console.log(resMusic);
            
            return resMusic;

        } catch (error) {
            console.log(error); 
            return {} as SearchResult;
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    async function loadMoreOnClick() {
        
        loading = true;

        let newData = await getDataFromServer();
        dataFromServer = Promise.resolve(dataFromServer).then((data) => {

            // if (data.albumList2.album && newData.albumList2.album) {
            //     data.albumList2.album = data.albumList2.album.concat(newData.albumList2.album);
            // }
            
            loading = false;

            return data;
        });
    }
</script>

<div class="main-left-panel">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then subsonicResponse}

        {#if subsonicResponse.searchResult3.album !== undefined && subsonicResponse.searchResult3.album.length > 0}
            <div class="main-color w-full pl-2 z-10"> Albums </div>

            <div class="flex flex-row overflow-scroll">

                {#each subsonicResponse.searchResult3.album as album}
    
                    <BoxAlbum album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                        
                {/each}

            </div>
        {/if}


        {#if subsonicResponse.searchResult3.artist !== undefined && subsonicResponse.searchResult3.artist.length > 0}
            <div class="main-color w-full pl-2 z-10"> Artists </div>

            <div class="flex flex-row overflow-scroll">

                {#each subsonicResponse.searchResult3.artist as artist}
    
                    <BoxArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                        
                {/each}

            </div>
        {/if}


        {#if subsonicResponse.searchResult3.song !== undefined && subsonicResponse.searchResult3.song.length > 0}
            <div class="main-color w-full pl-2 z-10"> Songs </div>

            <div class="flex flex-row overflow-scroll">

                {#each subsonicResponse.searchResult3.song as song}
    
                    <BoxSong song={song} api={api} refreshViewOnClick={refreshViewOnClick}/>
                        
                {/each}

            </div>
        {/if}

        <!-- {#if libraries.albumList2.album && libraries.albumList2.album.length > 0}
            {#each libraries.albumList2.album as album}

                <LineAlbumId3 album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}
        {/if} -->

        <!-- <div class="w-full flex justify-center">
            <button class="w-full dark:text-white text-zinc-700 font-bold my-1 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
        </div> -->

    {/await}
</div>