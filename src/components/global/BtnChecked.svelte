<script>
	import { CheckCircle, PlusCircle } from "lucide-svelte";

    export let checked = false;
    export let toggleChecked = () => {};

</script>

<div on:click={toggleChecked} on:keypress={toggleChecked}>
    {#if checked }
        <CheckCircle class="stroke-current text-slate-900 dark:text-white h-6 w-6 ml-2.5 mr-4"/>
    {:else}
        <PlusCircle class="stroke-current text-slate-900 dark:text-white h-6 w-6 ml-2.5 mr-4"/>
    {/if}
</div>