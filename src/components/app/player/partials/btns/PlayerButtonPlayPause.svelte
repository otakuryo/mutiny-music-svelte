<script lang="ts">
	import { Pause, Play } from "lucide-svelte";
    import { isPlaying } from "$stores/PlayerStore";

    export let disablePlay:boolean;
    export let togglePlaying: () => void;

</script>

<button class="player-button-base" on:click={togglePlaying} on:keypress={togglePlaying} disabled={disablePlay}>
    {#if $isPlaying}
        <Pause class="icon-base"/>
    {:else}
        <Play class="icon-base"/>
    {/if}
</button> 