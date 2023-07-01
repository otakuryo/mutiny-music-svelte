<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import { Play, Pause, ListEnd } from "lucide-svelte";
    import { isPlaying } from "$stores/PlayerStore";
	import PlayerStore from "$stores/PlayerStore";
	import PlaylistStore from '$stores/PlaylistStore';
    import {currentSong} from "$stores/CurrentPlaySong";

    export let song: Child;
    export let api: SubsonicAPI;
    export let onClickExternal: (songId: string) => void;

    let imageUrl = "https://placehold.it/210x310";
    let fallback = imageUrl;

    function getCoverArt() {
        let image = api.getCoverArtWoFetchSync({id: song.id});
        imageUrl = image
    }

    getCoverArt()
    const handleError = (ev: { target: { src: string; } } | any) => ev.target.src = fallback;

    function buildSongUrl() {
        return api.downloadWoFetchSync({id: song.id});
    }

    function addSongToPlaylist() {
        song.downloadSongUrl = buildSongUrl();
        song.songId = song.id;
        let index = PlaylistStore.addSong(song);
        return index;
    }

    function addSongToPlaylistAndPlay() {
        let index = addSongToPlaylist();
        PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
    }

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"
    data-id={song.id}
    data-is-dir={song.isDir}
    data-parent={song.parent}
    data-title={song.title}>
    <div class="cursor-pointer">
        <div class="p-2 flex items-center z-50">
            
            <img loading="lazy" src={imageUrl} on:error={handleError} data-amplitude-song-info="cover_art_url" class="w-12 h-12 rounded-sm mr-6 border-bg-player-light-background dark:border-cover-dark-border object-cover" alt={song.title}/>

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{song.title}</span>
            </div>

            <div class="ml-auto flex flex-row">

                <!-- Añadir a la playlist -->
                <div on:click={addSongToPlaylist}>
                    <ListEnd class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                </div>

                {#if $isPlaying && $currentSong.id === song.id}
                    <!-- Pausar -->
                    <div on:click={() => {PlayerStore.toggle()}}>
                        <Pause class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                    </div>
                {:else}
                    <!-- Reproducir -->
                    <div on:click={addSongToPlaylistAndPlay}>
                        <Play class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                    </div>
                {/if}

            </div>
        </div>
    </div>
</div>

