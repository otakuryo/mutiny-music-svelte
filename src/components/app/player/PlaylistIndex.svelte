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

<div class="pl-3 main-right-panel">
    <div class="w-full flex flex-col max-h-screen-wo-menu">

        <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
            <PlayerInformationSong />
            <PlayerControls />
            <PlayerPlaylistInformation />
        </div>
        
        <div class="overflow-y-auto divide-y border-theme m-2">
            
            {#each localPlaylist as song, index}
                {#if !song.isDir}
                    <PlayerLineMusic bind:song={song} index={index} />
                {/if}
            {/each}

        </div>

    </div>
</div>