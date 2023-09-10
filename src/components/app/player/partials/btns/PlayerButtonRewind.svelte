<script lang="ts">
	import PlayerStore, { userSettingSeek } from "$stores/PlayerStore";
	import { get } from "svelte/store";

    export let disableAll: boolean;
    export let seconds: number = get(userSettingSeek) * -1;

    function rewindCallback() {
        // @ts-ignore
        let currentPosition: number = Math.round(PlayerStore.currentTime());
        PlayerStore.seek(currentPosition + seconds)
    }

</script>

<button class="player-button-base" on:click={rewindCallback} on:keypress={rewindCallback} disabled={disableAll}>
    <span class="icon-base p-1 text-center">
        {seconds}
    </span>
</button>