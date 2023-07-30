
<script lang="ts">
	import { initSubsonicApi } from '$lib/js/Helpers';
    import type { MusicFolders, SubsonicAPI, SubsonicBaseResponse } from '$models/servers/subsonic';
	import MusicFolderLine from './partials/MusicFolderLine.svelte';

    type MusicFoldersType = (SubsonicBaseResponse & { musicFolders: MusicFolders });
    let api: SubsonicAPI;

    async function getDataFromServer(): Promise<MusicFoldersType> {
        api = await initSubsonicApi();

        const resMusicFolders: MusicFoldersType  = await api.getMusicFolders()
        
        return resMusicFolders;

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
    {/await}
</div>