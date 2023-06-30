<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import MusicFolderLineBack from '../musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from './partials/DirectoryLineMusic.svelte';

    let api: SubsonicAPI;
    export let directoryId: string|undefined = undefined;

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

        await api.login({
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

        const resPing: SubsonicBaseResponse = await api.ping()

        // Si no hay una respuesta por parte del servidor, se para y no se hace nada
        if (resPing.status !== "ok") {
            return [];
        }

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

    // Temporal reproductor
    let src = "";
    let paused = true;

    async function getDownloadLink(songId: string) {

        // Paramos la canción actual
        paused = true;
        
        try {
            api = await initSubsonicApi();

            let song = await api.downloadWoFetch({id: songId});

            // Añadimos la url de la canción al reproductor
            src = song;

            // Esperamos 100ms para que el reproductor se actualice
            await new Promise(r => setTimeout(r, 100));
            paused = false;

            return song;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    function showDownloadLink(songId: string) {
        getDownloadLink(songId)
    }

    //// Debug data
    //$: dataFromServer.then((res) => {
    //        console.log(res);
    //    })

</script>

{#if src}
    <audio {src} bind:paused={paused} controls class="audio"></audio>
{/if}

<div class="divide-y">
    {#await dataFromServer}
        <div>loading...</div>
    {:then libraries}

        {#each libraries as library}
            {#if library.directory}

                {#if library.directory && library.directory.parent}
                    <MusicFolderLineBack name={library.directory.name} id={library.directory.parent} refreshViewOnClick={refreshViewOnClick}  />
                {/if}

                {#each library.directory.child as child}
                    {#if child.isDir}
                        <DirectoryLineDirectory directory={child} api={api} refreshViewOnClick={refreshViewOnClick} />
                    {:else}
                        <DirectoryLineMusic song={child} api={api} onClickExternal={showDownloadLink} />
                    {/if}
                {/each}
            {/if}
        {/each}
    {/await}
</div>