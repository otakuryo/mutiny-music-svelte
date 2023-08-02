<script lang="ts">
	import { MainServerSubsonicAPI } from "$lib/js/Helpers";
	import { Check, FilePlus, Keyboard, Loader, Save, Search, Server } from "lucide-svelte";
    type typeState = 'waiting' | 'typing' | 'save' | 'saving';

    export let searchText = '';
    export let refreshCallback = () => {};
    let oldSerachText = '';
    let timeout: NodeJS.Timeout| undefined = undefined;

    export let stateSearchText: typeState = 'waiting';

    function updateState() {

        if (searchText === '') {
            stateSearchText = 'waiting';
        } else if (searchText.length > 0 && searchText === oldSerachText) {
            stateSearchText = 'save';
        } else {
            stateSearchText = 'typing';
            setTimeoutState();
        }

    }

    function setTimeoutState() {
        
        clearTimeout(timeout);
    
        timeout = setTimeout(() => {
            console.log('save');
            oldSerachText = searchText;
            updateState();
        }, 300);
    }

    async function savePlaylist() {
        
        if (!searchText) return;

        try {
            stateSearchText = 'saving';
            let api = MainServerSubsonicAPI();
            await api.createPlaylist({name: searchText});
            searchText = '';
            stateSearchText = 'waiting';
            refreshCallback();
        } catch (error) {
            console.log("Error saving playlist", error);
        }
    }
    
	function handleOnSubmit() {
        
        if (stateSearchText !== 'save') return;

        console.log("handleOnSubmit: Saving...")
        savePlaylist();
	}

</script>

<div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden transition duration-500">
    <div class="grid place-items-center h-full w-12">
        
        {#if stateSearchText == 'waiting'}
            <FilePlus class="w-6 h-6 text-gray-700"/>
        {:else if stateSearchText == 'typing'}
            <Loader class="w-6 h-6 text-gray-700"/>
        {:else if stateSearchText == 'save'}
            <Save class="w-6 h-6 text-gray-900"/>
        {:else if stateSearchText == 'saving'}
            <Server class="w-6 h-6 text-gray-700 animate-pulse"/>
        {/if}

    </div>

    <form class="h-full w-full" on:submit|preventDefault={handleOnSubmit}>
        <input
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none focus:outline-none focus:outline-transparent focus:ring-0 focus:border-transparent"
            disabled={stateSearchText === 'saving'}
            type="text"
            bind:value={searchText}
            on:keyup={updateState}
            id="search"
            placeholder="Create Playlist..."
            autocomplete="off"
        />
    </form>
    
</div>