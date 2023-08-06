<script lang="ts">
	import type { SubsonicAPI } from '$models/servers/subsonic';
    import { ShowImageCoverStore, ImageCoverStore, TitleStore } from '$stores/ImageCoverStore.js';
	import { get } from 'svelte/store';

	const handleError = (ev: { target: { src: string } } | any) => (ev.target.src = fallback);

	export let api: SubsonicAPI;
	export let title = 'Unknown title';
	export let songId = '-1';
    export let size = '12';

	let imageUrl = 'https://placehold.it/310x310';
	let fallback = imageUrl;

	function getCoverArt() {
		let image = api.getCoverArtWoFetchSync({ id: songId });
		imageUrl = image;
	}

	getCoverArt();

	function toggleModalImage() {
		ShowImageCoverStore.set(!get(ShowImageCoverStore));
		ImageCoverStore.set(imageUrl);
		TitleStore.set(title);
	}

	$: if (songId !== '-1') {
		getCoverArt();
	}

</script>

<img
	loading="lazy"
	src={imageUrl}
	on:error={handleError}
	data-amplitude-song-info="cover_art_url"
	class="w-{size} h-{size} rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover cursor-zoom-in"
	alt={title}
	on:click={toggleModalImage}
/>
