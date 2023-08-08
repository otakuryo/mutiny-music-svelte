<script lang="ts">
	import type { Child, SubsonicAPI } from "$models/servers/subsonic";
	import { User } from "lucide-svelte";

    export let song: Child;
    export let api: SubsonicAPI;
    export let width: string = "w-12";
    export let height: string = "h-6";

</script>

<!-- Añadir a favoritos -->
<div>
    <a href="/artists?id={song.artistId}" title="Artist">
        <User class="stroke-current text-slate-900 dark:text-zinc-200 cursor-pointer {height} {width}"/>
    </a>
</div>