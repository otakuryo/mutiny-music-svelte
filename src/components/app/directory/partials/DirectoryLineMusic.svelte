<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { Child } from "$models/servers/subsonic/types";
	import { Play, Pause, ListEnd, PlusCircle, CheckCircle, Star } from "lucide-svelte";
    import { isPlaying } from "$stores/PlayerStore";
	import PlayerStore from "$stores/PlayerStore";
	import PlaylistStore from '$stores/PlaylistStore';
    import {currentSong} from "$stores/CurrentPlaySong";
	import TemporalListStore from "$stores/TemporalListStore";
    import BtnChecked from "$components/app/directory/partials/BtnChecked.svelte";
    import ImgCover from "$components/app/directory/partials/ImgCover.svelte";
    import { getDurationHuman } from "$lib/js/Helpers.js";

    export let song: Child;
    export let api: SubsonicAPI;
    let songPlaylistIndex = -1;
    let durationHuman = '00:00';

    // let imageUrl = "https://placehold.it/210x310";
    // let fallback = imageUrl;

    // function getCoverArt() {
    //     let image = api.getCoverArtWoFetchSync({id: song.id});
    //     imageUrl = image
    // }

    // getCoverArt()
    // const handleError = (ev: { target: { src: string; } } | any) => ev.target.src = fallback;

    function buildSongUrl() {
        return api.downloadWoFetchSync({id: song.id});
    }

    function addSongToPlaylist() {
        song.downloadSongUrl = buildSongUrl();
        song.songId = song.id;
        let index = PlaylistStore.addSong(song);
        return index;
    }

    function callbackTogglePlaying() {
        PlayerStore.pause();
    }

    function addSongToPlaylistAndPlay() {
        let index = addSongToPlaylist();
        PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
    }

    function addSongToTemporalList() {
        song.downloadSongUrl = buildSongUrl();
        song.songId = song.id;
        let index = TemporalListStore.addSong(song);
        return index;
    }

    function toggleChecked() {
        song.checked = !song.checked;
        if (song.checked) {
            songPlaylistIndex = addSongToTemporalList();
        } else {
            if (songPlaylistIndex === -1) {
                songPlaylistIndex = TemporalListStore.getSongIndexById(song.id);
                if (songPlaylistIndex === -1) return;
            };
            TemporalListStore.removeSongByIndex(songPlaylistIndex);
        }
    }

    /**
     * Toggle star
     * 
     * If star is true, then the song is starred, so we want to remove it from starred songs
     */
    async function toggleStar() {
        if (song.starred === undefined) {
            await api.star({id: song.id});
            song.starred = new Date();
        } else {
            await api.unstar({id: song.id});
            song.starred = undefined;
        }
    }

    durationHuman = getDurationHuman(song.duration);
</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"
    data-id={song.id}
    data-is-dir={song.isDir}
    data-parent={song.parent}
    data-title={song.title}>
    <div class="cursor-pointer">
        <div class="py-2 flex items-center z-50">

            <BtnChecked bind:checked={song.checked} toggleChecked={toggleChecked} />
            
            <ImgCover api={api} title={song.title} songId={song.id} />

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{song.title}</span>
                <span data-amplitude-song-info="time" class="font-sans text-sm font-medium text-gray-500 dark:text-gray-400">{durationHuman}</span>
            </div>

            <div class="ml-auto flex flex-row">

                <!-- Añadir a favoritos -->
                <div on:click={toggleStar} on:keydown={toggleStar}>
                    {#if song.starred !== undefined }
                        <Star class="stroke-current text-slate-900 dark:text-yellow-200 h-6 w-12" fill="yellow"/>
                    {:else}
                        <Star class="stroke-current text-slate-900 dark:text-yellow-200 h-6 w-12" />
                    {/if}
                </div>

                <!-- Añadir a la playlist -->
                <div on:click={addSongToPlaylist} on:keypress={addSongToPlaylist}>
                    <ListEnd class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                </div>

                {#if $isPlaying && $currentSong.id === song.id}
                    <!-- Pausar -->
                    <div on:click={callbackTogglePlaying} on:keypress={callbackTogglePlaying}>
                        <Pause class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                    </div>
                {:else}
                    <!-- Reproducir -->
                    <div on:click={addSongToPlaylistAndPlay} on:keypress={addSongToPlaylistAndPlay}>
                        <Play class="stroke-current text-slate-900 dark:text-white h-6 w-12"/>
                    </div>
                {/if}

            </div>
        </div>
    </div>
</div>

