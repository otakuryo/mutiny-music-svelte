
<script lang="ts">
	import { MainServerSubsonicAPI, getCacheConfig } from '$lib/ts/Helpers';
    import type { MusicFolders, SubsonicAPI, SubsonicBaseResponse, Error } from '$models/servers/subsonic';
	import LoadingLineFolder from '$components/app/musicFolder/partials/LoadingLineFolder.svelte';
	import MusicFolderLine from '$components/app/musicFolder/partials/MusicFolderLine.svelte';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';
	import type { BreadcrumbItem } from '$lib/types/global';
	import BreadcrumbStore from '$stores/BreadcrumbStore';
	import { onMount } from 'svelte';

    type MusicFoldersType = (SubsonicBaseResponse & { musicFolders: MusicFolders });
    let api: SubsonicAPI;

    let serverResponse: Promise<MusicFoldersType> = Promise.resolve({} as MusicFoldersType);

    onMount(() => {
        onGoLink();
        refresh();
    });

    async function getDataFromServer(): Promise<MusicFoldersType> {

        try {
            api = MainServerSubsonicAPI();
    
            const resMusicFolders: MusicFoldersType  = await api.getMusicFolders()
            
            return resMusicFolders;
            
        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }

    }

    function refresh(){
        serverResponse = getDataFromServer();
    }

    function onGoLink() {
        let breadItem: BreadcrumbItem = {
            name: 'Music Folders',
            path: '/directory'
        };

        BreadcrumbStore.addItem(breadItem);
    }

    function clearCache(){
        console.log("clearCache");
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: "getMusicFolders"})
        .then((count) => {
            console.log("Cache cleared", count);
            refresh();
        });
    }

</script>

<div class="main-left-panel">
    <div class="content-parent">

        <div class="main-color divide-y border-theme mx-2 mt-2">
            <BreadcrumbBase />
        </div>
        
        {#await serverResponse}
            <LoadingLineFolder />
        {:then musicFolders}
        
            <div class="main-color divide-y border-theme mx-2 mt-2">
                <div class="flex w-100 flex-row main-color">
                    <button
                        type="button"
                        class="btn-small-control-list"
                        on:click={clearCache}
                        on:keypress={clearCache}>
                            Clear cache
                    </button>
                </div>
            </div>
            
            {#if musicFolders && musicFolders.musicFolders && musicFolders.musicFolders.musicFolder && musicFolders.musicFolders.musicFolder.length > 0}
                <div class="main-color overflow-y-scroll divide-y border-theme m-2">
                    {#each musicFolders.musicFolders.musicFolder as musicFolder}
                        <MusicFolderLine folder={musicFolder} />
                    {/each}
                </div>
            {/if}
            
        {:catch error}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">Error: {error.message}</div>
            </div>
            
        {/await}
    </div>
</div>