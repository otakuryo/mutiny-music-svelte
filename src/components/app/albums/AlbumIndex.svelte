<script lang="ts">
    import type { SubsonicAPI, AlbumWithSongsID3, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import { MainServerSubsonicAPI, getCacheConfig } from '$lib/ts/Helpers';
	import LoadingLineAl from './partials/LoadingLineAl.svelte';
	import BreadcrumbStore from '$stores/BreadcrumbStore';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';
	import { AddItemToBreadcrumbs } from '$lib/ts/Helpers';

    type AlbumLocal = (SubsonicBaseResponse & { album: AlbumWithSongsID3 });

    export let albumId: string;
    let api: SubsonicAPI;

    let dataFromServer : Promise<AlbumLocal> = Promise.resolve({} as AlbumLocal);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    $: if(albumId) {
        refreshViewOnClick();
    }

    async function getDataFromServer(): Promise<AlbumLocal> {

        try {
            api = MainServerSubsonicAPI();

            let resMusic: AlbumLocal = await api.getAlbum({id: albumId});
            AddItemToBreadcrumbs(resMusic.album.name, `/album?id=${resMusic.album.id}` );
            return resMusic;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    function toggleDataFromServer(state: boolean){
        dataFromServer.then((albumResponse) => {
            if (albumResponse.album.song && albumResponse.album.song.length > 0) {
                albumResponse.album.song.forEach((song) => {
                      song.checked = state;
                })
            }
        })

        dataFromServer = dataFromServer;
    }

    function callbackCheckSonByIndex(){
        toggleDataFromServer(true);
    }

    function callbackUncheckSonByIndex(){
        toggleDataFromServer(false);
    }

    function clearCache(){
        console.log("clearCache");
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: albumId})
        .then((count) => {
            console.log("Cache cleared", count);
            refreshViewOnClick();
        });
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">

        {#await dataFromServer}
            <LoadingLineAl />
        {:then albumResponse}
    
            {#if albumResponse.album.song && albumResponse.album.song.length > 0}

                <div class="main-color divide-y border-theme mx-2 mt-2">
                    <BreadcrumbBase />
                </div>
                
                <div class="main-color divide-y border-theme mx-2 mt-2">
                    <LineBack url="/albums" name="Albums" onBack={BreadcrumbStore.removeLastItem} />
                </div>

                <div class="divide-y border-theme mx-2 mt-2">

                    <ControlsNavigationPlaylist
                        api={api}
                        list={albumResponse.album.song}
                        callbackCheckSonByIndex={callbackCheckSonByIndex}
                        callbackUncheckSonByIndex={callbackUncheckSonByIndex} >

                        <div slot="extra-options">
                            <div class="flex flex-row">
                                <button
                                    type="button"
                                    class="btn-small-control-list"
                                    on:click={clearCache}
                                    on:keypress={clearCache}>
                                        Clear cache
                                </button>
                            </div>
                        </div>

                    </ControlsNavigationPlaylist>
                </div>
    
                <div class="main-color divide-y border-theme mx-2 mt-2 overflow-y-scroll">
                    {#each albumResponse.album.song as song}
        
                            {#if song.isDir}
                                <DirectoryLineDirectory
                                    directory={song}
                                    api={api} />
        
                            {:else}
                                <DirectoryLineMusic bind:song={song} api={api} />
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