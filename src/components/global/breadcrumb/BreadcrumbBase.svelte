<script lang="ts">
	import { ChevronRight, Home } from 'lucide-svelte';
    import BreadcrumbStore from '$stores/BreadcrumbStore';

</script>

<nav class="breadcrumbs flex py-1 px-2" aria-label="Breadcrumb">
	<ol class="inline-flex items-center space-x-1 md:space-x-3">
	
		<li>
			<div class="flex items-center">
                <a href="/" class="item" on:click={BreadcrumbStore.clear}>
                    <Home class="w-6 h-6" />
                </a>
			</div>
		</li>

        {#each $BreadcrumbStore as item, index}
            <li>
                <div class="flex items-center h-6">
                    <ChevronRight class="w-6 h-6 text-zinc-400" />
                    {#if index === $BreadcrumbStore.length - 1}
                        <span class="mt-1 item">
                            {item.name}
                        </span>
                    {:else}
                        <a href={item.path} class="mt-1 item font-bold" on:click={()=>{BreadcrumbStore.removeFromIndex(index)}}>
                            {item.name}
                        </a>
                    {/if}
                </div>
            </li>
        {/each}

	</ol>
</nav>
