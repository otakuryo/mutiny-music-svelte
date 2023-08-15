<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import ImgCover from "./ImgCover.svelte";
	import { getDurationHuman } from "$lib/ts/Helpers";

    export let song: Child;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void;

    let durationHuman = '00:00';

    durationHuman = getDurationHuman(song.duration);
</script>

<div 
    class="relative w-player flex shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={song.id}>
    <a href="/albums?id={song.id}" on:click={refreshViewOnClick}>
        <div class="p-2 flex flex-col items-center w-40 h-auto">

            <ImgCover api={api} title={song.title} songId={song.coverArt} />
            
            <div class="h-full w-full text-center">
                <span class="font-sans text-base font-medium leading-7 text-slate-900 dark:text-white line-clamp-2">{song.title}</span>
            </div>
            
        </div>
    </a>
</div>

