
<script lang="ts">
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
    import type { MusicFolders, SubsonicAPI, SubsonicBaseResponse, Error } from '$models/servers/subsonic';
	import LoadingLineFolder from '$components/app/musicFolder/partials/LoadingLineFolder.svelte';
	import MusicFolderLine from '$components/app/musicFolder/partials/MusicFolderLine.svelte';

    type MusicFoldersType = (SubsonicBaseResponse & { musicFolders: MusicFolders });
    let api: SubsonicAPI;

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

</script>

<div class="main-left-panel">
    <div class="content-parent">
        
        {#await getDataFromServer()}
            <LoadingLineFolder />
        {:then musicFolders}
        
            {#if musicFolders && musicFolders.musicFolders && musicFolders.musicFolders.musicFolder && musicFolders.musicFolders.musicFolder.length > 0}
                <div class="overflow-y-scroll divide-y border-theme m-2">
                    {#each musicFolders.musicFolders.musicFolder as musicFolder}
                        <MusicFolderLine folder={musicFolder} />
                    {/each}
                </div>
            {/if}
            
        {:catch error}
            <div class="text-red-500">Error: {error.message}</div>
        {/await}
    </div>
</div>