<script lang="ts">
	import LineAlbumId3 from '$components/global/Navigation/LineAlbumID3.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
    import type { SearchResult3, SubsonicAPI, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import BoxAlbum from './partials/BoxAlbum.svelte';
	import BoxArtist from './partials/BoxArtist.svelte';
	import BoxSong from './partials/BoxSong.svelte';
	import InputText from './partials/InputText.svelte';
	import LineSong from '$components/global/Song/LineSong.svelte';
	import { PlusCircle } from 'lucide-svelte';
	import BoxMore from './partials/BoxMore.svelte';

    type SearchResult = (SubsonicBaseResponse & { searchResult3: SearchResult3 });

    // export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<SearchResult> = Promise.resolve({} as (SearchResult));
    let api: SubsonicAPI;

    let loading = false;

    export let query: string = '';
    let artistCount = 10;
    let artistOffset = 0;
    let albumCount = 10;
    let albumOffset = 0;
    let songCount = 10;
    let songOffset = 0;
    let musicFolderId: string|undefined = undefined;

    let timeout: NodeJS.Timeout|undefined = undefined;

    type typeStateSearch = 'waiting' | 'typing' | 'searching' | 'search-done';
    let stateSearchText: typeStateSearch = 'waiting';
    
    onMount(async () => {
        // dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<SearchResult> {

        try {

            if (query === '') {
                throw new Error("Write something to search");
            }

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

            if (resMusic.error) {
                throw new Error(resMusic.error.message);
            }

            console.log(resMusic);
            
            artistOffset += artistCount;
            albumOffset += albumCount;
            songOffset += songCount;

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

        if (loading) {
            return;
        }
        
        loading = true;

        let newData = await getDataFromServer();
        dataFromServer = Promise.resolve(dataFromServer).then((data) => {

            if (data.searchResult3.album && data.searchResult3.album.length > 0 && newData.searchResult3.album && newData.searchResult3.album.length > 0) {
                data.searchResult3.album = data.searchResult3.album.concat(newData.searchResult3.album);
            } else {
                data.searchResult3.album = data.searchResult3.album || [];
            }

            if (data.searchResult3.artist && data.searchResult3.artist.length > 0 && newData.searchResult3.artist && newData.searchResult3.artist.length > 0) {
                data.searchResult3.artist = data.searchResult3.artist.concat(newData.searchResult3.artist);
            } else {
                data.searchResult3.artist = data.searchResult3.artist || [];
            }

            if (data.searchResult3.song && data.searchResult3.song.length > 0 && newData.searchResult3.song && newData.searchResult3.song.length > 0) {
                data.searchResult3.song = data.searchResult3.song.concat(newData.searchResult3.song);
            } else {
                data.searchResult3.song = data.searchResult3.song || [];
            }
            
            loading = false;

            return data;
        });
    }

    $: if (query !== '') {
        stateSearchText = "waiting";
        clearTimeout(timeout);
        timeout = setTimeout(() => {

            artistOffset = 0;
            albumOffset = 0;
            songOffset = 0;

            refreshViewOnClick();
            stateSearchText = "search-done";
        }, 1500);
        stateSearchText = "searching";
    }else{
        stateSearchText = "waiting";
    }

    /**
     * Type of results of searchResult3
     */
    type typeLocalSearch = 'album' | 'artist' | 'song' | 'all';

    /**
     * Check if searchResult3 a type is empty all or a type of search
     * 
     * @param searchResult3 
     * @param localSearch 
     * @returns 
     */
    function checkResults(searchResult3: SearchResult3, localSearch: typeLocalSearch = 'all') {
        // If searchResult3 is undefined, return false
        if (searchResult3 === undefined) return false;

        // If 'all' and searchResult3 not is empty, return true
        if (localSearch === 'all') {
            let local_album = (searchResult3.album === undefined);
            let local_artist = (searchResult3.artist === undefined);
            let local_song = (searchResult3.song === undefined);
            return local_album && local_artist && local_song;
        };

        // If 'album' and searchResult3.album not is empty, return true
        if (localSearch == 'album' && searchResult3.album !== undefined && searchResult3.album.length > 0) return true;

        // If 'artist' and searchResult3.artist not is empty, return true
        if (localSearch == 'artist' && searchResult3.artist !== undefined && searchResult3.artist.length > 0) return true;

        // If 'song' and searchResult3.song not is empty, return true
        if (localSearch == 'song' && searchResult3.song !== undefined && searchResult3.song.length > 0) return true;

        // If not is 'all', 'album', 'artist' or 'song', return false
        return false;
    }
</script>

<div class="main-left-panel">

    <div class="p-2">
        <InputText bind:searchText={query} bind:stateSearchText={stateSearchText} />
    </div>

    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then subsonicResponse}

        {#if !query || query === ''}
            
            <div class="w-full px-2">Long tip, for search... no use complex text</div>

        {:else}

            {#if checkResults(subsonicResponse.searchResult3)}
                <div class="w-full">No results</div>
            {/if}

            {#if checkResults(subsonicResponse.searchResult3, 'album') && subsonicResponse.searchResult3.album}
                <div class="main-color w-full pl-2 z-10"> Albums </div>

                <div class="flex flex-row overflow-scroll">

                    {#each subsonicResponse.searchResult3.album as album}
        
                        <BoxAlbum album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                            
                    {/each}

                    <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />

                </div>
            {/if}


            {#if checkResults(subsonicResponse.searchResult3, 'artist') && subsonicResponse.searchResult3.artist}
                <div class="main-color w-full pl-2 z-10"> Artists </div>

                <div class="flex flex-row overflow-scroll">

                    {#each subsonicResponse.searchResult3.artist as artist}
        
                        <BoxArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                            
                    {/each}

                    <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />

                </div>
            {/if}


            {#if checkResults(subsonicResponse.searchResult3, 'song') && subsonicResponse.searchResult3.song}
                <div class="main-color w-full pl-2 z-10"> Songs </div>

                <!-- <div class="flex flex-row overflow-scroll">

                    {#each subsonicResponse.searchResult3.song as song}
        
                        <BoxSong song={song} api={api} refreshViewOnClick={refreshViewOnClick}/>
                            
                    {/each}

                </div> -->

                {#each subsonicResponse.searchResult3.song as song}
                    <LineSong song={song} api={api}/>
                {/each}

                <div class="w-full flex justify-center">
                    <button class="w-full dark:text-white text-zinc-700 font-bold my-1 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
                </div>
                
            {/if}

        {/if}
    

        <!-- {#if libraries.albumList2.album && libraries.albumList2.album.length > 0}
            {#each libraries.albumList2.album as album}

                <LineAlbumId3 album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}
        {/if} -->

        <!-- <div class="w-full flex justify-center">
            <button class="w-full dark:text-white text-zinc-700 font-bold my-1 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
        </div> -->

    {:catch error}
        <div class="w-full">{error.message}</div>
    {/await}
</div>