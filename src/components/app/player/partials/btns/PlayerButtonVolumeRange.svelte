<script lang="ts">
    import PlayerStore, { userSettingVolume } from '$stores/PlayerStore';
	import { Volume2 } from 'lucide-svelte';
	import { get } from 'svelte/store';

    export let disableAll: boolean = false;
    export let value: number = get(userSettingVolume) * 100;

    let hidden = true;

    /**
     * Volume range input
     * 
     * @param event
     */
    function onInput(event: any) {
        let _volume = 0;
        if (event.target.value < 0) {
            event.target.value = 0;
            _volume = 0;
        }
        if (event.target.value > 100) {
            event.target.value = 100;
            _volume = 100;
        }
        _volume = event.target.value / 100;
        PlayerStore.volume(_volume)
    }

    /**
     * Volume range input for mouse wheel
     * 
     * @param MouseEvent event
     */
    function onWheelInput(event: any){
        let _volume = get(userSettingVolume);
        
        if (event.deltaY < 0) {
            _volume += 0.01;
        }
        if (event.deltaY > 0) {
            _volume -= 0.01;
        }
        if (_volume < 0) {
            _volume = 0;
        }
        if (_volume > 1) {
            _volume = 1;
        }

        _volume = Math.round(_volume * 100) / 100;
        userSettingVolume.set(_volume);
        event.target.value = _volume * 100;
        PlayerStore.volume(_volume)
    }

    function showVolumeRange(){
        hidden = false;
    }

    function hideVolumeRange(){
        hidden = true;
    }

    userSettingVolume.subscribe((volume) => {
        value = volume * 100;
    })
</script>

<style>

    /*********** Baseline, reset styles ***********/
    input[type=range] {
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* Chromium */
        width: 8px;
        height: theme('height.40');
        padding: 0 5px;
        background: #ffffff;
        cursor: pointer;
    }

    /* Removes default focus */
    input[type="range"]::selection {
        outline: none;
        background-color: #000000;
    }

    /* Removes default focus */
    input[type="range"]:focus {
        outline: none;
    }

    /******** Chrome, Safari, Opera and Edge Chromium styles ********/
    /* slider track */
    input[type="range"]::-webkit-slider-runnable-track {
        background-color: #ffffff;
        border-radius: 0.5rem;
        height: 0.5rem;
    }

    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        margin-top: -4px; /* Centers thumb on the track */
        background-color: #000000;
        border-radius: 0.5rem;
        height: 1rem;
        width: 1rem;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
        outline: none;
        outline-offset: 0.125rem;
    }

    /*********** Firefox styles ***********/
    /* slider track */
    input[type="range"]::-moz-range-track {
        background-color: #ffffff;
        border-radius: 0.5rem;
        height: 0.5rem;
    }

    /* slider thumb */
    input[type="range"]::-moz-range-thumb {
        background-color: #000000;
        border: none; /*Removes extra border that FF applies*/
        border-radius: 0.5rem;
        height: 1rem;
        width: 1rem;
    }

    input[type="range"]:focus::-moz-range-thumb{
        outline: 3px solid #000000;
        outline-offset: 0.125rem;
    }
</style>


<button class="player-button-base relative cursor-ns-resize" on:mouseenter|stopPropagation={showVolumeRange} on:mouseleave|stopPropagation={hideVolumeRange}>
    <div>
        <Volume2 class="icon-base"/>
    </div>
    <div class:hidden class="main-color-solid py-2 px-1 absolute top-2/4 left-2/4 -translate-y-2/4  -translate-x-2/4 rounded">
        <input 
            title="Can use mouse wheel to change volume"
            disabled={disableAll}
            orient="vertical"
            type="range"
            min="0"
            max="100"
            value={value}
            name="volume-range"
            step="1"
            on:input={onInput}
            on:wheel|passive={onWheelInput}
            class="player-button-base w-12 text-sm text-center font-medium mr-2 px-2.5 pb-0 pt-0.5 rounded-full">
    </div>
</button>

