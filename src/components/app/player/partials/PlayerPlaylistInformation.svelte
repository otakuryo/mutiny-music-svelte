<script>
    import { currentIndex } from "$stores/CurrentPlaySong";
    import PlaylistStore from "$stores/PlaylistStore";
    import { get } from "svelte/store";

    let index = 0;
    let playlistTotal = 0;

    currentIndex.subscribe(i => {
        index = i == -1 ? 0 : i + 1;
    });

    PlaylistStore.subscribe(list => {
        playlistTotal = list.length;
    });


</script>

<div class="w-full">
    <div class="flex flex-row justify-center">
        Canciones: {index}/{playlistTotal}
    </div>
</div>