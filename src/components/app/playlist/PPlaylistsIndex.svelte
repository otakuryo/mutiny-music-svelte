<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Playlists } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import PlaylistLineSong from '$components/app/playlist/partials/LinePlaylist.svelte';
	import LineTitle from '$components/app/playlist/partials/LineTitle.svelte';
	import LineInternalUrl from '$components/app/playlist/partials/LineInternalUrl.svelte';
	import { Disc, Users } from 'lucide-svelte';
	import InputTextCreatePlaylist from './partials/InputTextCreatePlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/ts/Helpers';
	import LoadingLinePL from '$components/app/playlist/partials/LoadingLinePL.svelte';

    // export let playlistId: string|undefined = undefined;
    let api: SubsonicAPI;

    type PlaylistServerType = (SubsonicBaseResponse & { playlists: Playlists });

    let dataFromServer : Promise<PlaylistServerType> = Promise.resolve({} as (PlaylistServerType));

    onMount(async () => {
        refreshViewOnClick();
    });

    async function getDataFromServer(): Promise<PlaylistServerType> {

        try {
            api = MainServerSubsonicAPI();
            let resMusicPlaylist: PlaylistServerType = await api.getPlaylists();
            return resMusicPlaylist;
        } catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
    }

    function refreshViewOnClick() {
        dataFromServer = getDataFromServer();
	}

    // $: console.log(dataFromServer, dataFromServer.then((playlists) => {
    //     console.log(playlists);
    // }));

</script>

<div class="main-left-panel">

    <div class="content-parent">

        <div class="p-2 mx-2 mt-2">
            <InputTextCreatePlaylist refreshCallback={refreshViewOnClick}/>
        </div>
    
        {#await dataFromServer}
            <LoadingLinePL />
        {:then playlists}
        
            {#if playlists.playlists.playlist && playlists.playlists.playlist.length > 0}
                <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
                    
                    <LineTitle title="Playlists" />
        
                    {#each playlists.playlists.playlist as playlist}
                        <PlaylistLineSong playlist={playlist} api={api} refreshViewOnClick={refreshViewOnClick} />
                    {/each}

                </div>
            {/if}
            
        {:catch error}

            <div class="main-color divide-y border-theme mx-2 mt-2">
                <div class="w-full pl-2 z-10 text-red-500">Error: {error.message}</div>
            </div>

        {/await}

        <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
            
            <LineInternalUrl url="/playlists/starred-songs/" title="Starred Songs" />
            <LineInternalUrl url="/playlists/starred-albums/" title="Starred Albums" >
                <div slot="icon">
                    <Disc strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
                </div>
            </LineInternalUrl>
        
            <LineInternalUrl url="/playlists/starred-artists/" title="Starred Artists" >
                <div slot="icon">
                    <Users strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
                </div>
            </LineInternalUrl>

        </div>
    
    </div>

</div>