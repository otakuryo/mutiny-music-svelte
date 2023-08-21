<script lang="ts">
	import type { Child } from "$models/servers/subsonic";
	import { Folder, Info } from "lucide-svelte";

    export let song: Child;
    export let width: string = "w-12";
    export let height: string = "h-6";

</script>

<!-- Añadir a favoritos -->
<div>
    <a href="/directory?id={song.parent}" title="Go to folder">
        <Folder class="stroke-current text-slate-900 dark:text-zinc-200 cursor-pointer {height} {width}"/>
    </a>
</div>