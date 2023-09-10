<script lang="ts">
	import { SkipForward } from "lucide-svelte";
    export let disableNext: boolean;
    export let skipForward: () => void;
    
</script>

<button class="player-button-base" on:click={skipForward} on:keypress={skipForward} disabled={disableNext}>
    <SkipForward class="icon-base"/>
</button>