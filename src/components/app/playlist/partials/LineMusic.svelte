<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import LineSong from "$components/global/Song/LineSong.svelte";
	import { CheckCircle2, Star, XCircle } from "lucide-svelte";
	import { MainServerSubsonicAPI } from "$lib/ts/Helpers";
	import { onMount } from "svelte";

    export let song: Child;
    export let api: SubsonicAPI = MainServerSubsonicAPI();
    export let index: number;
    export let callbackRemove: (songId: number, push: boolean) => void;

    /**
     * Toggle prepareForDelete and call callbackRemove
     */
    function toggleStar() {
        song.prepareForDelete = !song.prepareForDelete;
        callbackRemove(index, song.prepareForDelete);
    }
</script>

<LineSong {song} {api} >
    <div slot="main-options">

        <div on:click={toggleStar} on:keydown={toggleStar}>
            {#if song.prepareForDelete}
                <XCircle class="stroke-current text-red-600 dark:text-red-500 h-6 w-12" />
            {:else}
                <CheckCircle2 class="stroke-current text-green-600 dark:text-green-500 h-6 w-12" />
            {/if}
        </div>

    </div>
</LineSong>