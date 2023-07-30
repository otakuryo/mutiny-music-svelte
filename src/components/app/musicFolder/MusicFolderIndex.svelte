
<script lang="ts">
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
    import type { MusicFolders, SubsonicAPI, SubsonicBaseResponse, Error } from '$models/servers/subsonic';
	import MusicFolderLine from './partials/MusicFolderLine.svelte';

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
    {#await getDataFromServer()}
        <div>loading...</div>
    {:then musicFolders}
        {#if musicFolders && musicFolders.musicFolders && musicFolders.musicFolders.musicFolder && musicFolders.musicFolders.musicFolder.length > 0}
            {#each musicFolders.musicFolders.musicFolder as musicFolder}
                <MusicFolderLine folder={musicFolder} />
            {/each}
        {/if}
    {:catch error}
        <div class="text-red-500">Error: {error.message}</div>
    {/await}
</div>