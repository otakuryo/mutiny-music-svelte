<script>
	import Layout from '$layouts/+Layout.svelte';
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
	import PPlaylistStarredAlbums from '$components/app/playlist/PPlaylistStarredAlbums.svelte';
</script>

<Layout>
    <PPlaylistStarredAlbums />
    <PlaylistIndex />
</Layout>