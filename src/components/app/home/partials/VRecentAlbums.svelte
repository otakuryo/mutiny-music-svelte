<script lang="ts">
    import type { AlbumList2, SubsonicAPI, SubsonicBaseResponse } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import { MainServerSubsonicAPI } from '$lib/ts/Helpers';
	import HorizontalAlbums from '$components/app/search/partials/HorizontalAlbums.svelte';
	import LoadingLine from './LoadingLine.svelte';

    type TypeAlbumList2 = (SubsonicBaseResponse & { albumList2: AlbumList2 });

    let api: SubsonicAPI;

    let dataFromServer : Promise<TypeAlbumList2> = Promise.resolve({} as TypeAlbumList2);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<TypeAlbumList2> {

        try {
            api = MainServerSubsonicAPI();

            let resMusic: TypeAlbumList2 = await api.getAlbumList2({size: 10, type: 'recent'});

            if(resMusic.error) {
                throw new Error(`Error: ${resMusic.error.message}, Code: ${resMusic.error.code}, Method: "TopSongs"`);
            }
            return resMusic;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

</script>

{#await dataFromServer }
    <LoadingLine />
{:then responseRecentAlbums} 
    
    {#if responseRecentAlbums.albumList2 && responseRecentAlbums.albumList2.album}
        <HorizontalAlbums albums={responseRecentAlbums.albumList2.album} api={api} showBtnMore={false} title="Recents Albums" />
    {/if}

{:catch error}

    <div class="main-color divide-y border-theme mx-2 mt-2">
        <div class="w-full pl-2 z-10 text-red-500">{error.message}</div>
    </div>

{/await}

