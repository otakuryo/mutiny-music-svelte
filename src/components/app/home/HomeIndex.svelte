<script lang="ts">
	import VRandomAlbums from "./partials/VRandomAlbums.svelte";
	import VRandomSongs from "./partials/VRandomSongs.svelte";
	import VRecentAlbums from "./partials/VRecentAlbums.svelte";
import VTopSongs from "./partials/VTopSongs.svelte";
</script>

<div class="main-left-panel">
    <div class="content-parent">
        <VRecentAlbums />
        <VRandomAlbums />
        <VTopSongs />
        <VRandomSongs />

        <div class="mb-2"></div>
    </div>
</div>
