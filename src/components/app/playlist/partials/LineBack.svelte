<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    export let refreshViewOnClick = (event: MouseEvent) => {};

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl">
    <a href="/playlists" on:click={refreshViewOnClick}>
        <div class="p-2 flex items-center z-50">
            
            <ArrowLeft class="stroke-current text-slate-900 dark:text-white h-6 w-12 mr-6"/>

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">Playlists</span>
            </div>
        </div>
    </a>
</div>

