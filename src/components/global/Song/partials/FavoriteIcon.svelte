<script lang="ts">
	import type { Child, SubsonicAPI } from "$models/servers/subsonic";
	import { Star } from "lucide-svelte";

    export let song: Child;
    export let api: SubsonicAPI;
    export let width: string = "w-12";
    export let height: string = "h-6";

    /**
     * Toggle star
     * 
     * If star is true, then the song is starred, so we want to remove it from starred songs
     */
     async function toggleStar() {
        if (song.starred === undefined) {
            let response = await api.star({id: song.id});
            if (response.status == "ok") {
                song.starred = new Date();
            }
        } else {
            let response = await api.unstar({id: song.id});
            if (response.status == "ok") {
                song.starred = undefined;
            }
        }
    }
</script>

<!-- Añadir a favoritos -->
<div on:click={toggleStar} on:keydown={toggleStar}>
    {#if song.starred !== undefined }
        <Star class="stroke-current text-slate-900 dark:text-yellow-200 cursor-pointer {height} {width}" fill="yellow"/>
    {:else}
        <Star class="stroke-current text-slate-900 dark:text-yellow-200 cursor-pointer {height} {width}" />
    {/if}
</div>