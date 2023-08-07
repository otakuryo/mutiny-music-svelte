<script>
    export let title = "Menu"
    export let type = "directory"

    export let items = [
        "Dashboard",
        "Settings",
        "Earnings",
    ]

    let show = "hidden";

    function dropdownToggle() {
        console.log("dropdownToggle");
        if (show === "hidden") {
            show = "";
        } else {
            show = "hidden";
        }
    }
</script>

<button type="button" class="btn-small-control-list relative" on:click={dropdownToggle} on:keypress={dropdownToggle}>
    
    <div class="flex flex-row">
        {title}
    </div>

    <!-- Dropdown menu -->
    <div on:mouseleave={dropdownToggle} class="{show} absolute top-8 right-0 z-10 bg-white divide-y divide-zinc-700 rounded-lg shadow border border-zinc-700 w-44 dark:bg-zinc-800 dark:divide-zinc-600">
        
        <ul class="py-2 text-sm text-black dark:text-gray-200">
            {#each items as item}
                <li>
                    <div class="block px-4 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:hover:text-white">{item}</div>
                </li>
            {/each}
        </ul>
    
        <div class="py-2 cursor-default">
            <div class="block px-4 text-sm text-black  dark:text-gray-200 ">Menú</div>
        </div>
        
    </div>
</button>


