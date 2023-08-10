<script lang="ts">
	import LineSong from "$components/global/Song/LineSong.svelte";
	import type { Child, SubsonicAPI } from "$models/servers/subsonic";
	import { afterUpdate } from "svelte";

    export let songs: Array<Child>;
    export let api: SubsonicAPI;
    export let loadMoreOnClick: () => void;
    export let loading: boolean;

    // Elements for update scroll on refresh
    export let lastScrollTop = 0;
    let elementContent: HTMLElement;

    afterUpdate(() => {
        if (elementContent)
            elementContent.scrollTop = lastScrollTop;
    });

    function onScroll(e: Event) {
        lastScrollTop = (e.target as HTMLElement).scrollTop;
    }

</script>

{#if songs.length > 0 }

    <div class="divide-y border-theme mx-2 mt-2">
        <div class="main-color w-full pl-2 z-10"> Songs </div>
    </div>

    <div class="divide-y border-theme mx-2 mt-2 overflow-y-scroll min-h-[13rem]" bind:this={elementContent} on:scroll={onScroll}>
        {#each songs as song}
            <LineSong song={song} api={api}/>
        {/each}

        <div class="w-full flex justify-center">
            <button class="w-full dark:text-white text-zinc-700 font-bold m-2 py-2 px-4 rounded border disabled:opacity-20" on:click={loadMoreOnClick} disabled={loading}>
                Load more
            </button>
        </div>
    </div>

{/if}