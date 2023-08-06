import {writable, get} from "svelte/store";

export const ShowImageCoverStore = writable(false);
export const ImageCoverStore = writable('https://placehold.it/310x310');
export const TitleStore = writable('Title');
