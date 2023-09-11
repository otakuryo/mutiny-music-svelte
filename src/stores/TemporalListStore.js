import { writable } from "svelte/store";

const TemporalList = () => {
    let list = [];
    const { subscribe, set, update } = writable(list);

    const methods = {
        addSong: (song) => {
            console.log('*: TemporalListStore -> addSong()');
            list.push(song);
            let index = list.length - 1;
                
            set(list);

            return index;
        },
        setList: (newList) => {
            console.log('*: TemporalListStore -> setList()');
            list = list.concat(newList);
            set(list);

            return list.length - 1;
        },
        addSongAtIndex: (song, index) => {
            console.log('*: TemporalListStore -> addSongAtIndex()');
            list.splice(index, 0, song);
            set(list);

            return index;
        },
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
        getSongList: () => {
            console.log('*: TemporalListStore -> getSongList()');
            console.log(list);
            return list;
        },
    };

    return {
        subscribe,
        ...methods
    };
};

export default TemporalList();

