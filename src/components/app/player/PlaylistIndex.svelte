<script lang="ts">
	import PlaylistStore from "$stores/PlaylistStore";
	import { get } from "svelte/store";
	import PlayerControls from "./partials/PlayerControls.svelte";
	import PlayerInformationSong from "./partials/PlayerInformationSong.svelte";
	import PlayerLineMusic from "./partials/PlayerLineMusic.svelte";
	import PlayerListNavigation from "./partials/PlayerListNavigation.svelte";
	import PlayerPlaylistInformation from "./partials/PlayerPlaylistInformation.svelte";
	import { currentIndex } from "$stores/CurrentPlaySong";

    let hovering = -1;
    let selectItem = -1;

    function drop(event: DragEvent, target: number) {
        console.log("drop");

        if (!event.dataTransfer) return;

        event.dataTransfer.dropEffect = 'move'; 

        // TODO: Check if can use object instead of text/plain
        const start = parseInt(event.dataTransfer.getData("text/plain"));

        if (start === target || start === -1 || isNaN(start) ) {
            hovering = -1;
            return;
        };

        const newTracklist = get(PlaylistStore);

        if (start < target) {
            newTracklist.splice(target + 1, 0, newTracklist[start]);
            newTracklist.splice(start, 1);
            
        } else {
            newTracklist.splice(target, 0, newTracklist[start]);
            newTracklist.splice(start + 1, 1);
        }


        recalculatePointerCurrentIndex(start, target);

        PlaylistStore.set(newTracklist);
        hovering = -1;
    }

    /**
     * Recalculate current index
     * 
     * @param start
     * @param target
     */
    function recalculatePointerCurrentIndex(start: number, target: number){

        // Update current index
        let currentSongLocal = get(currentIndex);

        // If current song is the same as start, we don't need to calculate movement
        // If current song is the same as target, we need to calculate movement
        // If current song is between start and target, we move it one position to the bottom
        // If current song is between target and start, we move it one position to the top
        // If current song is the same as target, we move it one position to the top or bottom depending on start and target
        if (currentSongLocal === start) {
            // console.log("Moviment not recalculated");
            
            currentIndex.set(target);
        } else if (currentSongLocal > start && currentSongLocal <= target) {
            // console.log("Move for below current song");
            
            currentIndex.set(currentSongLocal - 1);
        } else if (currentSongLocal < start && currentSongLocal >= target) {
            // console.log("Move for above current song");
            
            currentIndex.set(currentSongLocal + 1);
        } else if (currentSongLocal === target){

            if (start < target) {
                // console.log("Move for below current song 2");
                
                currentIndex.set(currentSongLocal - 1);
            } else {
                // console.log("Move for above current song 2");
                
                currentIndex.set(currentSongLocal + 1);
            }
        }
        
    }

    function dragstart(event: DragEvent, i: number) {
        console.log("dragstart");
        
        if (!event.dataTransfer) return;

        selectItem = i;

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        const start = i;

        // TODO: Check if can use object instead of text/plain
        event.dataTransfer.setData('text/plain', `${start}`);
    }

    function onDragOver(event: DragEvent) {
        console.log("onDragOver");
        
		event.preventDefault();
        if (!event.dataTransfer) return;
		event.dataTransfer.dropEffect = 'move';
        selectItem = -1;
        return false;
    }
</script>

<div class="main-right-panel">
    <div class="content-parent">

        <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
            <PlayerInformationSong />
            <PlayerControls />
            <PlayerPlaylistInformation />
        </div>
        <div class="main-color divide-y px-2 border-theme mx-2 mt-2">
            <PlayerListNavigation />
        </div>
        <div class="overflow-y-auto divide-y border-theme m-2">
            
            {#each $PlaylistStore as song, index}
                {#if !song.isDir}
                    <div 
                        class="select-none"
                        draggable={true}
                        on:dragstart={event => dragstart(event, index)}
                        on:drop|preventDefault={event => drop(event, index)}
                        on:dragover={onDragOver}
                        on:dragenter={() => hovering = index}
                        class:main-color={selectItem === index}
                        class:cursor-grabbing={selectItem === index}
                        class:opacity-25={hovering === index} >
                            <PlayerLineMusic bind:song={song} index={index} />
                    </div>
                {/if}
            {/each}

        </div>

    </div>
</div>