<script lang="ts">
	import VRandomAlbums from "./partials/VRandomAlbums.svelte";
	import VRandomSongs from "./partials/VRandomSongs.svelte";
	import VRecentlyAlbums from "./partials/VRecentlyAlbums.svelte";
import VTopSongs from "./partials/VTopSongs.svelte";
</script>

<div class="main-left-panel">
    <div class="content-parent">
        <VRecentlyAlbums />
        <VRandomAlbums />
        <VTopSongs />
        <VRandomSongs />

        <div class="mb-2"></div>
    </div>
</div>
