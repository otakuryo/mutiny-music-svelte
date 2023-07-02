<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
    
    const handleError = (ev: { target: { src: string; } } | any) => ev.target.src = fallback;

    export let api: SubsonicAPI;
    export let title = "Unknown title";
    export let songId = "-1";
    
    let imageUrl = "https://placehold.it/210x310";
    let fallback = imageUrl;

    function getCoverArt() {
        let image = api.getCoverArtWoFetchSync({id: songId});
        imageUrl = image
    }

    getCoverArt()

</script>

<img loading="lazy" src={imageUrl} on:error={handleError} data-amplitude-song-info="cover_art_url" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover" alt={title}/>
