
<script>
    import { ArrowRight, FileEdit, FilePlus, Save, Star } from 'lucide-svelte';

    export let refreshViewOnClick = () => {};
    export let title = '';
    export let placeholder = 'Nueva playlist';
    export let url = '/';
    
    $: console.log(title);
</script>

<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border ">
    <div class="p-2 flex items-center ">

        <slot name="icon">
            <FilePlus strokeWidth="1" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"/>
        </slot>

        <div class="flex flex-col">
            <!-- <span class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white border px-2 py-1" contenteditable="true" bind:innerHTML={title} /> -->
            <input type="text" bind:value={title} placeholder={placeholder} class="font-sans text-lg font-medium leading-7 dark:text-slate-900 text-white" >
        </div>
        <Save class="stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto cursor-pointer"/>
    </div>
</div>