<script lang="ts">
	import PlaylistStore from "$stores/PlaylistStore";
	import PlayerControls from "./partials/PlayerControls.svelte";
	import PlayerInformationSong from "./partials/PlayerInformationSong.svelte";
	import PlayerLineMusic from "./partials/PlayerLineMusic.svelte";
	import PlayerListNavigation from "./partials/PlayerListNavigation.svelte";
	import PlayerPlaylistInformation from "./partials/PlayerPlaylistInformation.svelte";

</script>

<div class="main-right-panel">
    <div class="content-parent">

        <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
            <PlayerInformationSong />
            <PlayerControls />
            <PlayerPlaylistInformation />
        </div>
        <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
            <PlayerListNavigation />
        </div>
        <div class="overflow-y-auto divide-y border-theme m-2">
            
            {#each $PlaylistStore as song, index}
                {#if !song.isDir}
                    <PlayerLineMusic bind:song={song} index={index} />
                {/if}
            {/each}

        </div>

    </div>
</div>