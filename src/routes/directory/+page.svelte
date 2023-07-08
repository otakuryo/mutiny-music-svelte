<script>
    import MusicFolderIndex from "$components/app/musicFolder/MusicFolderIndex.svelte";
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

	import DirectoryIndex from "$components/app/directory/DirectoryIndex.svelte";
    import { page } from '$app/stores';
    
    let haveID = false;
    let id = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('id');
        id = value.url.searchParams.get('id') || '';
    });

</script>

<Layout>

    {#if haveID}
        <DirectoryIndex directoryId={id} />
    {:else}
        <MusicFolderIndex />
    {/if}
    <!-- <MusicFolderIndex /> -->
    <PlaylistIndex />
</Layout>