<script>
    import MusicFolderIndex from "$components/app/musicFolder/MusicFolderIndex.svelte";
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    import { page } from '$app/stores';
	import DirectoryIndexV2 from "$components/app/directory/DirectoryIndexV2.svelte";
    
    let haveID = false;
    let id = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('id');
        id = value.url.searchParams.get('id') || '';
    });

    // id !== "-1" ==> Es por gonic

</script>

<Layout>

    {#if haveID && id !== "-1"}
        <DirectoryIndexV2 directoryId={id} />
    {:else}
        <MusicFolderIndex />
    {/if}
    <!-- <MusicFolderIndex /> -->
    <PlaylistIndex />
</Layout>