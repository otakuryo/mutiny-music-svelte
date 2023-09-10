import {writable, get} from "svelte/store";

export const ShowImageCoverStore = writable(false);
export const ImageCoverStore = writable('/placeholder/album_placeholder_310x310.png');
export const TitleStore = writable('Title');
