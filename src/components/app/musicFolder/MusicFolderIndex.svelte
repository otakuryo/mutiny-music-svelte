
<script lang="ts">
    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import DirectoryIndex from '../directory/DirectoryIndex.svelte';
	import MusicFolderLine from './partials/MusicFolderLine.svelte';

    let _data_ = [];
    let api: SubsonicAPI;

    async function initSubsonicApi() {

        // Obtenemos los datos del servidor desde la memoria persistente
        let server = ServerConfigPersistent.get();
        
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
        api = await initSubsonicApi();

        const resPing: SubsonicBaseResponse = await api.ping()

        // Si no hay una respuesta por parte del servidor, se para y no se hace nada
        if (resPing.status !== "ok") {
            return [];
        }
        const resMusicFolders: SubsonicBaseResponse & { musicFolders: MusicFolders }  = await api.getMusicFolders()

        if (!resMusicFolders || !resMusicFolders.musicFolders || !resMusicFolders.musicFolders.musicFolder) {
            return [];
        }
        
        console.log(resPing,resMusicFolders, resMusicFolders.musicFolders.musicFolder);
        
        return resMusicFolders;

    }

</script>

<div class="divide-y">
    {#await getDataFromServer()}
        <div>loading...</div>
    {:then musicFolders}
        {#each musicFolders.musicFolders.musicFolder as musicFolder}
            <MusicFolderLine folder={musicFolder} />
        {/each}
    {/await}
</div>