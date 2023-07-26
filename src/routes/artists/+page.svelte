<script>
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    import { page } from '$app/stores';
	import IndexesIndex from "$components/app/indexes/IndexesIndex.svelte";
	import ArtistsIndex from "$components/app/artists/ArtistsIndex.svelte";
	import ArtistIndex from "$components/app/artists/ArtistIndex.svelte";
    
    let haveID = false;
    let id = '';
    
    $: page.subscribe(value => {
        haveID = value.url.searchParams.has('id');
        id = value.url.searchParams.get('id') || '';
    });

</script>

<Layout>

    {#if haveID}
        <ArtistIndex artistID={id} />
    {:else}
        <ArtistsIndex />
    {/if}
    <PlaylistIndex />
</Layout>