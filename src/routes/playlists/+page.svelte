<script>
    import { page } from '$app/stores';
	import PPlaylistsIndex from '$components/app/playlist/PPlaylistsIndex.svelte';
	import PPlaylistIndex from '$components/app/playlist/PPlaylistIndex.svelte';
	import Layout from '$layouts/+Layout.svelte';
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    
    let haveID = false;
    let id = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('id');
        id = value.url.searchParams.get('id') || '';
    });
</script>

<Layout>
    {#if haveID}
        <PPlaylistIndex playlistId={id} />
    {:else}
        <PPlaylistsIndex />
    {/if}
    <PlaylistIndex />
</Layout>