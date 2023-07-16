<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import LineSong from "$components/global/Song/LineSong.svelte";
	import { Star } from "lucide-svelte";

    export let song: Child;
    export let api: SubsonicAPI;
    export let index: number;
    export let callbackRemove: (songId: number, push: boolean) => void;

    let star = true;

    /**
     * Toggle star and call callbackRemove
     * 
     * If star is true, then the song is starred, so we want to remove it from starred songs
     */
    function toggleStar() {
        star = !star;
        callbackRemove(index, !star);
    }
</script>

<LineSong {song} {api} >
    <div slot="main-options">

        <div on:click={toggleStar} on:keydown={toggleStar}>
            {#if star}
                <Star class="stroke-current text-slate-900 dark:text-yellow-200 h-6 w-12" fill="yellow"/>
            {:else}
                <Star class="stroke-current text-slate-900 dark:text-yellow-200 h-6 w-12" />
            {/if}
        </div>

    </div>
</LineSong>