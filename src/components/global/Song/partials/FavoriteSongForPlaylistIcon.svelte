<script lang="ts">
	import type { Child, PlaylistWithSongs, SubsonicAPI, SubsonicBaseResponse } from "$models/servers/subsonic";
	import { ServerConfigObj } from "$stores/ServerConfigStore";
	import { FileHeart, Loader } from "lucide-svelte";

    export let song: Child;
    export let api: SubsonicAPI;
    export let width: string = "w-12";
    export let height: string = "h-6";

    let playlistId: string | undefined;
    let playlistName: string | undefined ;

    let playlistCount: Map<string, number[]> = new Map();
    let count = 0;
    let loading = false;

    $: if(song){
        getPlaylistDefault()
    }

    /**
     * Get playlist default data
     */
    async function getPlaylistDefault(){
        loading = true;
        let config = ServerConfigObj.get();
        playlistId = config.defaultPlaylistId;
        playlistName = config.defaultPlaylistName;

        await updatePlaylistCount();
        loading = false;
    }

    /**
     * Update playlist count
     */
    async function updatePlaylistCount(){
        playlistCount = await getPlaylistFromServerAndFormat()
        count = getPlaylistCountForSong()
    }

    /**
     * Get playlist and format list
     */
    async function getPlaylistFromServerAndFormat(){
        
        if (!playlistId) return new Map()

        type PlaylistServerType = (SubsonicBaseResponse & { playlist: PlaylistWithSongs })

        let response: PlaylistServerType = await api.getPlaylist({id: playlistId})

        if (response.error) return new Map()

        if (!response.playlist || !response.playlist.entry) return new Map();

        let playlistCount = new Map()
        
        response.playlist.entry.forEach((song, index) => {

            let songId = song.id;

            if (playlistCount.has(songId)) {
                let array_song = playlistCount.get(songId)
                array_song.push(index)
                playlistCount.set(songId, array_song)
            } else {
                playlistCount.set(songId, [index])
            }

        });

        return playlistCount;
    }

    /**
     * Check if song is in playlist and return count
     */
    function getPlaylistCountForSong(){
        if (playlistCount.has(song.id)) {
            return playlistCount.get(song.id)!.length
        } else {
            return 0
        }
    }

    /**
     * Add or remove song from playlist default
     */
     async function addToPlaylist() {
        if (!playlistId) {
            return;
        }

        loading = true;

        playlistCount = await getPlaylistFromServerAndFormat()

        if (playlistCount.has(song.id)) {
            
            let indexes = playlistCount.get(song.id)
            
            if (!indexes) return;

            let response = await api.updatePlaylist({playlistId: playlistId, songIndexToRemove: indexes});

            if (response.status == "ok") {
                updatePlaylistCount();
            }

        } else {
            let response = await api.updatePlaylist({playlistId: playlistId, songIdToAdd: [song.id]});
            if (response.status == "ok") {
                updatePlaylistCount();
            }
        }

        loading = false;
    }
    
</script>

<!-- Añadir a favoritos -->
{#if playlistId}
    {#if loading}
        <div>
            <Loader class="stroke-current animate-spin text-slate-900 dark:text-zinc-200 {height} {width}" />
        </div>
    {:else}
        <div on:click={addToPlaylist} on:keydown={addToPlaylist} title="{playlistName}" class="relative cursor-pointer">
            {#if count > 0 }
                <FileHeart class="stroke-current text-slate-900 dark:text-red-500 {height} {width}"/>
                <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 right-0 dark:border-gray-900">{count}</div>
            {:else}
                <FileHeart class="stroke-current text-slate-900 dark:text-zinc-200 {height} {width}" />
            {/if}
        </div>
    {/if}
{/if}