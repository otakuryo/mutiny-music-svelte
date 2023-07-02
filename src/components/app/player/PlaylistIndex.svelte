<script lang="ts">
	import type { Child } from "$models/servers/subsonic";
    import PlaylistStore from "$stores/PlaylistStore";
	import PlayerInformationSong from "./partials/PlayerInformationSong.svelte";
	import PlayerLineMusic from "./partials/PlayerLineMusic.svelte";

    let localPlaylist: Child[] = [];

    PlaylistStore.subscribe(value => {
        localPlaylist = value;
    });
    
</script>

<div class="px-3 mx-3 w-4/12 divide-y">
    <PlayerInformationSong />
    {#each localPlaylist as song, index}
        {#if !song.isDir}
            <PlayerLineMusic bind:song={song} index={index} />
        {/if}
    {/each}
</div>