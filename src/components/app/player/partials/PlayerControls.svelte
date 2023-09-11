<script lang="ts">
	import { Pause, Play, SkipBack, SkipForward } from "lucide-svelte";
    import PlayerStore, { isPlaying, bufferProgress, scrobblePercent } from "$stores/PlayerStore";
    import PlaylistStore from "$stores/PlaylistStore";
    import { currentSong } from "$stores/CurrentPlaySong";
    import { get } from "svelte/store";
    import { MainServerSubsonicAPI, getDurationHuman } from "$lib/ts/Helpers.js";
	import PlayerButtonRepeat from "./btns/PlayerButtonRepeat.svelte";
	import PlayerButtonSuffle from "./btns/PlayerButtonSuffle.svelte";
	import PlayerButtonPrev from "./btns/PlayerButtonPrev.svelte";
	import PlayerButtonNext from "./btns/PlayerButtonNext.svelte";
	import PlayerButtonPlayPause from "./btns/PlayerButtonPlayPause.svelte";
	import PlayerButtonRewind from "./btns/PlayerButtonRewind.svelte";
	import PlayerButtonForward from "./btns/PlayerButtonForward.svelte";

    let disableAll = false;
    let disablePrev = false;
    let disableNext = false;
    let disablePlay = false;

    let isScrobbling = false;
    let scrobbleRegistered = false;

    function togglePlaying() {
        if (get(isPlaying)) {
            PlayerStore.pause();
        } else {
            PlayerStore.play();
        }
    }

    function skipBack() {
        console.log("skipBack");
        let {index, song} = PlaylistStore.getPrevSong();
        if (song) {
            PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
        }
    }

    function skipForward() {
        console.log("skipForward");
        let {index ,song} = PlaylistStore.getNextSong();
        if (song) {
            PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
        }else{
            PlayerStore.stop();
        }
    }

    let bufferSongPercent = '0';

    let currentPosition = 0;
    let duration = 0;
    let percentage = '0';
    let durationHuman = '00:00';
    let durationHumanTotal = '00:00';
    /**
	 * @type { NodeJS.Timeout | undefined }
	 */
    let intervalDuration: NodeJS.Timeout | undefined = undefined;

    function getCurrentPosition() {
        console.log("getCurrentPosition");
        if (intervalDuration) {
            clearInterval(intervalDuration);
        }
        intervalDuration = setInterval(() => {
            
            duration = PlayerStore.duration();

            // @ts-ignore
            currentPosition = Math.round(PlayerStore.currentTime());

        }, 1000);
    }

    isPlaying.subscribe((isPlaying) => {
        if (isPlaying) {
            getCurrentPosition();
        }
    });

    /**
     * Update current buffer percentage of the song
     */
    bufferProgress.subscribe((bufferProgress) => {
        bufferSongPercent = Math.round(bufferProgress).toString();
        console.log("bufferProgress", bufferProgress, bufferSongPercent);
    });

    function getPercentageDuration() {
        if (currentPosition === 0) return '0';        
        return (currentPosition / duration * 100).toFixed(2);
    }

    function setScrobble(){
        if (scrobbleRegistered) return;
        
        if (currentPosition === 0) return;

        if (isScrobbling) return;
        isScrobbling = true;

        console.log("setScrobble", duration);

        let song = get(currentSong);
        if (song.id === '-1') return;
        let _duration = duration ?? song.duration;
        let percentage = (currentPosition / _duration * 100);
        if (percentage < get(scrobblePercent)) {
            isScrobbling = false;
            return;
        };

        let scrobble = {
            id: song.id
        }
        
        MainServerSubsonicAPI().scrobble(scrobble).then((res) => {
            console.log("Scrobble", res);
        }).catch((err) => {
            console.error("Scrobble", err);
        }).finally(() => {
            isScrobbling = false;
            scrobbleRegistered = true;
        });

    }

    currentSong.subscribe((item) => {
        if (item.id !== '-1'){
            disableAll = false;
            disablePrev = false;
            disableNext = false;
            disablePlay = false;
        } else {
            disableAll = true;
            disablePrev = true;
            disableNext = true;
            disablePlay = true;
        }
    })

    function disableProgressSeek(){
        if (intervalDuration) {
            clearInterval(intervalDuration);
        }
    }

    function setSeekAndEnableProgressSeek(){
        PlayerStore.seek(currentPosition);
        getCurrentPosition();
    }

    /**
     * Crea los callbacks para los botones de los auriculares o el reproductor de música
     */
    function createMediaCallback() {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("play", togglePlaying);
            navigator.mediaSession.setActionHandler("pause", togglePlaying);
            navigator.mediaSession.setActionHandler("previoustrack", skipBack);
            navigator.mediaSession.setActionHandler("nexttrack", skipForward);
            navigator.mediaSession.setActionHandler("seekto", (details) => {
                console.log("seekto", details);
                PlayerStore.seek(details.seekTime);
            });
        }
    }

    createMediaCallback();
    
    $: durationHumanTotal = getDurationHuman(duration);
    $: durationHuman = getDurationHuman(currentPosition);
    $: if (currentPosition > 0) {
        percentage = getPercentageDuration()
        setScrobble();
    };

    $: if (currentPosition === 0) {
        isScrobbling = false;
        scrobbleRegistered = false;
    }

</script>

<style lang="scss">
    .current-duration-container {
        @apply mx-2 mt-2 mb-0 text-center;
    }

    /* Estilos para el input range - https://www.cssportal.com/style-input-range/ */
    .progress-container {
        height: 22px;
    }
    input[type=range] {
        height: 22px;
        -webkit-appearance: none;
        margin: 0;
        width: 100%;
        background: #ffffff00;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 16px;
        cursor: pointer;
        /* animation: 0.2s; */
        /* box-shadow: 0px 0px 2px #000000; */
        /* background: #FFFFFF; */
        border-radius: 32px;
        border: 0px solid #000000;

        @apply bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 4px #000000;
        border: 0px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: #000000;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: 0px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        /* background: #FFFFFF; */
        @apply bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600;
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 16px;
        cursor: pointer;
        /* animation: 0.2s; */
        box-shadow: 0px 0px 5px #000000;
        background: #FFFFFF;
        border-radius: 32px;
        border: 0px solid #000000;
    }
    input[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 4px #000000;
        border: 0px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: #000000;
        cursor: pointer;
    }
    input[type=range]::-ms-track {
        width: 100%;
        height: 16px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #FFFFFF;
        border: 0px solid #000000;
        border-radius: 64px;
        box-shadow: 0px 0px 5px #000000;
    }
    input[type=range]::-ms-fill-upper {
        background: #FFFFFF;
        border: 0px solid #000000;
        border-radius: 64px;
        box-shadow: 0px 0px 5px #000000;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 4px #000000;
        border: 0px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: #000000;
        cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #FFFFFF;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #FFFFFF;
    }

    /**
     * Buffer progress
     */
    @for $i from 0 through 110 {

        $current-position: $i;
        $percent-char: '%';

        input[type=range].pos-#{$current-position}:focus::-webkit-slider-runnable-track,
        input[type=range].pos-#{$current-position}::-webkit-slider-runnable-track {
            --tw-gradient-from-position: #{$current-position}#{$percent-char};
            --tw-gradient-via-position: #{$current-position}#{$percent-char};
            --tw-gradient-to-position: #{$current-position}#{$percent-char};
        }
    }

</style>

<div class="main-color w-full py-3">

    <div class="flex flex-row justify-center">

        <!-- Rewind button -->
        <PlayerButtonRewind bind:disableAll={disableAll}/>

        <!-- Repeat button -->
        <PlayerButtonRepeat bind:disableAll={disableAll}/>

        <!-- Prev track -->
        <PlayerButtonPrev skipBack={skipBack} bind:disablePrev={disablePrev}/>

        <!-- Pause/play -->
        <PlayerButtonPlayPause togglePlaying={togglePlaying} bind:disablePlay={disablePlay}/>

        <!-- Next track -->
        <PlayerButtonNext skipForward={skipForward} bind:disableNext={disableNext}/>

        <!-- Shuffle button -->
        <PlayerButtonSuffle bind:disableAll={disableAll}/>

        <!-- Forward button -->
        <PlayerButtonForward bind:disableAll={disableAll}/>

    </div>

    <div class="w-100% mx-2 my-0 current-duration-container">
        {durationHuman} - {durationHumanTotal} - {percentage}%
    </div>
    <div class="w-100% mx-2 progress-container">
        <input 
            class="pos-{bufferSongPercent}"
            type="range" 
            min="0" 
            max={duration} 
            bind:value={currentPosition} 
            on:mousedown={disableProgressSeek} 
            on:click={setSeekAndEnableProgressSeek} />
    </div>
</div>