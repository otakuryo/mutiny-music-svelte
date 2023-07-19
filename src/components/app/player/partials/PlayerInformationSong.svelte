<script lang="ts">
	import { SubsonicAPI, type Child } from "$models/servers/subsonic";
	import { ServerConfigPersistent } from "$stores/ServerConfigStore";
    import { currentSong } from "$stores/CurrentPlaySong";
    import { getDurationHuman } from "$lib/js/Helpers.js";
    
    export let songId = "-1";

    // Si hay un error al cargar la imagen, se intenta cargar la imagen del padre
    // Si hay un error al cargar la imagen del padre, se carga una imagen por defecto
    let countHandleError = 0;
    let imageUrl = "https://placehold.it/210x310";
    let imageUrlParent = "https://placehold.it/210x310";
    let fallback = "https://placehold.it/210x310";

    const handleError = (ev: { target: { src: string; } } | any) => {
        countHandleError++;
        if (countHandleError > 1) {
            ev.target.src = fallback;
            return;
        }
        ev.target.src = imageUrlParent;
        return;
    };

    /**
     * Canción actual
     */
    let song: Child|undefined;

    /**
     * API de Subsonic
     */
    let api: SubsonicAPI = initSubsonicApi();

    /**
     * Inicializa la API de Subsonic
     * 
     * @returns {SubsonicAPI}
     */
    function initSubsonicApi(): SubsonicAPI {

        // Obtenemos los datos del servidor desde la memoria persistente
        let server = ServerConfigPersistent.get();
        console.log(server);

        const api = new SubsonicAPI({
            url: server.serverUrl,
            type: server.serverType, // or "generic" or "navidrome"
        });

        api.loginSync({
            username: server.username,
            password: server.password,
            serverName: server.serverName,
            version: server.serverVersion,
        });

        return api;
    }

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

<div class="divider-y w-full py-3">
    <div class="flex flex-row">
        <img loading="lazy" src={imageUrl} on:error={handleError} data-amplitude-song-info="cover_art_url" class="w-24 h-24 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover" alt={song?.title}/>
        <div class="flex flex-col">
            <div class="text-sm font-semibold text-bg-player-light-text dark:text-cover-dark-text">{song?.title ?? '--'}</div>
            <div class="text-xs text-bg-player-light-text dark:text-cover-dark-text">{song?.artist ?? '--'}</div>
            <div class="text-xs text-bg-player-light-text dark:text-cover-dark-text">{song?.album ?? '--'}</div>
            <div class="text-xs text-bg-player-light-text dark:text-cover-dark-text">{getDurationHuman(song?.duration)}</div>
        </div>
    </div>
</div>