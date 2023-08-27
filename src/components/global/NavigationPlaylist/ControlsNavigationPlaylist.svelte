<script lang="ts">
    import type { Child, Playlist} from "$models/servers/subsonic/types";
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import TemporalListStore from "$stores/TemporalListStore";
	import PlaylistStore from "$stores/PlaylistStore";
	import PlayerMenuPlaylist from "./partials/PlayerMenuPlaylist.svelte";
	import PlayerStore from "$stores/PlayerStore";
	import { MainServerSubsonicAPI } from "$lib/ts/Helpers";

    export let api: SubsonicAPI = MainServerSubsonicAPI();
    export let list: Child[] = [];

    export let callbackCheckSonByIndex: () => void;
    export let callbackUncheckSonByIndex: () => void;

    function addAllSongToTemporalList() {
        let localIndexes: number[] = [];
        TemporalListStore.clear();
        list.forEach((song, index) => {
            if (song.isDir) {
                
            }else{
                song.downloadSongUrl = api.downloadWoFetchSync({id: song.id});
                song.songId = song.id;
                song.checked = true;
                TemporalListStore.addSong(song);
                localIndexes.push(index);
            }
        });

        callbackCheckSonByIndex();

    }

    function clearAllSongToTemporalList() {
        TemporalListStore.clear();
        let localIndexes: number[] = [];
        list.forEach((song, index) => {
            if (song.isDir) {
                
            }else{
                localIndexes.push(index);
            }
        });
        callbackUncheckSonByIndex();
    }

    function addAllSongToMainPlaylistStore(){
        let list = TemporalListStore.getSongList();

        // If list is empty, we add all songs
        if (list.length === 0) {
            addAllSongToTemporalList();
        }
        
        list.forEach(song => {
            PlaylistStore.addSong(song);
        });
        setTimeout(() => {
            clearAllSongToTemporalList();
        }, 100);
    }

    function addAllSongToMainPlaylistStoreAndPlay(){
        let list = TemporalListStore.getSongList();

        // If list is empty, we add all songs
        if (list.length === 0) {
            addAllSongToTemporalList();
        }

        let index = PlaylistStore.getSongList().length;

        list.forEach(song => {
            PlaylistStore.addSong(song);
        });
        
        if (list.length > 0) {
            let song = list[0];
            PlayerStore.setSongAndPlay(song.downloadSongUrl, song, index);
        }

        setTimeout(() => {
            clearAllSongToTemporalList();
        }, 100);
    }

    function shoGetSongList(){
        PlaylistStore.getSongList();
        TemporalListStore.getSongList();
    }

</script>

<div class="flex w-100 flex-row ">
    <button type="button" class="btn-small-control-list" on:click={addAllSongToTemporalList} on:keypress={addAllSongToTemporalList}>Seleccionar todos</button>
    <button type="button" class="btn-small-control-list" on:click={clearAllSongToTemporalList} on:keypress={clearAllSongToTemporalList}>Deseleccionar todos</button>
    <button type="button" class="btn-small-control-list" on:click={addAllSongToMainPlaylistStore} on:keypress={addAllSongToMainPlaylistStore}>Añadir al final</button>
    <button type="button" class="btn-small-control-list" on:click={addAllSongToMainPlaylistStoreAndPlay} on:keypress={addAllSongToMainPlaylistStoreAndPlay}>Añadir al final y Reproducir</button>
    <button type="button" class="btn-small-control-list cursor-help" on:click={shoGetSongList} on:keypress={shoGetSongList}>Show list</button>

    <PlayerMenuPlaylist title="Add to playlist" />
    
    <slot name="extra-options"></slot>
</div>