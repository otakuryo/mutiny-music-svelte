<script lang="ts">
	import { RepeatEnum } from "$lib/types/enums";
	import { Repeat, Repeat1 } from "lucide-svelte";
    import { isLooping, isSingleLooping, isShuffling } from "$stores/PlayerStore";

    export let disableAll:boolean;
    let type: RepeatEnum = RepeatEnum.ALL;

    function localToggleRepeat() {

        if (type === RepeatEnum.NONE) {
            type = RepeatEnum.ALL;

            isLooping.set(true);
            isSingleLooping.set(false);

        } else if (type === RepeatEnum.ALL) {
            type = RepeatEnum.ONE;

            isLooping.set(true);
            isSingleLooping.set(true);

        } else{
            type = RepeatEnum.NONE;

            isLooping.set(false);
            isSingleLooping.set(false);
        }

    }
    
</script>

<!-- Loop track -->
<button class="player-button-base" on:click={localToggleRepeat} on:keypress={localToggleRepeat} disabled={disableAll}>
    {#if type === RepeatEnum.NONE}
        <Repeat class="icon-base"/>
    {:else if type === RepeatEnum.ONE}
        <Repeat1 class="icon-base-success"/>
    {:else if type === RepeatEnum.ALL}
        <Repeat class="icon-base-success"/>
    {/if}
</button>