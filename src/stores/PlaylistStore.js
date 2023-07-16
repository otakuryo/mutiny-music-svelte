import { writable } from "svelte/store";
import { currentIndex } from "$stores/CurrentPlaySong";
import { get } from "svelte/store";

const playlist = () => {
    const list = [];
    const { subscribe, set, update } = writable(list);

    const methods = {
        addSong: (song) => {
            console.log('*: playlistStore -> addSong()');
            list.push(song);
            let index = list.length - 1;
                
            set(list);

            return index;
        },
        addSongAtIndex: (song, index) => {
            console.log('*: playlistStore -> addSongAtIndex()');
            list.splice(index, 0, song);
            set(list);

            return index;
        },
        removeSongBySong: (song) => {
            console.log('*: playlistStore -> removeSongBySong()');
            const index = list.indexOf(song);

            // Compare current index with the index of the song to be removed
            let ci = get(currentIndex);
            if (ci > index) {
                currentIndex.set(ci - 1);
            }

            list.splice(index, 1);
            set(list);
        },
        removeSongByIndex: (index) => {
            console.log('*: playlistStore -> removeSongByIndex()');

            // Compare current index with the index of the song to be removed
            let ci = get(currentIndex);
            if (ci > index) {
                currentIndex.set(ci - 1);
            }

            list.splice(index, 1);
            set(list);
        },
        getSongByIndex: (index) => {
            console.log('*: playlistStore -> getSongByIndex()');
            return list[index];
        },
        getSongList: () => {
            console.log('*: playlistStore -> getSongList()');
            console.log(list);
            return list;
        },
        getNextSongByIndex: (index) => {
            console.log('*: playlistStore -> getNextSongByIndex()');
            if (index + 1 >= list.length) {
                return {
                    index: 0,
                    song: list[0]
                }
            }
            return {
                index: index + 1,
                song: list[index + 1]
            }
        },
        getNextSong: () => {
            console.log('*: playlistStore -> getNextSong()');
            let index = get(currentIndex);
            if (index + 1 >= list.length) {
                return {
                    index: 0,
                    song: list[0]
                }
            }
            return {
                index: index + 1,
                song: list[index + 1]
            }
        },
        getPrevSongByIndex: (index) => {
            console.log('*: playlistStore -> getPrevSongByIndex()');
            if (index - 1 < 0) {
                return {
                    index: list.length - 1,
                    song: list[list.length - 1]
                }
            }
            return {
                index: index - 1,
                song: list[index - 1]
            }
        },
        getPrevSong: () => {
            console.log('*: playlistStore -> getPrevSong()');
            let index = get(currentIndex);
            if (index - 1 < 0) {
                return {
                    index: list.length - 1,
                    song: list[list.length - 1]
                }
            }
            return {
                index: index - 1,
                song: list[index - 1]
            }
        }
    };

    return {
        subscribe,
        ...methods
    };
};

export default playlist();

