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

<style>
    .h-screen-wo-menu {
        height: calc(100vh - theme('height.20'));
    }
</style>

<div class="pl-3 w-6/12 divide-y fixed h-screen-wo-menu right-1 top-20 overflow-auto">
    <div class="main-color divide-y sticky top-0 z-10">
        <PlayerInformationSong />
        <PlayerControls />
        <PlayerPlaylistInformation />
    </div>
    
    <div class="h-100 divide-y">
        {#each localPlaylist as song, index}
            {#if !song.isDir}
                <PlayerLineMusic bind:song={song} index={index} />
            {/if}
        {/each}
    </div>
</div>