<script lang="ts">
    import type { Child } from "$models/servers/subsonic/types";
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import TemporalListStore from "$stores/TemporalListStore";
	import PlaylistStore from "$stores/PlaylistStore";

    export let api: SubsonicAPI;
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
        list.forEach(song => {
            PlaylistStore.addSong(song);
        });
        setTimeout(() => {
            clearAllSongToTemporalList();
        }, 100);
    }

    function shoGetSongList(){
        PlaylistStore.getSongList();
        TemporalListStore.getSongList();
    }
</script>

<div class="flex w-100 flex-row">
    <button type="button" class="btn-small-control-list" on:click={addAllSongToTemporalList} on:keypress={addAllSongToTemporalList}>Seleccionar todos</button>
    <button type="button" class="btn-small-control-list" on:click={clearAllSongToTemporalList} on:keypress={clearAllSongToTemporalList}>Deseleccionar todos</button>
    <button type="button" class="btn-small-control-list" on:click={addAllSongToMainPlaylistStore} on:keypress={addAllSongToMainPlaylistStore}>Añadir al final</button>
    <button type="button" class="btn-small-control-list cursor-help" on:click={shoGetSongList} on:keypress={shoGetSongList}>Show list</button>
    <slot name="extra-options"></slot>
</div>