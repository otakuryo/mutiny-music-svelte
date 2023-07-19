<script lang="ts">
	import type { Playlist } from "$models/servers/subsonic/types";
	import { Album, ArrowRight } from "lucide-svelte";

    export let playlist: Playlist;
    export let refreshViewOnClick: (event: MouseEvent) => void;

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={playlist.id}
    data-title={playlist.name}>
    <a href="/playlists?id={playlist.id}" on:click={refreshViewOnClick}>
        <div class="p-2 flex items-center ">
            
            <Album strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>

            <div class="flex flex-col">
                <span data-amplitude-playlist-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{playlist.name}</span>
                <div>
                    <span data-amplitude-playlist-info="count" class="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{playlist.songCount}</span>
                </div>
            </div>
            <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"/>
        </div>
    </a>
</div>

