<script lang="ts">
	import type { SubsonicAPI } from "$models/servers/subsonic";
	import type { MusicFolder } from "$models/servers/subsonic/types";

    export let folder: MusicFolder;

    let route = `/directory?id=${folder.id}`;

    // gonic patch
    if (folder.id === 0) {
        route = '/indexes?id=al-1';
    }

</script>

<div 
    class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border "
    data-id={folder.id}
    data-name={folder.name}>
    <a href="{route}">
        <div class="p-2 flex items-center ">
            
            <img loading="lazy" src="https://placehold.it/210x310" data-amplitude-song-info="cover_art_url" class="w-12 h-12 rounded-sm mr-6 border-bg-player-light-background dark:border-cover-dark-border object-cover" alt={folder.name}/>

            <div class="flex flex-col">
                <span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">{folder.name}</span>
            </div>
        </div>
    </a>
</div>

