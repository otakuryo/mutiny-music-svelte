<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { AlbumID3 } from "$models/servers/subsonic/types";
	import { ArrowRight } from "lucide-svelte";
    import ImgCover from "$components/global/ImgCover.svelte";
	import { getDurationHuman } from "$lib/ts/Helpers";
	import FavoriteIconAlbum from "./partials/FavoriteIconAlbum.svelte";

    export let album: AlbumID3;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void = () => {};

    let durationHuman = '00:00';

    durationHuman = getDurationHuman(album.duration);
</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={album.id}>
        <div class="p-2 flex items-center ">
            
            <ImgCover api={api} title={album.name} songId={album.coverArt} />

            <a href="/albums?id={album.id}" on:click={refreshViewOnClick} class="w-full">

                <div class="flex flex-col w-full" >
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
            </a>

            <FavoriteIconAlbum bind:album={album} api={api} />
            
            <a href="/albums?id={album.id}" on:click={refreshViewOnClick} class="ml-auto">
                <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"/>
            </a>
        </div>
</div>

