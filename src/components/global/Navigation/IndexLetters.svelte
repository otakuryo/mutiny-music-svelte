<script lang="ts">
    import type { LetterLocal } from '$lib/types/global.d';

    export let letters: Array<LetterLocal>;

    function scrollToElement(e: Event) {
        let element = e.target as HTMLElement;
        let id = element.dataset.id;
        let indexElement = document.querySelector(`[data-id-index="${id}"]`);
        
        if (!indexElement) return;
        indexElement.scrollIntoView({behavior: "instant", block: "center", inline: "nearest"});
    }
</script>

<div class="navigation-sticky">
    <div class="flex flex-row justify-around w-full uppercase border-b-[1px]">
        {#each letters as letter}
            <div on:click={scrollToElement} data-id="{letter.id}" class="opacity-50 cursor-pointer hover:opacity-100" class:opacity-100={letter.active}>{letter.name}</div>
        {/each}
    </div>
</div>