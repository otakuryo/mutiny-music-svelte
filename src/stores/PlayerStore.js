import {writable, get} from "svelte/store";
import {Howl} from "howler";
import PlaylistStore from "./PlaylistStore";
import {currentIndex, currentSong} from "./CurrentPlaySong";

const isPlaying = writable(false);
const isStopped = writable(true);
const isMuted = writable(false);
const isLooping = writable(true);
const isSingleLooping = writable(false);
const isShuffling = writable(false);
const bufferProgress = writable(0);
const userSettingSeek = writable(15);
const userSettingVolume = writable(1.0);
const scrobblePercent = writable(70);

const player = () => {

    const onEndedCallback = () => {
        console.log("Ended");
        let {index ,song} = PlaylistStore.getNextSong();
        if (song) {
            methods.setSongAndPlay(song.downloadSongUrl, song, index);
        }
    };

    // https://stackoverflow.com/questions/37769535/is-there-a-way-to-indicate-audio-download-progress-buffer-when-using-howler-js
    const handleLoad = () => {
        // @ts-ignore
        const node = playerHowl._sounds[0]._node;
        // const node:HTMLAudioElement = (audio as any)._sounds[0]._node; // For Typescript
        node.addEventListener('progress', () => {
            const duration = playerHowl.duration(0);
            // console.log("buffer 1", node);

            // https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges#Creating_our_own_Buffering_Feedback
            if (duration > 0) {
                for (let i = 0; i < node.buffered.length; i++) {
                        // console.log("buffer 2", node.buffered);
                        if (node.buffered.start(node.buffered.length - 1 - i) < node.currentTime) {
                        const bufferProgressNumber = (node.buffered.end(node.buffered.length - 1 - i) / duration) * 100;
                        // console.log("buffer 3", bufferProgressNumber);
                        bufferProgress.set(bufferProgressNumber);
                        // do what you will with it. I.E - store.set({ bufferProgress });
                        break;
                    }
                }
            }
        });
    };

    const playlist = [''];
    const configHowl = {
        src: playlist,
        html5: true,
        preload: true,
        onplay: () => {
            console.log("Playing");
        },
        onload: handleLoad,
        onpause: () => {
            console.log("Paused");
        },
        onstop: () => {
            console.log("Stopped");
        },
        onend: onEndedCallback,
    };
    let  playerHowl = false;

    const {subscribe, set, update} = writable(playerHowl);

    const methods = {
        setSong: (song, songObj = {}, index = 0) => {
            console.log('*: playerStore -> setSong()');
            console.log(song);
            if (playerHowl) {
                playerHowl.stop();
                playerHowl.unload();
            }
            playlist[0] = song;
            playerHowl = new Howl(configHowl);
            playerHowl.load();

            currentSong.set(songObj);
            currentIndex.set(index);
            playerHowl.volume(get(userSettingVolume));
        },
        setSongAndPlay: (song, songObj = {}, index = 0) => {
            console.log('*: playerStore -> setSongAndPlay()');

            methods.setSong(song, songObj, index);

            methods.play();
        },
        play: () => {
            console.log('*: playerStore -> play()');
            playerHowl.play();
            isPlaying.set(true);
            isStopped.set(false);
            navigator.mediaSession.playbackState = "playing";
        },
        pause: () => {
            console.log('*: playerStore -> pause()');
            playerHowl.pause();
            isPlaying.set(false);
            isStopped.set(false);

            navigator.mediaSession.playbackState = "paused";
        },
        toggle: () => {
            console.log('*: playerStore -> toggle()');
            if (get(isPlaying)) {
                methods.pause();
                isPlaying.set(false);
            } else {
                methods.play();
                isPlaying.set(true);
                isStopped.set(false);
            }
        },
        stop: () => {
            console.log('*: playerStore -> stop()');
            playerHowl.stop();
            isStopped.set(true);
            isPlaying.set(false);
        },
        seek: (time) => {
            playerHowl.seek(time);
        },
        volume: (volume) => {
            if (playerHowl) {
                playerHowl.volume(volume);
            }
            userSettingVolume.set(volume);
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
        },
        getRate: () => {
            return playerHowl.rate();
        },
        currentTime: () => {
            return playerHowl.seek() || 0;
        },
        duration: () => {
            return playerHowl.duration();
        }
    };

    return {
        subscribe,
        ... methods
    };
}

export default player();
export {
    isPlaying,
    isStopped,
    isMuted,
    isLooping,
    isSingleLooping,
    isShuffling,
    currentSong,
    bufferProgress,
    userSettingSeek,
    userSettingVolume,
    scrobblePercent,
};
