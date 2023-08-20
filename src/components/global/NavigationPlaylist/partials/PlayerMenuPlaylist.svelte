<script lang="ts">
	import { MainServerSubsonicAPI } from "$lib/ts/Helpers";
	import type { Playlist, SubsonicAPI, SubsonicBaseResponse } from "$models/servers/subsonic";
	import TemporalListStore from "$stores/TemporalListStore";
	import { onMount } from "svelte";

    type PlaylistServerType = (SubsonicBaseResponse & { playlists: Playlists });
    export let title = "Playlists"

    let show = "hidden";
    let api: SubsonicAPI;

    let playlists: Playlist[] = [];

    let disabledAll = false;

    let state = "Menu";

    onMount(() => {
        getPlaylistsFromServer();
    });


    function getPlaylistsFromServer(){
        api = MainServerSubsonicAPI();
        api.getPlaylists().then((response: PlaylistServerType ) => {
            if (response.playlists === undefined || response.playlists.playlist === undefined) {
                return;
            }

            playlists = response.playlists.playlist
        });
    }

    async function onSelectPlaylist(playlist: Playlist) {
        console.log("onSelectPlaylist");

        if (disabledAll) return;

        try {

            let list = TemporalListStore.getSongList();
            if (list.length === 0) return;
            disabledAll = true;
            await api.updatePlaylist({playlistId: playlist.id, songIdToAdd: list.map((song) => song.id)});

            state = "Añadido";

            getPlaylistsFromServer();
            setTimeout(() => {

            disabledAll = false;
                state = "Menu";
                disabledAll = false;
            }, 1000);

        } catch (error) {
            console.log("No se ha podido añadir la playlist", error);
        }
        
    }

    function dropdownToggle() {
        console.log("dropdownToggle");
        if (show === "hidden") {
            show = "";
        } else {
            show = "hidden";
        }
    }

    function closeMenu() {
        show = "hidden";
    }
</script>

<style>
    .disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .disabled:hover {
        background-color: transparent;
    }
</style>

<button type="button" class="btn-small-control-list relative" on:click|self={dropdownToggle} on:keypress|self={dropdownToggle}>
    
    <div class="flex flex-row" on:click|self={dropdownToggle} on:keypress|self={dropdownToggle}>
        {title}
    </div>

    <!-- Dropdown menu -->
    <div on:mouseleave|self={closeMenu} class="{show} absolute top-8 right-0 z-10 bg-white divide-y divide-zinc-700 rounded-lg shadow border border-zinc-700 w-44 dark:bg-zinc-800 dark:divide-zinc-600">
        
        <ul class="py-2 text-sm text-black dark:text-gray-200">
            {#each playlists as item}
                <li on:click={() => onSelectPlaylist(item)} on:keypress={() => onSelectPlaylist(item)}>
                    <div class:disabled={disabledAll} class="block px-4 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:hover:text-white">{item.name} <span class="opacity-50">{item.songCount}</span></div>
                </li>
            {/each}
        </ul>
    
        <div class="py-2 cursor-default">
            <div class="block px-4 text-sm text-black  dark:text-gray-200 ">{state}</div>
        </div>
        
    </div>
</button>


