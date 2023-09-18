<script lang="ts">
	import { getCacheConfig } from "$lib/ts/Helpers";
	import type { AlbumID3, SubsonicAPI } from "$models/servers/subsonic";
	import { Star } from "lucide-svelte";

    export let album: AlbumID3;
    export let api: SubsonicAPI;
    export let width: string = "w-12";
    export let height: string = "h-6";

    /**
     * Toggle star
     * 
     * If star is true, then the album is starred, so we want to remove it from starred albums
     */
     async function toggleStar() {
        console.log("toggleStar", album);
        
        if (album.starred === undefined) {
            let response = await api.star({albumId: album.id});
            if (response.status == "ok") {
                album.starred = new Date();
            }
        } else {
            let response = await api.unstar({albumId: album.id});
            if (response.status == "ok") {
                album.starred = undefined;
            }
        }
        clearCache();
    }

    function clearCache(){
        console.log("clearCache");
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: "getStarred"})
        .then((count) => {
            console.log("Cache cleared", count);
        });

        cache.deleteKeyMatch({stringMatch: "getAlbumList"})
        .then((count) => {
            console.log("Cache cleared", count);
        });
    }

</script>

<!-- Añadir a favoritos -->
<div on:click={toggleStar} on:keydown={toggleStar}>
    {#if album.starred !== undefined }
        <Star class="stroke-current text-slate-900 dark:text-yellow-200 cursor-pointer {height} {width}" fill="yellow"/>
    {:else}
        <Star class="stroke-current text-slate-900 dark:text-yellow-200 cursor-pointer {height} {width}" />
    {/if}
</div>