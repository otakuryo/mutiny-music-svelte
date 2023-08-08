<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Child, Error, Directory } from '$models/servers/subsonic';
	import MusicFolderLineBack from '$components/app/musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
    import type { LetterLocal } from '$lib/types/global.d';

    type DirectoryType = (SubsonicBaseResponse & { directory: Directory });
    export let directoryId: string;
    let api: SubsonicAPI;

    let dataFromServer : Promise<DirectoryType> = Promise.resolve({} as (DirectoryType));

    // Attributes for IndexLetters
    let lettersArray: Array<LetterLocal> = [];

    onMount(async () => {
        refreshViewOnClick();
    });

    // Refresh view when click on a link
    $: if (directoryId) {
        refreshViewOnClick();
    }

    async function getDataFromServerV2(): Promise<DirectoryType>  {

        try {

            await new Promise(r => setTimeout(r, 1));
            
            api = MainServerSubsonicAPI();
            let resMusicDirectory: DirectoryType = await api.getMusicDirectory({id: directoryId});
            getLettersFromDirectories(resMusicDirectory.directory);
            return resMusicDirectory;
        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
        
    }

    async function getLettersFromDirectories(directories: Directory) {

        // Base attributes
        let letters: Set<LetterLocal> = new Set<LetterLocal>();
        let lettersCheck = new Set<string>();

        // Reset letters
        lettersArray = [];

        // If no child, return
        if (!directories.child) return;
        
        // Get letters if not exists
        directories.child.forEach((element: Child) => {
            let letterNotExists = !lettersCheck.has(element.title[0].toUpperCase());
            if (letterNotExists) {
                lettersCheck.add(element.title[0].toUpperCase());

                letters.add({
                    name: element.title[0].toUpperCase(),
                    id: element.id,
                    active: false
                });
            }
        });

        // Set letters
        lettersArray = Array.from(letters);
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServerV2();
	}

    function toggleDataFromServer(state: boolean){
        dataFromServer.then((libraries) => {

            libraries.directory.child.forEach((element: Child) => {
                if (!element.isDir) {
                    element.checked = state;
                }
            });
        })

        dataFromServer = dataFromServer;
    }

    function callbackCheckSonByIndex(){
        toggleDataFromServer(true);
    }

    function callbackUncheckSonByIndex(){
        toggleDataFromServer(false);
    }

</script>

<div class="main-left-panel">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}
    
        <div class="navigation-sticky">
            <IndexLetters bind:letters={lettersArray} />

            {#if libraries.directory && libraries.directory.parent}
                <MusicFolderLineBack name={libraries.directory.name} id={libraries.directory.parent}  />
            {/if}
            
            <ControlsNavigationPlaylist
                api={api}
                list={libraries.directory.child}
                callbackCheckSonByIndex={callbackCheckSonByIndex}
                callbackUncheckSonByIndex={callbackUncheckSonByIndex} />
        </div>

        {#each libraries.directory.child as song}

            <div class="w-full block relative -top-20 invisible" id="dir-song-{song.id}"></div>

            {#if song.isDir}
                <DirectoryLineDirectory
                    directory={song}
                    api={api} />

            {:else}
                <DirectoryLineMusic bind:song={song} api={api} />
            {/if}
        {/each}

    {/await}
</div>