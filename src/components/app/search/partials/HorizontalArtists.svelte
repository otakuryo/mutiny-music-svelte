<script lang="ts">
	import BoxArtist from "$components/app/search/partials/BoxArtist.svelte";
	import BoxMore from "$components/app/search/partials/BoxMore.svelte";
	import type { ArtistID3, SubsonicAPI } from "$models/servers/subsonic";
	import { afterUpdate } from "svelte";

    export let artists: Array<ArtistID3>;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: () => void;
    export let loadMoreOnClick: () => void;
    export let loading: boolean;

    // Elements for update scroll on refresh
    let elementContent: HTMLElement;
    export let lastScrollLeft = 0;

    afterUpdate(() => {
        if (elementContent)
            elementContent.scrollLeft = lastScrollLeft;
    });

    function onScroll(e: Event) {
        lastScrollLeft = (e.target as HTMLElement).scrollLeft;
    }
    
</script>

{#if artists.length > 0}

    <div class="main-color divide-y border-theme mx-2 mt-2">
        <div class="main-color w-full pl-2 z-10"> Artists </div>
    </div>

    <div class="main-color divide-y border-theme mx-2 mt-2 overflow-x-scroll min-h-[13rem]" bind:this={elementContent} on:scroll={onScroll}>
        <div class="flex flex-row">

            {#each artists as artist}

                <BoxArtist artist={artist} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}

            <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />

        </div>
    </div>

{/if}