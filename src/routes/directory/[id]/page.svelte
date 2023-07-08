<script>
	import DirectoryIndex from "$components/app/directory/DirectoryIndex.svelte";
	import PlaylistIndex from "$components/app/player/PlaylistIndex.svelte";
    import Layout from "$layouts/+Layout.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<Layout>
    <DirectoryIndex directoryId={data.id} />
    <PlaylistIndex />
</Layout>