<script>
	import { FolderMinus, FolderPlus } from "lucide-svelte";

    export let checked = false;
    export let toggleChecked = () => {};

</script>

<div class="cursor-pointer" on:click={toggleChecked} on:keypress={toggleChecked}>
    {#if checked }
        <FolderMinus class="stroke-current text-slate-900 dark:text-white h-6 w-6 ml-2.5 mr-4"/>
    {:else}
        <FolderPlus class="stroke-current text-slate-900 dark:text-white h-6 w-6 ml-2.5 mr-4"/>
    {/if}
</div>