<script lang="ts">
	import type { Child } from "$models/servers/subsonic";
	import { currentSong } from "$stores/CurrentPlaySong";
	import PlayerStore, { isPlaying } from "$stores/PlayerStore";
	import PlaylistStore from "$stores/PlaylistStore";
	import { ListEnd, Pause, Play, Trash2, Minus } from "lucide-svelte";

    export let song: Child;
    export let index: number = -1;
    let durationHuman = '00:00';


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

    function getDurationHuman() {

        // Si no hay duración, se devuelve 00:00
        if (song.duration === undefined) return "00:00";

        // Si hay duración, se devuelve en formato mm:ss
        let minutes = Math.floor(song.duration / 60);
        let seconds = song.duration - minutes * 60;

        let mmStr = minutes.toString().padStart(2, "0");
        let ssStr = seconds.toString().padStart(2, "0");
        return `${mmStr}:${ssStr}`;
    }

    $: if (song) {
        durationHuman = getDurationHuman();
    }
</script>
<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"
    data-id={song.id}
    data-is-dir={song.isDir}
    data-parent={song.parent}
    data-title={song.title}>
    <div class="cursor-pointer">
        <div class="py-2 flex items-center z-50">

            <!-- <BtnChecked bind:checked={song.checked} toggleChecked={toggleChecked} /> -->
            
            <!-- <ImgCover api={api} title={song.title} songId={song.id} /> -->

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

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{song.title}</span>
                <span data-amplitude-song-info="time" class="font-sans text-sm font-medium text-gray-500 dark:text-gray-400">{durationHuman}</span>
            </div>

            <div class="ml-auto flex flex-row">

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
