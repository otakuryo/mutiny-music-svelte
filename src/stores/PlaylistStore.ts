import { get, writable } from "svelte/store";
import { currentIndex } from "$stores/CurrentPlaySong";
import type { Child } from "$models/servers/subsonic";
import { isLooping, isSingleLooping, isShuffling } from "$stores/PlayerStore";

const playlist = () => {
    let list: Array<Child> = [];
    const { subscribe, set, update } = writable(list);

    const methods = {
        addSong: (song: Child) => {
            console.log('*: playlistStore -> addSong()');
            
            list.push(song);
            let index = list.length - 1;
                
            set(list);

            return index;
        },
        addSongs: (songs: Array<Child>) => {
            console.log('*: playlistStore -> addSongs()');

            list = list.concat(songs);
            set(list);

            return list.length - 1;
        },
        setList: (songs: Array<Child>) => {
            console.log('*: playlistStore -> setList()');
            list = list.concat(songs);
            set(list);
            return list.length - 1;
        },
        addSongAtIndex: (song: Child, index: number) => {
            console.log('*: playlistStore -> addSongAtIndex()');
            
            list.splice(index, 0, song);
            set(list);

            return index;
        },
        removeSongBySong: (song: Child) => {
            console.log('*: playlistStore -> removeSongBySong()');
            const index = list.indexOf(song);

            // Compare current index with the index of the song to be removed
            let ci = get(currentIndex);
            if (ci > index) {
                currentIndex.set(ci - 1);
            }

            list.splice(index, 1);
            set(list);
            return true;
        },
        removeSongByIndex: (index: number) => {
            console.log('*: playlistStore -> removeSongByIndex()');

            // Compare current index with the index of the song to be removed
            let ci = get(currentIndex);
            // If the current index is greater than the index of the song to be removed, decrement the current index
            if (ci > index) {
                currentIndex.set(ci - 1);
            }

            list.splice(index, 1);
            set(list);
            return true;
        },
        getSongByIndex: (index: number) => {
            console.log('*: playlistStore -> getSongByIndex()');
            return list[index];
        },
        getSongList: () => {
            console.log('*: playlistStore -> getSongList()');
            console.log(list);
            return list;
        },
        getNextSongByIndex: (index: number) => {
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

            let _isLooping = get(isLooping);
            let _isSingleLooping = get(isSingleLooping);
            let _isShuffling = get(isShuffling);

            // If shuffling is enabled, return a random song
            // If looping is enabled, return the first song
            // If looping is disabled, return undefined
            // If looping is enabled and single looping is enabled, return the current song
            if (_isShuffling) {
                let randomIndex = Math.floor(Math.random() * list.length);
                return {
                    index: randomIndex,
                    song: list[randomIndex]
                }
            } else {

                if (_isLooping) {
                    if (_isSingleLooping) {
                        return {
                            index: index,
                            song: list[index]
                        }
                    }else {
                        if (index + 1 >= list.length) {
                            return {
                                index: 0,
                                song: list[0]
                            }
                        }
                    }

                }else{
                    if (index + 1 >= list.length) {
                        return {
                            index: -999,
                            song: undefined
                        }
                    }
                }

                return {
                    index: index + 1,
                    song: list[index + 1]
                }
            }
        },
        getPrevSongByIndex: (index: number) => {
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
        },
        selectAllSongs: () => {
            console.log('*: playlistStore -> selectAllSongs()');
            list.forEach((song) => {
                song.checked = true;
            });
            set(list);
            return list;
        },
        unselectAllSongs: () => {
            console.log('*: playlistStore -> unselectAllSongs()!!', list);
            
            list.forEach((song) => {
                song.checked = false;
            });
            set(list);
            console.log("update list complete", list);

            return list;
        },
        removeAllSongsChecked: () => {
            console.log('*: playlistStore -> removeCheckedSongs()');

            // Compare current index with the index of the song to be removed
            let ci = get(currentIndex);

            let newList = list.filter((song, index) => {

                // If the current index is greater than the index of the song to be removed, decrement the current index
                if (ci > index) {
                    currentIndex.set(ci - 1);
                }

                return !song.checked;
            });
            list = newList;
            set(list);
            return newList;
        }
    };

    return {
        subscribe,
        set,
        update,
        ...methods
    };
};

export default playlist();

