<script>
	import { FolderClosed } from "lucide-svelte";

    export let title = 'Generic Title';

</script>

<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border">
    <div class="p-2 flex items-center ">

        <slot name="icon">
            <!-- <FolderClosed class="stroke-current text-slate-900 dark:text-white h-6 w-12 mr-3"/> -->
        </slot>

        <div class="flex flex-col">
            <span class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{title}</span>
        </div>

    </div>
</div>