<script lang="ts">
	import type { Child } from "$models/servers/subsonic";
    import PlaylistStore from "$stores/PlaylistStore";
	import PlayerControls from "./partials/PlayerControls.svelte";
	import PlayerInformationSong from "./partials/PlayerInformationSong.svelte";
	import PlayerLineMusic from "./partials/PlayerLineMusic.svelte";
	import PlayerPlaylistInformation from "./partials/PlayerPlaylistInformation.svelte";

    let localPlaylist: Child[] = [];

    PlaylistStore.subscribe(value => {
        localPlaylist = value;
    });
    
</script>

<div class="px-3 mx-3 w-4/12 divide-y">
    <PlayerInformationSong />
    <PlayerControls />
    <PlayerPlaylistInformation />
    
    {#each localPlaylist as song, index}
        {#if !song.isDir}
            <PlayerLineMusic bind:song={song} index={index} />
        {/if}
    {/each}
</div>