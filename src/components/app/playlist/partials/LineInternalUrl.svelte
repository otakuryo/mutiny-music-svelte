
<script>
    import { ArrowRight, Star } from 'lucide-svelte';

    export let refreshViewOnClick = () => {};
    export let title = 'Untitled';
    export let url = '/';
    
</script>

<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border ">
    <a href={url} on:click={refreshViewOnClick}>
        <div class="p-2 flex items-center ">

            <slot name="icon">
                <Star strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
            </slot>

            <div class="flex flex-col w-full">
                <span class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{title}</span>
            </div>
            <ArrowRight class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"/>
        </div>
    </a>
</div>