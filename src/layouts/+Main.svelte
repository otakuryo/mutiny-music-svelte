<script lang="ts">
    import FormRegister from "$components/app/settings/FormRegister.svelte";
    import HomePlaceHolder from "$components/test/+HomePlaceHolder.svelte";
    import { currentPage, GlobalPage } from "$stores/GlobalStore.ts";

    let _currentPage_: GlobalPage;

    currentPage.subscribe(value => {
		_currentPage_ = value;
	});

</script>

<div>
    {#if _currentPage_ == GlobalPage.directory}
        <p>Estás en la página de directorio</p>
    {:else if _currentPage_ == GlobalPage.album}
        <p>Estás en la página de álbum</p>
    {:else if _currentPage_ == GlobalPage.home}
        <HomePlaceHolder />
    {:else if _currentPage_ == GlobalPage.settings}
        <FormRegister />
    {/if}
</div>