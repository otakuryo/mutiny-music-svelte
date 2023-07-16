<script>
	import Layout from '$layouts/+Layout.svelte';
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
	import PPlaylistStarredSongs from '$components/app/playlist/PPlaylistStarredSongs.svelte';
</script>

<Layout>
    <PPlaylistStarredSongs />
    <PlaylistIndex />
</Layout>