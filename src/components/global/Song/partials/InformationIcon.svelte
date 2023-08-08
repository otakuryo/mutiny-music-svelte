<script lang="ts">
	import type { Child, SubsonicAPI } from "$models/servers/subsonic";
	import { Info } from "lucide-svelte";

    export let song: Child;
    export let api: SubsonicAPI;
    export let width: string = "w-12";
    export let height: string = "h-6";

    function showInformation() {
        
    }

</script>

<!-- Añadir a favoritos -->
<div on:click={showInformation} on:keydown={showInformation}>
    <Info class="stroke-current text-slate-900 dark:text-zinc-200 cursor-pointer {height} {width}"/>
</div>