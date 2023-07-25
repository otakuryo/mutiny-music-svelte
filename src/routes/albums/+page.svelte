<script>
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    import { page } from '$app/stores';
	import AlbumsIndex from "$components/app/albums/AlbumsIndex.svelte";
	import DirectoryIndex from "$components/app/directory/DirectoryIndex.svelte";
	import AlbumIndex from "$components/app/albums/AlbumIndex.svelte";
    
    let haveID = false;
    let id = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('id');
        id = value.url.searchParams.get('id') || '';
    });

</script>

<Layout>

    {#if haveID}
        <AlbumIndex albumId={id} />
    {:else}
        <AlbumsIndex />
    {/if}
    <!-- <MusicFolderIndex /> -->
    <PlaylistIndex />
</Layout>