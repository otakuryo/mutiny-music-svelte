<script lang="ts">
	import { Check, Keyboard, Loader, Search } from "lucide-svelte";
    type typeStateSearch = 'waiting' | 'typing' | 'searching' | 'search-done';

    export let searchText = '';

    export let stateSearchText: typeStateSearch = 'waiting';

</script>

<style>
    /* .start-animation-line {
        animation: start-animation-line 1.5s ease-in-out;
    }

    @keyframes start-animation-line {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    } */
</style>
<div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden transition duration-500">
    <div class="grid place-items-center h-full w-12 text-gray-300">
        
        {#if stateSearchText == 'waiting'}
            <Search class="w-6 h-6"/>
        {:else if stateSearchText == 'typing'}
            <Keyboard class="w-6 h-6"/>
        {:else if stateSearchText == 'searching'}
            <Loader class="w-6 h-6"/>
        {:else if stateSearchText == 'search-done'}
            <Check class="w-6 h-6"/>
        {/if}

    </div>
    <!-- svelte-ignore a11y-autofocus -->
    <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none focus:outline-none focus:outline-transparent focus:ring-0 focus:border-transparent"
        type="text"
        bind:value={searchText}
        id="search"
        placeholder="Search..."
        autocomplete="off"
        autofocus
    />
</div>