<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { AlbumID3, Child } from "$models/servers/subsonic/types";
	import { ArrowRight } from "lucide-svelte";
    import ImgCover from "$components/global/ImgCover.svelte";
	import { getDurationHuman } from "$lib/js/Helpers";

    export let album: AlbumID3;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void;

    let durationHuman = '00:00';

    durationHuman = getDurationHuman(album.duration);
</script>

<div 
    class="relative w-player flex shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={album.id}>
    <a href="/albums?id={album.id}" on:click={refreshViewOnClick}>
        <div class="p-2 flex flex-col items-center w-40 h-auto">

            <ImgCover size="32" marginRigth="0" disableModal={true} api={api} title={album.name} songId={album.coverArt} />
            
            <div class="h-full w-full text-center">
                <p class="font-sans text-base font-medium leading-7 text-slate-900 dark:text-white block line-clamp-2-custom h-14">{album.name}</p>
            </div>

        </div>
    </a>
</div>

