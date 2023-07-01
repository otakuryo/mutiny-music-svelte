import { writable, get } from "svelte/store";
import { Howl, Howler } from "howler";
import PlaylistStore from "./PlaylistStore";
import {currentIndex, currentSong} from "./CurrentPlaySong";

const isPlaying = writable(false);
const isStopped = writable(true);
const isMuted = writable(false);
const isLooping = writable(false);
const isShuffling = writable(false);

const player = () => {
    console.log('*: playerStore -> store()');

    const onEndedCallback = () => {
        console.log("Ended");
        let index = get(currentIndex)
        let nextSong = PlaylistStore.getNextSongByIndex(index);
        if (nextSong) {
            methods.setSongAndPlay(nextSong.downloadSongUrl, nextSong, index + 1);
        }
    };

    const playlist = [''];
    const configHowl = {
        src: playlist,
        html5: true,
        onplay: () => {
            console.log("Playing");
        },
        onload: () => {
            console.log("Loaded");
        },
        onend: onEndedCallback
    };
    const playerHowl = new Howl(configHowl);

    const { subscribe, set, update } = writable(playerHowl);

    const methods = {
        setSong: (song, songObj = {}, index = 0) => {
            console.log('*: playerStore -> setSong()');
            playerHowl.stop();
            playerHowl.unload();
            playlist[0] = song;
            playerHowl.load();

            currentSong.set(songObj);
            currentIndex.set(index);
        },
        setSongAndPlay: (song, songObj = {}, index = 0) => {
            console.log('*: playerStore -> setSongAndPlay()');
            console.log(song);
            methods.stop();
            playerHowl.unload();
            playlist[0] = song;
            playerHowl.load();
            
            currentSong.set(songObj);
            currentIndex.set(index);
            
            methods.play();
        },
        play: () => {
            console.log('*: playerStore -> play()');
            isPlaying.set(true);
            isStopped.set(false);
            playerHowl.play();
        },
        pause: () => {
            console.log('*: playerStore -> pause()');
            isPlaying.set(false);
            playerHowl.pause();
        },
        toggle: () => {
            console.log('*: playerStore -> toggle()');
            if (isPlaying) {
                methods.pause();
            } else {
                methods.play();
            }
        },
        stop: () => {
            isStopped.set(true);
            isPlaying.set(false);
            playerHowl.stop();
        },
        seek: (time) => {
            playerHowl.seek(time);
        },
        volume: (volume) => {
            playerHowl.volume(volume);
        },
        mute: () => {
            playerHowl.mute();
        },
        unmute: () => {
            playerHowl.unmute();
        },
        fade: (from, to, duration) => {
            playerHowl.fade(from, to, duration);
        },
        loop: (loop) => {
            playerHowl.loop(loop);
        },
        rate: (rate) => {
            playerHowl.rate(rate);
        }
    };

    return {
        subscribe,
        ...methods
    };
}

export default player();
export { isPlaying, isStopped, isMuted, isLooping, isShuffling, currentSong };