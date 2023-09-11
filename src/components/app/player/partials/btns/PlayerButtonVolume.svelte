<script lang="ts">
    import PlayerStore, { userSettingVolume } from '$stores/PlayerStore';
	import { get } from 'svelte/store';

    export let disableAll: boolean = false;
    export let value: number = get(userSettingVolume) * 100;

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

    // function onWheelInput(event: any){
    //     let _volume = get(userSettingVolume);
    //     if (event.deltaY < 0) {
    //         _volume += 0.01;
    //     }
    //     if (event.deltaY > 0) {
    //         _volume -= 0.01;
    //     }
    //     if (_volume < 0) {
    //         _volume = 0;
    //     }
    //     if (_volume > 1) {
    //         _volume = 1;
    //     }
    //     console.log(_volume, _volume * 100);
    //     userSettingVolume.set(_volume);
    //     event.target.value = _volume * 100;
    //     PlayerStore.volume(_volume)
    // }
</script>

<style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    input[type=number]:focus {
        outline: none;
    }
</style>

<input 
    title="Can use mouse wheel to change volume and keyboard arrow up/down to change volume"
    disabled={disableAll}
    type="number"
    min="0"
    max="100"
    value={value}
    name="volume"
    step="1"
    on:input={onInput}
    class="player-button-base w-12 text-black dark:text-white bg-transparent text-sm text-center font-medium mr-2 px-2.5 pb-0 pt-0.5 rounded-full focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white">
