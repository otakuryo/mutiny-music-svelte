<script lang="ts">
	import type { ServerConfig } from '$models/ServerConfig.model';
    import { ServerConfigObj, ServerConfigPersistent } from '$stores/ServerConfigStore';

    export let labelSelect = "";
    export let valueSelect = "";
    export let optionsSelect = [""];
    export let required = false;

    export let keyLocal: keyof ServerConfig ;

    // On update valueSelect, save in localStorage
    $: {
        if (valueSelect && keyLocal !== undefined) {
            console.log("valueSelect", valueSelect);
            
            ServerConfigPersistent.setKey(keyLocal, valueSelect)
            ServerConfigObj.setKey(keyLocal, valueSelect)
        }
    }
    
</script>

<label class="block">
    <span class="dark:text-zinc-200 text-black">{labelSelect} {required ? '*' : ''}</span>
    <select
        class="dark:text-zinc-600 text-black block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        required={required}
        bind:value={valueSelect} 
    >
        {#each optionsSelect as option}
            <option value={option}>{option}</option>
        {/each}
        
    </select>
</label>