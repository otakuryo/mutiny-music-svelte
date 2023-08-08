<script lang="ts">
    import type { SubsonicAPI, SubsonicBaseResponse, Playlists } from '$models/servers/subsonic';
	import { onMount } from 'svelte';
	import PlaylistLineSong from '$components/app/playlist/partials/LinePlaylist.svelte';
	import LineTitle from '$components/app/playlist/partials/LineTitle.svelte';
	import LineInternalUrl from '$components/app/playlist/partials/LineInternalUrl.svelte';
	import { Disc, Users } from 'lucide-svelte';
	import InputTextCreatePlaylist from './partials/InputTextCreatePlaylist.svelte';
	import { MainServerSubsonicAPI } from '$lib/js/Helpers';

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
            console.log(error); 
            return {} as PlaylistServerType;
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

    <div class="p-2">
        <InputTextCreatePlaylist refreshCallback={refreshViewOnClick}/>
    </div>

    {#await dataFromServer}
        <div class="w-full">loading...</div>
    {:then playlists}
    
        {#if playlists.playlists.playlist && playlists.playlists.playlist.length > 0}
            <LineTitle title="Playlists" />

            {#each playlists.playlists.playlist as playlist}
                <PlaylistLineSong playlist={playlist} api={api} refreshViewOnClick={refreshViewOnClick} />
            {/each}
        {/if}

    {/await}

    <LineInternalUrl url="/playlists/starred-songs/" title="Starred Songs" />
    <LineInternalUrl url="/playlists/starred-albums/" title="Starred Albums" >
        <div slot="icon">
            <Disc strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
        </div>
    </LineInternalUrl>

    <LineInternalUrl url="/playlists/starred-artists/" title="Starred Artists (Working)" >
        <div slot="icon">
            <Users strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
        </div>
    </LineInternalUrl>

</div>