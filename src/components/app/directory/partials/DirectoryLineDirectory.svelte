<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import { ArrowRight } from "lucide-svelte";
    import ImgCover from "$components/global/ImgCover.svelte";

    export let directory: Child;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void = () => {};

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={directory.id}
    data-id-index={directory.id}
    data-is-dir={directory.isDir}
    data-parent={directory.parent}
    data-title={directory.title}>

        <div class="p-2 flex items-center ">
            
            <ImgCover api={api} title={directory.title} songId={directory.id} />

            <a href="/directory?id={directory.id}" class="w-full">

                <div class="flex flex-col w-full"  on:click={refreshViewOnClick}>
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
            </a>

            {#if directory.isDir}
                <a href="/directory?id={directory.id}" class="ml-auto">
                    <div on:click={refreshViewOnClick}>
                    <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                </div>
                </a>
            {/if}

        </div>
</div>

