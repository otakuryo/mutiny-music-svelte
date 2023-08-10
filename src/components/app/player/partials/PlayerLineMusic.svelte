<script lang="ts">
	import type { Child } from "$models/servers/subsonic";
	import { currentSong } from "$stores/CurrentPlaySong";
	import PlayerStore, { isPlaying } from "$stores/PlayerStore";
	import PlaylistStore from "$stores/PlaylistStore";
	import { Pause, Play, Star, Trash2 } from "lucide-svelte";
    import { getDurationHuman, MainServerSubsonicAPI } from "$lib/js/Helpers.js";
    import ImgCover from "$components/global/ImgCover.svelte";
	import FavoriteIcon from "$components/global/Song/partials/FavoriteIcon.svelte";

    export let song: Child;
    export let index: number = -1;
    let durationHuman = '00:00';
    let api = MainServerSubsonicAPI();


    function pauseSong() {
        PlayerStore.pause();
    }

    function playSong() {
        PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
    }

    function deleteSong() {
        console.log("deleteSong");
        if (index === -1) return;
        PlaylistStore.removeSongByIndex(index);
    }

    /**
     * Toggle star
     * 
     * If star is true, then the song is starred, so we want to remove it from starred songs
     */
     async function toggleStar() {
        api = MainServerSubsonicAPI();
        if (song.starred === undefined) {
            await api.star({id: song.id});
            song.starred = new Date();
        } else {
            await api.unstar({id: song.id});
            song.starred = undefined;
        }
    }

    // Detectamos cuando cambia la canción actual, para actualizar la duración
    $: if (song) {
        durationHuman = getDurationHuman(song.duration);
    }
</script>
<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={song.id}
    data-is-dir={song.isDir}
    data-parent={song.parent}
    data-title={song.title}>
    <div class="cursor-pointer">
        <div class="py-2 flex items-center">
            
            <!-- delete -->
            {#if $isPlaying && $currentSong.id === song.id}
                <div>
                    <Trash2 class="stroke-current text-red-500 dark:text-red-700 opacity-50 h-6 w-12 cursor-not-allowed"/>
                </div>
            {:else}
                <div on:click={deleteSong} on:keypress={deleteSong}>
                    <Trash2 class="stroke-current text-red-500 dark:text-red-700 h-6 w-12"/>
                </div>
            {/if}
            
            <ImgCover api={api} title={song.title} songId={song.id} />

            <div class="flex flex-col w-72">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white truncate">{song.title}</span>
                <span data-amplitude-song-info="time" class="font-sans text-sm font-medium text-gray-500 dark:text-gray-400">{durationHuman}</span>
            </div>

            <div class="ml-auto flex flex-row">

                <FavoriteIcon song={song} api={api}/>

                {#if $isPlaying && $currentSong.id === song.id}
                    <!-- Pausar -->
                    <div on:click={pauseSong} on:keypress={pauseSong}>
                        <Pause class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                    </div>
                {:else}
                    <!-- Reproducir -->
                    <div on:click={playSong} on:keypress={playSong}>
                        <Play class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                    </div>
                {/if}

            </div>
        </div>
    </div>
</div>
