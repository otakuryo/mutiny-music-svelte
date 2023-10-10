<script lang="ts">
	import PlaylistStore from "$stores/PlaylistStore";
	import { Settings2 } from "lucide-svelte";

    function generic() {
        console.log("generic");
    }

    function selectAllSongs(){
        PlaylistStore.selectAllSongs();
    }
    function unselectAllSongs(){
        PlaylistStore.unselectAllSongs();
    }
    function removeAllSongsChecked(){
        PlaylistStore.removeAllSongsChecked();
    }

    function showAllSongsChecked(){
        let songs = PlaylistStore.getSongList();

        songs.forEach(song => {
            if (song.checked) {
                console.log(song);
            }
        })
    }
</script>

<div class="flex w-full flex-row ">

    <!-- <div on:click={generic} on:keypress={generic}>
        <Settings2 class=" btn-small-control-list main-color-icon w-auto cursor-pointer select-none"/>
    </div> -->

    <button type="button" class="btn-small-control-list" on:click={selectAllSongs} on:keypress={selectAllSongs}>Select All</button>
    <button type="button" class="btn-small-control-list" on:click={unselectAllSongs} on:keypress={unselectAllSongs}>Deselect All</button>
    <button type="button" class="btn-small-control-list" on:click={removeAllSongsChecked} on:keypress={removeAllSongsChecked}>Delete</button>
    <!-- <button type="button" class="btn-small-control-list" on:click={showAllSongsChecked} on:keypress={showAllSongsChecked}>Actualizar</button> -->

    <slot name="extra-options"></slot>
</div>