import { writable } from "svelte/store";

const TemporalList = () => {
    const list = [];
    const { subscribe, set, update } = writable(list);

    const methods = {
        addSong: (song) => {
            console.log('*: TemporalListStore -> addSong()');
            list.push(song);
            let index = list.length - 1;
                
            set(list);

            return index;
        },
        addSongAtIndex: (song, index) => {
            console.log('*: TemporalListStore -> addSongAtIndex()');
            list.splice(index, 0, song);
            set(list);

            return index;
        },
        // removeSongBySong: (song) => {
        //     console.log('*: TemporalListStore -> removeSong()');
        //     const index = list.indexOf(song);
        //     list.splice(index, 1);
        //     set(list);
        // },
        removeSongByIndex: (index) => {
            console.log('*: TemporalListStore -> removeSong()');
            console.log({index});
            list.splice(index, 1);
            set(list);
        },
        clear: () => {
            console.log('*: TemporalListStore -> clear()');
            list.splice(0, list.length);
            set(list);
        },
        getSongByIndex: (index) => {
            console.log('*: TemporalListStore -> getSongByIndex()');
            return list[index];
        },
        getSongIndexById: (id) => {
            console.log('*: TemporalListStore -> getSongIndexById()');
            const index = list.findIndex((song) => song.id === id);
            return index;
        },
        // getSongBySong: (song) => {
        //     console.log('*: TemporalListStore -> getSongBySong()');
        //     return list.indexOf(song);
        // },
        getSongList: () => {
            console.log('*: TemporalListStore -> getSongList()');
            console.log(list);
            return list;
        },
        // getNextSong: (song) => {
        //     console.log('*: TemporalListStore -> getNextSong()');
        //     const index = list.indexOf(song);
        //     console.log(index, list[index + 1]);
        //     return list[index + 1];
        // },
        // getPrevSong: (song) => {
        //     console.log('*: TemporalListStore -> getPrevSong()');
        //     const index = list.indexOf(song);
        //     return list[index - 1];
        // },
        // getNextSongIndex: (song) => {
        //     console.log('*: TemporalListStore -> getNextSongIndex()');
        //     const index = list.indexOf(song);
        //     return index + 1;
        // },
        // getPrevSongIndex: (song) => {
        //     console.log('*: TemporalListStore -> getPrevSongIndex()');
        //     const index = list.indexOf(song);
        //     return index - 1;
        // },
        // getNextSongByIndex: (index) => {
        //     console.log('*: TemporalListStore -> getNextSongByIndex()');
        //     if (index + 1 >= list.length) {
        //         return list[0];
        //     }
        //     return list[index + 1];
        // },
        // getPrevSongByIndex: (index) => {
        //     console.log('*: TemporalListStore -> getPrevSongByIndex()');
        //     if (index - 1 < 0) {
        //         return list[list.length - 1];
        //     }
        //     return list[index - 1];
        // }
    };

    return {
        subscribe,
        ...methods
    };
};

export default TemporalList();

