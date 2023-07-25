<script>
    import MusicFolderIndex from "$components/app/musicFolder/MusicFolderIndex.svelte";
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    import { page } from '$app/stores';
	import IndexesIndex from "$components/app/indexes/IndexesIndex.svelte";
    
    let haveID = false;
    let id = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('id');
        id = value.url.searchParams.get('id') || '';
    });

</script>

<Layout>

    {#if haveID}
        <IndexesIndex musicFolderId={id} />
    {:else}
        <MusicFolderIndex />
    {/if}
    <!-- <MusicFolderIndex /> -->
    <PlaylistIndex />
</Layout>