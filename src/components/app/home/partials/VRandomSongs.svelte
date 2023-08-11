<script lang="ts">
    import type { Songs, SubsonicAPI, SubsonicBaseResponse, TopSongs } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';
	import LineSong from '$components/global/Song/LineSong.svelte';
	import LoadingLine from './LoadingLine.svelte';
	import { RotateCcw } from 'lucide-svelte';

    type TypeTopSong = (SubsonicBaseResponse & { randomSongs: Songs });

    let api: SubsonicAPI;

    let dataFromServer : Promise<TypeTopSong> = Promise.resolve({} as TypeTopSong);

    onMount(async () => {
        dataFromServer = getDataFromServer();
    });

    async function getDataFromServer(): Promise<TypeTopSong> {

        try {
            api = MainServerSubsonicAPI();

            let resMusic: TypeTopSong = await api.getRandomSongs({size: 10});

            if(resMusic.error) {
                throw new Error(`Error: ${resMusic.error.message}, Code: ${resMusic.error.code}, Method: "TopSongs"`);
            }
            return resMusic;

        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
    }

</script>

{#await dataFromServer}
    <LoadingLine />
{:then responseRandomSongs}

    {#if responseRandomSongs.randomSongs && responseRandomSongs.randomSongs.song && responseRandomSongs.randomSongs.song.length > 0 }
    
        <div class="border-theme mx-2 mt-2 flex">
            <div class="pl-2 z-10"> Random songs </div>
            <div class="pr-2 z-10 ml-auto cursor-pointer" on:click={refreshViewOnClick} on:keyup={refreshViewOnClick}>
                <RotateCcw class="py-1" />
            </div>
        </div>
    
        <div class="divide-y border-theme mx-2 mt-2 overflow-y-scroll min-h-[13rem]">

            {#each responseRandomSongs.randomSongs.song as song}
                <LineSong song={song} api={api}/>
            {/each}

        </div>
    
    {/if}
    
{:catch error}

    <div class="divide-y border-theme mx-2 mt-2">
        <div class="w-full pl-2 z-10 text-red-500">{error.message}</div>
    </div>

{/await}


