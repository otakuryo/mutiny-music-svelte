<script>
	import DirectoryIndexV2 from "$components/app/directory/DirectoryIndexV2.svelte";
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<Layout>
    <DirectoryIndexV2 directoryId={data.id} />
    <PlaylistIndex />
</Layout>