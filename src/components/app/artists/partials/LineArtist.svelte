<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { ArtistID3 } from "$models/servers/subsonic/types";
	import { ArrowRight } from "lucide-svelte";
    import ImgCover from "$components/global/ImgCover.svelte";

    export let artist: ArtistID3;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: (event: MouseEvent) => void;

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={artist.id}>
        <div class="p-2 flex items-center ">
            
            <ImgCover api={api} title={artist.name} songId={artist.id} />

            <a href="/artists?id={artist.id}" on:click={refreshViewOnClick} class="w-full">
                <div class="flex flex-col">
                    <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{artist.name}</span>
                    <div>
                    </div>
                </div>
            </a>
            
            <a href="/artists?id={artist.id}" on:click={refreshViewOnClick} class="ml-auto">
                <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"/>
            </a>
        </div>
</div>

