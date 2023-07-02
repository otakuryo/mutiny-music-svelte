<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import MusicFolderLineBack from '../musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from './partials/DirectoryLineMusic.svelte';
	import ControlsPlaylist from './partials/ControlsPlaylist.svelte';

    export let directoryId: string|undefined = undefined;
    let api: SubsonicAPI;

    let dataFromServer : Promise<SubsonicBaseResponse[]> = Promise.resolve([]);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function initSubsonicApi() {

        // Obtenemos los datos del servidor desde la memoria persistente
        let server = ServerConfigPersistent.get();
        console.log(server);
        
        const api = new SubsonicAPI({
            url: server.serverUrl,
            type: server.serverType, // or "generic" or "navidrome"
        });

        api.loginSync({
            username: server.username,
            password: server.password,
            serverName: server.serverName,
            version: server.serverVersion,
        });

        return api;
    }

    async function getDataFromServer() {

        try {
            api = await initSubsonicApi();
        } catch (error) {
            console.log(error);
            return [];            
        }

        // const resPing: SubsonicBaseResponse = await api.ping()

        // // Si no hay una respuesta por parte del servidor, se para y no se hace nada
        // if (resPing.status !== "ok") {
        //     return [];
        // }

        await new Promise(r => setTimeout(r, 50));

        let resMusicDirectory: SubsonicBaseResponse[] = [];

        if (directoryId) {
            resMusicDirectory.push(await api.getMusicDirectory({id: directoryId}));
            return resMusicDirectory;
        }
        
        const resMusicFolders: SubsonicBaseResponse & { musicFolders: MusicFolders }  = await api.getMusicFolders()
        if (!resMusicFolders || !resMusicFolders.musicFolders || !resMusicFolders.musicFolders.musicFolder) {
            return [];
        }


        if (resMusicFolders.musicFolders.musicFolder.length > 0) {
            for(const folder of resMusicFolders.musicFolders.musicFolder) {
                resMusicDirectory.push(await api.getMusicDirectory({id: folder.id}))
            }
        }
        
        return resMusicDirectory;

    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    function toggleDataFromServer(indexes: number[], state: boolean){
        dataFromServer.then((libraries) => {
            libraries.forEach((library) => {
                if (library.directory) {
                    indexes.forEach((index) => {
                        library.directory.child[index].checked = state;
                    })
                }
            })
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

<div class="divide-y w-6/12">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}

        {#each libraries as library}
            {#if library.directory}

                {#if library.directory && library.directory.parent}
                    <MusicFolderLineBack name={library.directory.name} id={library.directory.parent} refreshViewOnClick={refreshViewOnClick}  />
                {/if}

                <ControlsPlaylist
                    api={api}
                    bind:list={library.directory.child}
                    callbackCheckSonByIndex={callbackCheckSonByIndex}
                    callbackUncheckSonByIndex={callbackUncheckSonByIndex} />

                {#each library.directory.child as child}
                    {#if child.isDir}
                        <DirectoryLineDirectory
                            directory={child}
                            api={api}
                            refreshViewOnClick={refreshViewOnClick} />

                    {:else}
                        <DirectoryLineMusic bind:song={child} api={api} />
                    {/if}
                {/each}
            {/if}
        {/each}
    {/await}
</div>