<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { AlbumID3 } from "$models/servers/subsonic/types";
	import { ArrowRight } from "lucide-svelte";
	import ImgCover from "$components/app/directory/partials/ImgCover.svelte";
	import { getDurationHuman } from "$lib/js/Helpers";

    export let album: AlbumID3;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void;

    let durationHuman = '00:00';

    durationHuman = getDurationHuman(album.duration);
</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={album.id}>
    <a href="/albums?id={album.id}" on:click={refreshViewOnClick}>
        <div class="p-2 flex items-center ">
            
            <ImgCover api={api} title={album.name} songId={album.id} />

            <div class="flex flex-col">
                <span class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{album.name}</span>
                <div>
                    {#if album.songCount}
                        <span class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{album.songCount} -</span>
                    {/if}
                    {#if album.artist}
                        <span class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{album.artist} -</span>
                    {/if}
                    {#if album.duration}
                        <span class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{durationHuman}</span>
                    {/if}
                </div>
            </div>
            
            <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"/>
        </div>
    </a>
</div>

