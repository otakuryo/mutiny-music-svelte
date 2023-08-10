<script lang="ts">
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
    import type { SearchResult3, SubsonicAPI, SubsonicBaseResponse } from '$models/servers/subsonic';
	import InputText from './partials/InputText.svelte';
	import { FolderSearch, Loader } from 'lucide-svelte';
	import HorizontalAlbums from '$components/app/search/partials/HorizontalAlbums.svelte';
	import HorizontalArtists from '$components/app/search/partials/HorizontalArtists.svelte';
	import VerticalSongs from '$components/app/search/partials/VerticalSongs.svelte';

    type SearchResult = (SubsonicBaseResponse & { searchResult3: SearchResult3 });

    // export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<SearchResult> = Promise.resolve({} as (SearchResult));
    let api: SubsonicAPI;

    let loading = false;

    let albumScrollPosition = 0;
    let artistScrollPosition = 0;
    let songScrollPosition = 0;

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

    let totalTimeLoading = 0;

    async function getDataFromServer(): Promise<SearchResult> {

        totalTimeLoading = new Date().getTime();
        
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

            totalTimeLoading = totalTimeLoading - new Date().getTime();

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

            albumScrollPosition = 0;
            artistScrollPosition = 0;
            songScrollPosition = 0;

            refreshViewOnClick();
            stateSearchText = "search-done";
        }, 1000);
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
        console.log("checkResults");
        
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

    <div class="content-parent">

        <div class="divide-y border-theme mx-2 mt-2">
            <InputText bind:searchText={query} bind:stateSearchText={stateSearchText} />
        </div>
        <!-- <div class="divide-y border-theme mx-2 mt-2"></div> -->

        {#await dataFromServer}
    
            <div class="w-full border-theme grid justify-center items-center">
                <Loader class="w-32 h-32 stroke-1" />
            </div>
    
        {:then subsonicResponse}
    
            {#if !query || query === ''}
                
                <div class="h-full border-theme grid justify-center items-center m-2">
                    <FolderSearch class="w-32 h-32 stroke-1" />
                </div>
    
            {:else}
    
                {#if checkResults(subsonicResponse.searchResult3)}

                    <div class="h-full border-theme grid justify-center items-center m-2">
                        <div class="flex flex-col text-center">
                            <FolderSearch class="w-32 h-32 stroke-1" />
                            <div>0 results</div>
                        </div>
                    </div>

                {/if}

                {#if subsonicResponse.searchResult3 && subsonicResponse.searchResult3.album }
                    <HorizontalAlbums
                        bind:lastScrollLeft={albumScrollPosition}
                        albums={subsonicResponse.searchResult3.album}
                        api={api}
                        refreshViewOnClick={refreshViewOnClick}
                        loadMoreOnClick={loadMoreOnClick}
                        loading={loading} />
                {/if}
    
                {#if subsonicResponse.searchResult3 && subsonicResponse.searchResult3.artist }
                    <HorizontalArtists
                        bind:lastScrollLeft={artistScrollPosition}
                        artists={subsonicResponse.searchResult3.artist}
                        api={api}
                        refreshViewOnClick={refreshViewOnClick}
                        loadMoreOnClick={loadMoreOnClick}
                        loading={loading} />
                {/if}

                {#if subsonicResponse.searchResult3 && subsonicResponse.searchResult3.song }
                    <VerticalSongs
                        bind:lastScrollTop={songScrollPosition}
                        songs={subsonicResponse.searchResult3.song}
                        api={api}
                        loadMoreOnClick={loadMoreOnClick}
                        loading={loading} />
                {/if}

                <div class="mb-2 w-full"></div>
    
            {/if}
    
        {:catch error}
            <div class="w-full">{error.message}</div>
        {/await}
    </div>


</div>