<script lang="ts">
	import type { AlbumID3, SubsonicAPI } from "$models/servers/subsonic";
	import BoxAlbum from "$components/app/search/partials/BoxAlbum.svelte";
	import BoxMore from "$components/app/search/partials/BoxMore.svelte";
	import { afterUpdate } from "svelte";

    export let albums: Array<AlbumID3>;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: () => void;
    export let loadMoreOnClick: () => void;
    export let loading: boolean;


    // Elements for update scroll on refresh
    let elementContent: HTMLElement;
    export let lastScrollLeft = 0;

    afterUpdate(() => {
        if (elementContent){
            elementContent.scrollLeft = lastScrollLeft;
            console.log("lastScrollLeft", lastScrollLeft);
            
        }
    });

    function onScroll(e: Event) {
        lastScrollLeft = (e.target as HTMLElement).scrollLeft;
    }

</script>

{#if albums.length > 0}

    <div class="divide-y border-theme mx-2 mt-2">
        <div class="main-color w-full pl-2 z-10">Albums</div>
    </div>
    
    <div class="divide-y border-theme mx-2 mt-2 overflow-x-scroll min-h-[13rem]" bind:this={elementContent} on:scroll={onScroll}>
    
        <div class="flex flex-row">
    
            {#each albums as album}
    
                <BoxAlbum album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}
    
            <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />
    
        </div>
    </div>

{/if}