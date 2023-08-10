<script lang="ts">
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
    import type { SearchResult3, SubsonicAPI, SubsonicBaseResponse } from '$models/servers/subsonic';
	import BoxAlbum from './partials/BoxAlbum.svelte';
	import BoxArtist from './partials/BoxArtist.svelte';
	import InputText from './partials/InputText.svelte';
	import LineSong from '$components/global/Song/LineSong.svelte';
	import { FolderSearch, Loader } from 'lucide-svelte';
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
    
                {#if checkResults(subsonicResponse.searchResult3, 'album') && subsonicResponse.searchResult3.album}
                    <div class="divide-y border-theme mx-2 mt-2">
                        <div class="main-color w-full pl-2 z-10"> Albums </div>
                    </div>
                    
                    <div class="divide-y border-theme mx-2 mt-2 overflow-x-scroll min-h-[13rem]">
        
                        <div class="flex flex-row">
        
                            {#each subsonicResponse.searchResult3.album as album}
                
                                <BoxAlbum album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                                    
                            {/each}
        
                            <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />
        
                        </div>
                    </div>
                {/if}
    
    
                {#if checkResults(subsonicResponse.searchResult3, 'artist') && subsonicResponse.searchResult3.artist}
                    <div class="divide-y border-theme mx-2 mt-2">
                        <div class="main-color w-full pl-2 z-10"> Artists </div>
                    </div>
                
                    <div class="divide-y border-theme mx-2 mt-2 overflow-x-scroll min-h-[13rem]">
                        <div class="flex flex-row">
        
                            {#each subsonicResponse.searchResult3.artist as artist}
                
                                <BoxArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                                    
                            {/each}
        
                            <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />
        
                        </div>
                    </div>
                {/if}
    
    
                {#if checkResults(subsonicResponse.searchResult3, 'song') && subsonicResponse.searchResult3.song}
                    <div class="divide-y border-theme mx-2 mt-2">
                        <div class="main-color w-full pl-2 z-10"> Songs </div>
                    </div>

                    <div class="divide-y border-theme mx-2 mt-2 overflow-x-scroll min-h-[13rem]">
                        {#each subsonicResponse.searchResult3.song as song}
                            <LineSong song={song} api={api}/>
                        {/each}
        
                        <div class="w-full flex justify-center">
                            <button class="w-full dark:text-white text-zinc-700 font-bold m-2 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>Load more</button>
                        </div>
                    </div>
                    
                {/if}

                <div class="mb-2 w-full"></div>
    
            {/if}
    
        {:catch error}
            <div class="w-full">{error.message}</div>
        {/await}
    </div>


</div>