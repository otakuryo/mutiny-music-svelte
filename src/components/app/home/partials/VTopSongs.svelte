<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, TopSongs } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
	import LineSong from '$components/global/Song/LineSong.svelte';
	import LoadingLine from './LoadingLine.svelte';

    type TypeTopSong = (SubsonicBaseResponse & { topSongs: TopSongs });

    let api: SubsonicAPI;

    let dataFromServer : Promise<TypeTopSong> = Promise.resolve({} as TypeTopSong);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<TypeTopSong> {

        try {
            api = MainServerSubsonicAPI();

            let resMusic: TypeTopSong = await api.getTopSongs({count: 20});

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

{#await dataFromServer}
    <LoadingLine />
{:then responseTopSongs}

    {#if responseTopSongs.topSongs && responseTopSongs.topSongs.song && responseTopSongs.topSongs.song.length > 0 }
    
        <div class="divide-y border-theme mx-2 mt-2">
            <div class="main-color w-full pl-2 z-10"> Top song </div>
        </div>
    
        <div class="divide-y border-theme mx-2 mt-2 overflow-y-scroll min-h-[13rem]">

            {#each responseTopSongs.topSongs.song as song}
                <LineSong song={song} api={api}/>
            {/each}

        </div>
    
    {/if}
    
{:catch error}

    <div class="divide-y border-theme mx-2 mt-2">
        <div class="w-full pl-2 z-10 text-red-500">{error.message}</div>
    </div>

{/await}


