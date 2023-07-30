<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Child, Error, Directory } from '$models/servers/subsonic';
	import MusicFolderLineBack from '$components/app/musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from '$components/app/directory/partials/DirectoryLineMusic.svelte';
	import ControlsNavigationPlaylist from '$components/global/NavigationPlaylist/ControlsNavigationPlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';

    type DirectoryType = (SubsonicBaseResponse & { directory: Directory });
    export let directoryId: string;
    let api: SubsonicAPI;

    let dataFromServer : Promise<DirectoryType> = Promise.resolve({} as (DirectoryType));

    onMount(async () => {
        refreshViewOnClick();
    });

    async function getDataFromServerV2(): Promise<DirectoryType>  {

        try {

            await new Promise(r => setTimeout(r, 1));
            
            api = MainServerSubsonicAPI();
            let resMusicDirectory: DirectoryType = await api.getMusicDirectory({id: directoryId});
            return resMusicDirectory;
        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
        
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServerV2();
	}

    function toggleDataFromServer(indexes: number[], state: boolean){
        dataFromServer.then((libraries) => {

            libraries.directory.child.forEach((element: Child) => {
                if (element.isDir) {
                    element.checked = state;
                }
            });
        })

        dataFromServer = dataFromServer;
    }

    function callbackCheckSonByIndex(indexes: number[] ){
        toggleDataFromServer(indexes, true);
    }

    function callbackUncheckSonByIndex(indexes: number[] ){
        toggleDataFromServer(indexes, false);
    }

</script>

<div class="main-left-panel">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}
    
        {#if libraries.directory && libraries.directory.parent}
            <MusicFolderLineBack name={libraries.directory.name} id={libraries.directory.parent} refreshViewOnClick={refreshViewOnClick}  />
        {/if}
        
        <ControlsNavigationPlaylist
            api={api}
            list={libraries.directory.child}
            callbackCheckSonByIndex={callbackCheckSonByIndex}
            callbackUncheckSonByIndex={callbackUncheckSonByIndex} />

        {#each libraries.directory.child as song}

            {#if song.isDir}
                <DirectoryLineDirectory
                    directory={song}
                    api={api}
                    refreshViewOnClick={refreshViewOnClick} />

            {:else}
                <DirectoryLineMusic song={song} api={api} />
            {/if}
        {/each}

    {/await}
</div>