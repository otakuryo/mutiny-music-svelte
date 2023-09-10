<script lang="ts">
	import type { SubsonicAPI, Child } from "$models/servers/subsonic";
    import { currentSong } from "$stores/CurrentPlaySong";
    import { MainServerSubsonicAPI, getDurationHuman } from "$lib/ts/Helpers.js";
	import ImgCover from "$components/global/ImgCover.svelte";
	import FavoriteIcon from "$components/global/Song/partials/FavoriteIcon.svelte";
	import InformationIcon from "$components/global/Song/partials/InformationIcon.svelte";
	import FolderIcon from "$components/global/Song/partials/FolderIcon.svelte";
	import AlbumIcon from "$components/global/Song/partials/AlbumIcon.svelte";
	import ArtistIcon from "$components/global/Song/partials/ArtistIcon.svelte";
	import LineMarqueSimple from "./LineMarqueSimple.svelte";
	import FavoriteSongForPlaylistIcon from "$components/global/Song/partials/FavoriteSongForPlaylistIcon.svelte";
    
    export let songId = "-1";

    // Si hay un error al cargar la imagen, se intenta cargar la imagen del padre
    // Si hay un error al cargar la imagen del padre, se carga una imagen por defecto
    let countHandleError = 0;
    let imageUrl = "https://placehold.it/310x310";
    let imageUrlParent = "https://placehold.it/310x310";
    let fallback = "https://placehold.it/310x310";

    /**
     * Canción actual
     */
    let song: Child|undefined;

    /**
     * API de Subsonic
     */
    let api: SubsonicAPI = MainServerSubsonicAPI();

    /**
     * Obtiene la información de la canción actual
     */
    currentSong.subscribe((currentSong) => {
        if (currentSong && currentSong.songId !== "-1") {
            songId = currentSong.id;
            song = currentSong as Child;
        }
    });

    /**
     * Obtiene la imagen de la canción actual
     */
    $: if (songId && songId !== "-1") {
        countHandleError = 0;
        imageUrl = api.getCoverArtWoFetchSync({id: songId});
        updateMediaMetadata();
        if (song !== undefined) {
            imageUrlParent = api.getCoverArtWoFetchSync({id: song.parent!});
        }
    }

    function updateMediaMetadata() {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song?.title ?? "--",
                artist: song?.artist ?? "--",
                album: song?.album ?? "--",
                artwork: [
                    {
                        src: imageUrl,
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            });
        };          
    }

</script>

<style>
    .custom-w-full {
        width: calc(100% - theme('width.44'));
    }
</style>

<div class="divider-y w-full py-2">
    <div class="flex flex-row max-w-full min-h-[10rem]">

        {#if song }
            
            <ImgCover songId={song.coverArt} api={api} size="40" title={song.title} />

            <div class="flex flex-col custom-w-full justify-center">

                <LineMarqueSimple title={song.title} customClass="text-xl text-left font-semibold" />
                <LineMarqueSimple title={song.artist} customClass="text opacity-80" />
                <LineMarqueSimple title={song.album} customClass="text opacity-80" />

                <div class="text text-bg-player-light-text dark:text-cover-dark-text opacity-80">{getDurationHuman(song.duration)}</div>
            </div>

        {:else}
            <ImgCover songId={songId} api={api} size="40" title="Sin imagen" />
            <div class="flex flex-col justify-center">
                <div class="text text-bg-player-light-text dark:text-cover-dark-text">--</div>
                <div class="text text-bg-player-light-text dark:text-cover-dark-text">--</div>
                <div class="text text-bg-player-light-text dark:text-cover-dark-text">--</div>
                <div class="text text-bg-player-light-text dark:text-cover-dark-text">00:00</div>
            </div>
        {/if}

        
    </div>
    <div class="flex gap-1 w-full mt-2 min-h-[1.5rem]">
        {#if song && song.id !== "-1"}
            <FavoriteIcon bind:song={song} api={api} />
            <InformationIcon bind:song={song} />
            <FolderIcon bind:song={song} />
            <AlbumIcon bind:song={song} />
            <ArtistIcon bind:song={song} />
            <FavoriteSongForPlaylistIcon bind:song={song} api={api} />
        {/if}
    </div>
</div>