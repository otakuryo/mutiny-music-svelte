<script lang="ts">
	import type { AlbumID3, SubsonicAPI } from "$models/servers/subsonic";
	import BoxAlbum from "$components/app/search/partials/BoxAlbum.svelte";
	import BoxMore from "$components/app/search/partials/BoxMore.svelte";
	import { afterUpdate } from "svelte";
	import { RotateCcw } from "lucide-svelte";

    export let albums: Array<AlbumID3>;
    export let api: SubsonicAPI;
    export let refreshViewOnClick: () => void = () => {};
    export let loadMoreOnClick: () => void = () => {};
    export let loading: boolean = false;
    export let showBtnMore: boolean = true;
    export let showBtnRefresh: boolean = false;
    export let title: string = "Albums";


    // Elements for update scroll on refresh
    let elementContent: HTMLElement;
    export let lastScrollLeft = 0;

    afterUpdate(() => {
        if (elementContent){
            elementContent.scrollLeft = lastScrollLeft;
        }
    });

    function onScroll(e: Event) {
        lastScrollLeft = (e.target as HTMLElement).scrollLeft;
    }

</script>

{#if albums.length > 0}


    <div class="main-color border-theme mx-2 mt-2 flex">
        <div class="pl-2 z-10">{title}</div>
        {#if !showBtnMore && showBtnRefresh }
            <div class="pr-2 z-10 ml-auto cursor-pointer" on:click={refreshViewOnClick} on:keyup={refreshViewOnClick}>
                <RotateCcw class="py-1" />
            </div>
        {/if}
    </div>
    
    <div class="main-color divide-y border-theme mx-2 mt-2 overflow-x-scroll min-h-[13rem]" bind:this={elementContent} on:scroll={onScroll}>
    
        <div class="flex flex-row">
    
            {#each albums as album}
    
                <BoxAlbum album={album} api={api} refreshViewOnClick={refreshViewOnClick}/>
                    
            {/each}
    
            {#if showBtnMore}
                <BoxMore loadMoreOnClick={loadMoreOnClick} loading={loading} />
            {/if}
    
        </div>
    </div>

{/if}