<script lang="ts">
    import type { Child } from "$models/servers/subsonic/types";
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import TemporalListStore from "$stores/TemporalListStore";
	import PlaylistStore from "$stores/PlaylistStore";

    export let api: SubsonicAPI;
    export let list: Child[] = [];

    export let callbackCheckSonByIndex: (indexes: number[]) => void;
    export let callbackUncheckSonByIndex: (indexes: number[]) => void;

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

        callbackCheckSonByIndex(localIndexes);

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
        callbackUncheckSonByIndex(localIndexes);
    }

    function addAllSongToMainPlaylistStore(){
        let list = TemporalListStore.getSongList();
        list.forEach(song => {
            PlaylistStore.addSong(song);
        });
        clearAllSongToTemporalList();
    }

    function shoGetSongList(){
        PlaylistStore.getSongList();
        TemporalListStore.getSongList();
    }
</script>

<div class="flex w-100 flex-row">
    <button type="button" class="btn-small-control-list" on:click={addAllSongToTemporalList} on:keypress={addAllSongToTemporalList}>Select All</button>
    <button type="button" class="btn-small-control-list" on:click={clearAllSongToTemporalList} on:keypress={clearAllSongToTemporalList}>Deselect All</button>
    <button type="button" class="btn-small-control-list" on:click={addAllSongToMainPlaylistStore} on:keypress={addAllSongToMainPlaylistStore}>Add To End</button>
    <!-- <button type="button" class="btn-small-control-list">Añadir a una playlist</button> -->
    <!-- <button type="button" class="btn-small-control-list cursor-grab">Añadir en la posición</button> -->
    <!-- <button type="button" class="btn-small-control-list cursor-help" on:click={shoGetSongList} on:keypress={shoGetSongList}>Show list</button> -->
</div>