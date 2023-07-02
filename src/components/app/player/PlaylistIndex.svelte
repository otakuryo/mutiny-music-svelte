<script lang="ts">
	import type { Child } from "$models/servers/subsonic";


    import PlaylistStore from "$stores/PlaylistStore";
	import DirectoryLineMusic from "./partials/DirectoryLineMusic.svelte";

    let localPlaylist: Child[] = [];

    PlaylistStore.subscribe(value => {
        localPlaylist = value;
    });
    
</script>

<div class="px-3 mx-3 w-4/12 divide-y">
    {#each localPlaylist as song, index}
        {#if !song.isDir}
            <DirectoryLineMusic bind:song={song} index={index} />
        {/if}
    {/each}
</div>