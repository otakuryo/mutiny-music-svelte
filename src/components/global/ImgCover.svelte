<script lang="ts">
	import type { SubsonicAPI } from '$models/servers/subsonic';
    import { ShowImageCoverStore, ImageCoverStore, TitleStore } from '$stores/ImageCoverStore.js';
	import { get } from 'svelte/store';

	const handleError = (ev: { target: { src: string } } | any) => (ev.target.src = fallback);

	export let api: SubsonicAPI;
	export let title = 'Unknown title';
	export let songId = '-1';
    export let size = '12';
	export let marginRigth = '3';
	export let disableModal = false;

	let imageUrl = 'https://placehold.it/310x310';
	let fallback = imageUrl;

	function getCoverArt() {
		if (parseInt(size) > 20) {
			imageUrl = getUrlImageOriginal();
		} else if (parseInt(size) > 10) {
			imageUrl = getUrlImageMedium();			
		} else {
			imageUrl = getURLImageSmall();
		}
	}

	/**
	 * Get the small image url
	 * @returns string
	 */
	function getURLImageSmall() {
		return api.getCoverArtWoFetchSync({ id: songId, size: 160 });
	}

	/**
	 * Get the medium image url
	 * @returns string
	 */
	function getUrlImageMedium() {
		return api.getCoverArtWoFetchSync({ id: songId, size: 300 });
	}

	/**
	 * Get the original image url
	 * @returns string
	 */
	function getUrlImageOriginal() {
		return api.getCoverArtWoFetchSync({ id: songId });
	}

	getCoverArt();

	function toggleModalImage() {
		
		if (disableModal) return;

		ShowImageCoverStore.set(!get(ShowImageCoverStore));
		ImageCoverStore.set(getUrlImageOriginal());
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
	class="w-{size} h-{size} rounded-sm mr-{marginRigth} border-bg-player-light-background dark:border-cover-dark-border object-cover"
	class:cursor-zoom-in={!disableModal}
	alt={title}
	on:click={toggleModalImage}
/>
