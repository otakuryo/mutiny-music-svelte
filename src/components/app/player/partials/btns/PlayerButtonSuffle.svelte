<script lang="ts">
	import { isShuffling } from "$stores/PlayerStore";
	import { Shuffle } from "lucide-svelte";

    export let disableAll:boolean;
    let active = false;

    function shuffleSong() {
        console.log("shuffleSong");
        if (active) {
            active = false;
            isShuffling.set(false);
        } else {
            active = true;
            isShuffling.set(true);
        }
    }
</script>

<style>
    button:disabled {
        @apply opacity-50 cursor-not-allowed;
    }
</style>

<button class="player-button-base" on:click={shuffleSong} on:keypress={shuffleSong} disabled={disableAll}>
    {#if active}
        <Shuffle class="icon-base-success"/>
    {:else}
        <Shuffle class="icon-base"/>
    {/if}
</button>