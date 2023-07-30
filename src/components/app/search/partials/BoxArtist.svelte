<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { ArtistID3 } from "$models/servers/subsonic/types";
	import ImgCover from "./ImgCover.svelte";
	import { getDurationHuman } from "$lib/js/Helpers";

    export let artist: ArtistID3;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void;

</script>

<div 
    class="relative w-player flex shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={artist.id}>
    <a href="/artists?id={artist.id}" on:click={refreshViewOnClick}>
        <div class="p-2 flex flex-col items-center w-40 h-auto">

            <ImgCover api={api} title={artist.name} songId={artist.coverArt} />
            
            <div class="h-full w-full text-center">
                <span class="font-sans text-base font-medium leading-7 text-slate-900 dark:text-white line-clamp-2">{artist.name}</span>
            </div>

        </div>
    </a>
</div>

