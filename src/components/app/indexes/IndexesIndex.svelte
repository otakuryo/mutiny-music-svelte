<script lang="ts">

    import { type MusicFolders, SubsonicAPI, type SubsonicBaseResponse, type Child, type IndexesID3 } from '$models/servers/subsonic';
    import { ServerConfigPersistent } from '$stores/ServerConfigStore';
	import { onMount } from 'svelte';
	import LineArtist from './partials/LineArtist.svelte';
	import viewport from '$lib/js/useViewPortAction';

    type IndexesTypeLocal = (SubsonicBaseResponse & { indexes: IndexesID3 });

    export let musicFolderId: string|undefined = undefined;

    let dataFromServer : Promise<IndexesTypeLocal> = Promise.resolve({} as (IndexesTypeLocal));
    let api: SubsonicAPI;

    type LetterLocal = {name: string, active: boolean, index: number};
    let letters: Array<LetterLocal> = [];

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

    async function getDataFromServer(): Promise<IndexesTypeLocal> {

        try {
            api = await initSubsonicApi();

            // if not playlistId, return empty object
            if (musicFolderId === undefined) return {} as IndexesTypeLocal;
            
            let resMusicPlaylist: IndexesTypeLocal = await api.getIndexesID3({musicFolderId: musicFolderId});

            letters = getFirstLetterFromIndexes(resMusicPlaylist.indexes);
            console.log(letters);
            

            return resMusicPlaylist;

        } catch (error) {
            console.log(error); 
            return {} as IndexesTypeLocal;
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    function getFirstLetterFromIndexes(indexes: IndexesID3): Array<LetterLocal> {
        if (!indexes.index) {
            return [];
        }

        let letters = indexes.index.map((element, index) => {
            return { name: element.name, active: false, index: index};
        });

        return letters;
    }

    let lastActiveIndex = 0;
    function onShowLetter(index: number) {
        if (lastActiveIndex !== index) {
            letters[lastActiveIndex].active = false;
        }
        letters[index].active = true;
        lastActiveIndex = index;
    }

</script>

<div class="main-left-panel">
    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then libraries}

        <div class="navigation-sticky">
            <div class="flex flex-row justify-around w-full uppercase border-b-[1px]">
                {#each letters as letter}
                    <div><a href="#letter-{letter.name}" class="opacity-50" class:opacity-100={letter.active}>{letter.name}</a></div>
                {/each}
            </div>
        </div>

        {#if libraries.indexes.index && libraries.indexes.index.length > 0}

            {#each libraries.indexes.index as line, index}

                <div class="border-b-0">
                    <div class="w-full pl-2 h-8 uppercase" id="letter-{line.name}"> {line.name} </div>
                </div>

                {#if line.artist && line.artist.length > 0}
                    <div class="divide-y" use:viewport on:enterViewport={() => {onShowLetter(index)} }>
                        {#each line.artist as artist}
                            <LineArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                        {/each}
                    </div>
                {/if}

            {/each}

        {/if}

    {/await}
</div>