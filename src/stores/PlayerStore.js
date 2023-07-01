import { writable } from "svelte/store";
import { Howl, Howler } from "howler";

const isPlaying = writable(false);
const isStopped = writable(true);
const isMuted = writable(false);
const isLooping = writable(false);
const isShuffling = writable(false);
const currentSong = writable({id: -1, songId: '-1'});

const player = () => {
    console.log('*: playerStore -> store()');

    const playlist = [''];
    const configHowl = {
        src: playlist,
        html5: true,
        onplay: () => {
            console.log("Playing");
        },
        onload: () => {
            console.log("Loaded");
        }
    };
    const playerHowl = new Howl(configHowl);

    const { subscribe, set, update } = writable(playerHowl);

    const methods = {
        setSong: (song, songObj = {}) => {
            console.log('*: playerStore -> setSong()');
            playerHowl.stop();
            playerHowl.unload();
            playlist[0] = song;
            playerHowl.load();
        },
        setSongAndPlay: (song, songObj = {}) => {
            console.log('*: playerStore -> setSongAndPlay()');
            console.log(song);
            methods.stop();
            playerHowl.unload();
            playlist[0] = song;
            playerHowl.load();
            methods.play();

            currentSong.set(songObj);

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