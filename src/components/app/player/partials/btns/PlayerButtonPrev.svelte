<script lang="ts">
	import { SkipBack } from "lucide-svelte";

    export let disablePrev: boolean;
    export let skipBack: () => void;

</script>

<button class="player-button-base" on:click={skipBack} on:keypress={skipBack} disabled={disablePrev}>
    <SkipBack class="icon-base"/>
</button>