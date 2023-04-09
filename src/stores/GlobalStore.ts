import { writable } from 'svelte/store';

export enum GlobalPage {
    home = 'home',
    directory = 'directory',
    album = 'album',
    artist = 'artist',
    settings = 'settings',
}

export const currentPage: string = writable('home');