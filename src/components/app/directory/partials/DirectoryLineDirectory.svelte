<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import { ArrowRight } from "lucide-svelte";
	import ImgCover from "./ImgCover.svelte";

    export let directory: Child;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void;

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={directory.id}
    data-is-dir={directory.isDir}
    data-parent={directory.parent}
    data-title={directory.title}>
    <a href="/directory?id={directory.id}" on:click={refreshViewOnClick}>
        <div class="p-2 flex items-center ">
            
            <ImgCover api={api} title={directory.title} songId={directory.id} />

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{directory.title}</span>
                <div>
                    <!--              
                    <span data-amplitude-song-info="artist" class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">Unknown artist</span>
                    <span class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">-</span>
                    <span data-amplitude-song-info="album" class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">Unknown album</span>
                    <span class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">-</span>
                    <span data-amplitude-song-info="time" class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">00:00</span>
                    -->
                </div>
            </div>
            {#if directory.isDir}
                <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"/>
            {/if}
        </div>
    </a>
</div>

