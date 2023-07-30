<script>
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    import { page } from '$app/stores';
	import SearchIndex from "$components/app/search/SearchIndex.svelte";
    
    let haveID = false;
    let query = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('query');
        query = value.url.searchParams.get('query') || '';
    });

</script>

<Layout>
    {#if haveID}
        <SearchIndex query={query} />
    {:else}
        <SearchIndex />
    {/if}
    <!-- <MusicFolderIndex /> -->
    <PlaylistIndex />
</Layout>