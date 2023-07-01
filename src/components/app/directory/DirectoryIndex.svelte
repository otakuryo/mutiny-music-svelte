<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import MusicFolderLineBack from '../musicFolder/partials/MusicFolderLineBack.svelte';
	import { onMount } from 'svelte';
	import DirectoryLineDirectory from '$components/app/directory/partials/DirectoryLineDirectory.svelte';
	import DirectoryLineMusic from './partials/DirectoryLineMusic.svelte';

    import playerStore from '$stores/PlayerStore';
	import ControlsPlaylist from './partials/ControlsPlaylist.svelte';

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

    async function getDownloadLink(songId: string) {
        try {
            api = await initSubsonicApi();

            let song = await api.downloadWoFetch({id: songId});

            return song;
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    // Temporal reproductor
    let src = "";
    let paused = true;

    async function setAndPlay(song:string) {
        if (!song) {
            return;
        }
        paused = true;
        // Añadimos la url de la canción al reproductor
        src = song;
        // Esperamos 100ms para que el reproductor se actualice
        await new Promise(r => setTimeout(r, 100));
        paused = false;
    }

    function playSonngWithHowler(songUrl:string, songId: string) {
        playerStore.setSongAndPlay(songUrl, {id:0, songId: songId});
    }

    function showDownloadLink(songId: string) {
        getDownloadLink(songId).then((res) => {
            playSonngWithHowler(res, songId);
        })
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