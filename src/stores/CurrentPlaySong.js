import { writable } from "svelte/store";

const currentSong = writable({id: '-1', songId: '-1'});
const currentIndex = writable(-1);

export { currentSong, currentIndex };