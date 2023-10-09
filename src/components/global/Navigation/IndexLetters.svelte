<script lang="ts">
    import type { LetterLocal } from '$lib/types/global.d';
	import { Loader2 } from 'lucide-svelte';

    export let letters: Array<LetterLocal>;

    function scrollToElement(e: Event) {
        let element = e.target as HTMLElement;
        let id = element.dataset.id;
        let indexElement = document.querySelector(`[data-id-index="${id}"]`);
        
        if (!indexElement) return;
        indexElement.scrollIntoView({behavior: "instant", block: "center", inline: "nearest"});
    }
</script>

<div class="flex flex-row justify-around w-full uppercase">
    {#if letters.length === 0}
        <div class="my-0.5">
            <div class="animate-spin">
                <Loader2 class="h-6 w-6" />
            </div>
        </div>
    {/if}
    {#each letters as letter}
        <div on:click={scrollToElement} on:keydown={scrollToElement} data-id="{letter.id}" class="opacity-50 cursor-pointer hover:opacity-100" class:opacity-100={letter.active}>{letter.name}</div>
    {/each}
</div>