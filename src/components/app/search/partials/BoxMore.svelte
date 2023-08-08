<script>
	import { PlusCircle } from "lucide-svelte";

    export let loadMoreOnClick = () => {};
    export let title = 'More';

    export let loading = false;
</script>

<div on:click={loadMoreOnClick} on:keypress={loadMoreOnClick} class="relative w-player flex shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border transition-opacity select-none {loading ? 'opacity-20' : 'cursor-pointer'}">
    <div class="p-2 flex flex-col items-center justify-center w-40 h-auto">

        <div class="h-24 w-24 grid place-items-center">
            <PlusCircle class="w-20 h-20 rounded-sm border-bg-player-light-background dark:border-cover-dark-border"/>
        </div>
        
        <!-- <div class="h-16 w-full text-center">
            <span class="font-sans text-base font-medium leading-7 text-slate-900 dark:text-white line-clamp-2">{title}</span>
        </div> -->

    </div>
</div>