<script lang="ts">
    import FormRegister from "$components/app/settings/FormRegister.svelte";
    import HomePlaceHolder from "$components/test/+HomePlaceHolder.svelte";
    import { currentPage } from "$stores/GlobalStore.js";
    import type { GlobalPage } from "$interfaces/GlobalPage";

    let _currentPage_: GlobalPage;

    currentPage.subscribe(value => {
		_currentPage_ = value;
	});

</script>

<!-- <div>
    {#if _currentPage_ == GlobalPage.directory}
        <DirectoryIndex />
    {:else if _currentPage_ == GlobalPage.album}
        <MusicFolderIndex />
    {:else if _currentPage_ == GlobalPage.home}
        <HomePlaceHolder />
    {:else if _currentPage_ == GlobalPage.settings}
        <FormRegister />
    {:else if _currentPage_ == GlobalPage.folder}
        <MusicFolderIndex />
    {/if}
</div> -->