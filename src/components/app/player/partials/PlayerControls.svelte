<script>
	import { Pause, Play, SkipBack, SkipForward, Timer } from "lucide-svelte";
    import PlayerStore, { isPlaying } from "$stores/PlayerStore";
    import PlaylistStore from "$stores/PlaylistStore";
    import { currentSong } from "$stores/CurrentPlaySong";
    import { get } from "svelte/store";
    import { getDurationHuman } from "$lib/js/Helpers.js";

    let disablePrev = false;
    let disableNext = false;
    let disablePlay = false;

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
        }
    }

    let currentPosition = 0;
    let duration = 0;
    let percentage = '0';
    let durationHuman = '00:00';
    let durationHumanTotal = '00:00';
    /**
	 * @type { NodeJS.Timeout | undefined }
	 */
    let intervalDuration;

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

    function getPercentageDuration() {
        if (currentPosition === 0) return '0';        
        return (currentPosition / duration * 100).toFixed(2);
    }

    currentSong.subscribe((item) => {
        if (item.id !== '-1'){
            disablePrev = false;
            disableNext = false;
            disablePlay = false;
        } else {
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
    };
        
</script>

<style>
    .current-duration-container {
        @apply mx-2 mt-2 mb-0 text-center;
    }

    button:disabled {
        @apply opacity-50 cursor-not-allowed;
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
        animate: 0.2s;
        box-shadow: 0px 0px 5px #000000;
        background: #FFFFFF;
        border-radius: 32px;
        border: 0px solid #000000;
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
        background: #FFFFFF;
    }
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 16px;
        cursor: pointer;
        animate: 0.2s;
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

</style>

<div class="w-full my-3">

    <div class="flex flex-row justify-center">
        <button class="player-button-base" on:click={skipBack} on:keypress={skipBack} disabled={disablePrev}>
            <SkipBack class="icon-base"/>
        </button>

        <!-- Pausar -->
        <button class="player-button-base" on:click={togglePlaying} on:keypress={togglePlaying} disabled={disablePlay}>
            {#if $isPlaying}
                <Pause class="icon-base"/>
            {:else}
                <Play class="icon-base"/>
            {/if}
        </button> 

        <button class="player-button-base" on:click={skipForward} on:keypress={skipForward} disabled={disableNext}>
            <SkipForward class="icon-base"/>
        </button>

    </div>

    <div class="w-100% mx-2 my-0 current-duration-container">
        {durationHuman} - {durationHumanTotal} - {percentage}%
    </div>
    <div class="w-100% mx-2 progress-container">
        <input 
            type="range" 
            min="0" 
            max={duration} 
            bind:value={currentPosition} 
            on:mousedown={disableProgressSeek} 
            on:click={setSeekAndEnableProgressSeek} />
    </div>
</div>