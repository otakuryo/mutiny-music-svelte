<script lang="ts">
    import { onMount } from "svelte";
	import type { MusicFolder } from "$models/servers/subsonic/types";
	import { Folder } from "lucide-svelte";
	import { ServerConfigObj } from "$stores/ServerConfigStore";

    export let folder: MusicFolder;

    let route = `/directory?id=${folder.id}`;

    onMount(() => {
        setDefaultRoute();
    });

    function getTypeServer(typeServer: string) {
        return typeServer === ServerConfigObj.get().serverType
    }

    function setDefaultRoute() {
        if (getTypeServer('gonic') || folder.id === 0) {
            route = '/indexes?id=al-1';
        }
    }
</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={folder.id}
    data-name={folder.name}>
    <a href="{route}">
        <div class="p-2 flex items-center ">

            <Folder class="stroke-current text-slate-900 dark:text-white h-12 w-12 my-2"/>

            <div class="flex flex-col ml-2">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{folder.name}</span>
            </div>
        </div>
    </a>
</div>

