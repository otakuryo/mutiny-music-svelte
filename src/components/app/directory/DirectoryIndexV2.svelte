<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Child, Error, Directory } from '$models/servers/subsonic';
	import LineBack from '$components/global/Navigation/LineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { AddItemToBreadcrumbs, RemoveItemOnBreadcrumbs, MainServerSubsonicAPI } from '$lib/ts/Helpers';
	import IndexLetters from '$components/global/Navigation/IndexLetters.svelte';
    import type { LetterLocal } from '$lib/types/global.d';
	import LoadingLineDir from './partials/LoadingLineDir.svelte';
	import BreadcrumbBase from '$components/global/breadcrumb/BreadcrumbBase.svelte';

    type DirectoryType = (SubsonicBaseResponse & { directory: Directory });
    export let directoryId: string;
    let api: SubsonicAPI;

    let dataFromServer : Promise<DirectoryType> = Promise.resolve({} as (DirectoryType));

    // Attributes for IndexLetters
    let lettersArray: Array<LetterLocal> = [];

    // onMount(async () => {
    //     refreshViewOnClick();
    // });

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
            if (resMusicDirectory.directory) {
                AddItemToBreadcrumbs(resMusicDirectory.directory.name, `/directory?id=${resMusicDirectory.directory.id}` );
            } else {
                AddItemToBreadcrumbs('Music Folders', `/directory?id=${directoryId}`);
            }

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
    <div class="content-parent">

        {#await dataFromServer}
            <LoadingLineDir />
        {:then libraries}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <BreadcrumbBase />
            </div>

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <IndexLetters bind:letters={lettersArray} />
            </div>
    
            {#if libraries.directory && libraries.directory.parent}
                <div class="main-color divide-y border-theme mx-2 mt-2">
                    <LineBack name={libraries.directory.name} url="/directory?id={libraries.directory.parent}"  onBack={RemoveItemOnBreadcrumbs} />
                </div>
            {/if}

            <div class="divide-y border-theme mx-2 mt-2">
                <ControlsNavigationPlaylist
                    api={api}
                    list={libraries.directory.child}
                    callbackCheckSonByIndex={callbackCheckSonByIndex}
                    callbackUncheckSonByIndex={callbackUncheckSonByIndex} />
            </div>

            <div class="divide-y border-theme m-2 overflow-y-scroll main-color">
                {#each libraries.directory.child as song}
        
                    <div class="w-full block relative opacity-0 border-0" id="dir-song-{song.id}"></div>
        
                    {#if song.isDir}
                        <DirectoryLineDirectory
                            bind:directory={song}
                            api={api} />
        
                    {:else}
                        <DirectoryLineMusic bind:song={song} api={api} />
                    {/if}
                {/each}
            </div>

        {:catch error}
            <div class="divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">{error.message}</div>
            </div>
    
        {/await}
    </div>
</div>