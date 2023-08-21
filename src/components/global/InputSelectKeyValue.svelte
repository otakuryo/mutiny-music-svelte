<script lang="ts">
	import { InfoIcon } from 'lucide-svelte';

    export let labelSelect: string | undefined;
    export let valueSelect: string | undefined;
    export let informationSelect: string | undefined;
    export let optionsSelect: {[key: string]: string} = {};
    export let required = false;

    
</script>

<label class="block">
    <span class="dark:text-zinc-200 text-black">{labelSelect} {required ? '*' : ''}</span>
    <select
        class="dark:text-zinc-600 text-black block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        required={required}
        bind:value={valueSelect} 
        disabled={Object.keys(optionsSelect).length === 0}
    >
        <option value="0" disabled>Select an option - total: {Object.keys(optionsSelect).length}</option>

        {#each Object.keys(optionsSelect) as key}
            <option value={key}>{optionsSelect[key]}</option>
        {/each}
        
    </select>

    {#if informationSelect }
        <p class="px-2 text dark:text-zinc-400 dark:hover:text-zinc-200 text-zinc-400 hover:text-zinc-600 transition-all">
            <InfoIcon class="inline-block w-6 h-6 pb-1" />
            {informationSelect}
        </p>
    {/if}

</label>