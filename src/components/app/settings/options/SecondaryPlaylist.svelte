<script lang="ts">
	import InputSelectKeyValue from "$components/global/InputSelectKeyValue.svelte";
	import { MainServerSubsonicAPI } from "$lib/ts/Helpers";
	import { ServerConfigObj, ServerConfigPersistent } from "$stores/ServerConfigStore";
	import { onMount } from "svelte";

    let options: {[key: string]: string} = {};

    const labelSelect = "Secondary Playlist";
    let valueSelect = "0";

    const LK_DEFAULT_PLAYLIST_ID = "defaultPlaylistId";
    const LK_DEFAULT_PLAYLIST_NAME = "defaultPlaylistName";

    onMount(() => {
        getPlaylistFromServer();
        getCurrentValueSelect();
    });

    async function getPlaylistFromServer() {
        let api = MainServerSubsonicAPI();

        try {
            let playlistsResponse = await api.getPlaylists();

            if (playlistsResponse.error) {
                throw Error(`Error getting playlists, code: ${playlistsResponse.error.code}, message: ${playlistsResponse.error.message}`);
            }

            if (!playlistsResponse.playlists || playlistsResponse.playlists.playlist === undefined) {
                throw Error(`Error getting playlists, playlistsResponse.playlists is undefined`);
            }

            playlistsResponse.playlists.playlist.forEach(playlist => {
                options[playlist.id] = playlist.name;
            });

        } catch (error) {
            console.error(error);
        }
    }

    function getCurrentValueSelect(){
        let currentPlaylistId = ServerConfigObj.get()[LK_DEFAULT_PLAYLIST_ID];
        if (currentPlaylistId) {
            valueSelect = currentPlaylistId;
        }
    }

    // On update valueSelect, save in localStorage
    $: {
        if (valueSelect !== "0") {
            ServerConfigPersistent.setKey(LK_DEFAULT_PLAYLIST_ID, valueSelect)
            ServerConfigObj.setKey(LK_DEFAULT_PLAYLIST_ID, valueSelect)

            ServerConfigPersistent.setKey(LK_DEFAULT_PLAYLIST_NAME, options[valueSelect])
            ServerConfigObj.setKey(LK_DEFAULT_PLAYLIST_NAME, options[valueSelect])
        }
    }

</script>

<div class="main-center-panel-full">
    <div class="content-parent">

        <div class="py-12 w-6/12 mx-auto">

            <InputSelectKeyValue
                labelSelect={labelSelect}
                bind:valueSelect={valueSelect}
                informationSelect="Select the playlist that will be used as a secondary playlist"
                optionsSelect={options}
                required={true} />
        </div>
    </div>
</div>