<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";

    export let id: string;
    export let name: string|undefined;
    export let refreshViewOnClick = (event: MouseEvent) => {};
    export let onBack = (event: MouseEvent) => {};

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={id}
    data-name={name}>
    <a href="/directory?id={id}" on:click={refreshViewOnClick} on:click={onBack}>
        <div class="p-2 flex items-center ">
            
            <ArrowLeft class="stroke-current text-slate-900 dark:text-white h-6 w-12 mr-6"/>

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{name}</span>
            </div>
        </div>
    </a>
</div>

