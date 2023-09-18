<script lang="ts">
	import { getCacheConfig } from "$lib/ts/Helpers";
	import type { ArtistID3, SubsonicAPI } from "$models/servers/subsonic";
	import { Star } from "lucide-svelte";

    export let artist: ArtistID3;
    export let api: SubsonicAPI;
    export let width: string = "w-12";
    export let height: string = "h-6";

    /**
     * Toggle star
     * 
     * If star is true, then the artist is starred, so we want to remove it from starred artists
     */
     async function toggleStar() {
        console.log("toggleStar", artist);
        
        if (artist.starred === undefined) {
            let response = await api.star({artistId: artist.id});
            if (response.status == "ok") {
                artist.starred = new Date();
            }
        } else {
            let response = await api.unstar({artistId: artist.id});
            if (response.status == "ok") {
                artist.starred = undefined;
            }
        }

        clearCache();
    }

    function clearCache(){
        console.log("clearCache");
        let cache = getCacheConfig();

        cache.deleteKeyMatch({stringMatch: "getStarred"})
        .then((count) => {
            console.log("Cache cleared: getStarred", count);
        });

        cache.deleteKeyMatch({stringMatch: "getArtists"})
        .then((count) => {
            console.log("Cache cleared: getArtists", count);
        });

    }

</script>

<!-- Añadir a favoritos -->
<div on:click={toggleStar} on:keydown={toggleStar}>
    {#if artist.starred !== undefined }
        <Star class="stroke-current text-slate-900 dark:text-yellow-200 cursor-pointer {height} {width}" fill="yellow"/>
    {:else}
        <Star class="stroke-current text-slate-900 dark:text-yellow-200 cursor-pointer {height} {width}" />
    {/if}
</div>