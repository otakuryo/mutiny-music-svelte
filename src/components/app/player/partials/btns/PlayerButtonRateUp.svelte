<script lang="ts">
    export let disableAll: boolean;
    export let rate: number = 1.0;

    function setRate() {
        console.log("setRate");
    }
</script>
<button class="player-button-base" on:click={setRate} on:keypress={setRate} disabled={disableAll}>
    <span class="icon-base p-1 text-center">
        x {rate}
    </span>
</button>