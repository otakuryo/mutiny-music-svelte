import { writable } from "svelte/store";

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
            console.log('*: playlistStore -> removeSong()');
            const index = list.indexOf(song);
            list.splice(index, 1);
            set(list);
        },
        removeSongByIndex: (index) => {
            console.log('*: playlistStore -> removeSong()');
            list.splice(index, 1);
            set(list);
        },
        getSongByIndex: (index) => {
            console.log('*: playlistStore -> getSongByIndex()');
            return list[index];
        },
        // getSongBySong: (song) => {
        //     console.log('*: playlistStore -> getSongBySong()');
        //     return list.indexOf(song);
        // },
        getSongList: () => {
            console.log('*: playlistStore -> getSongList()');
            console.log(list);
            return list;
        },
        // getNextSong: (song) => {
        //     console.log('*: playlistStore -> getNextSong()');
        //     const index = list.indexOf(song);
        //     console.log(index, list[index + 1]);
        //     return list[index + 1];
        // },
        // getPrevSong: (song) => {
        //     console.log('*: playlistStore -> getPrevSong()');
        //     const index = list.indexOf(song);
        //     return list[index - 1];
        // },
        // getNextSongIndex: (song) => {
        //     console.log('*: playlistStore -> getNextSongIndex()');
        //     const index = list.indexOf(song);
        //     return index + 1;
        // },
        // getPrevSongIndex: (song) => {
        //     console.log('*: playlistStore -> getPrevSongIndex()');
        //     const index = list.indexOf(song);
        //     return index - 1;
        // },
        getNextSongByIndex: (index) => {
            console.log('*: playlistStore -> getNextSongByIndex()');
            if (index + 1 >= list.length) {
                return list[0];
            }
            return list[index + 1];
        },
        getPrevSongByIndex: (index) => {
            console.log('*: playlistStore -> getPrevSongByIndex()');
            if (index - 1 < 0) {
                return list[list.length - 1];
            }
            return list[index - 1];
        }
    };

    return {
        subscribe,
        ...methods
    };
};

export default playlist();

