<script>
	import Layout from '$layouts/+Layout.svelte';
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
	import PPlaylistStarredArtists from '$components/app/playlist/PPlaylistStarredArtists.svelte';
</script>

<Layout>
    <PPlaylistStarredArtists />
    <PlaylistIndex />
</Layout>