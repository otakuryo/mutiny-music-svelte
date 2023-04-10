<script lang="ts">
	import InputSearch from '$components/global/+InputSearch.svelte';
    import { currentPage } from '$stores/GlobalStore';
    import { Headphones, Menu } from 'lucide-svelte';
    import { GlobalPage } from '$interfaces/GlobalPage';

    let _currentPage_: GlobalPage;

    const navbar_ = [
        {
            name: "Home",
            view: GlobalPage.home,
        },
        {
            name: "Directory",
            view: GlobalPage.directory,
        },
        {
            name: "Album",
            view: GlobalPage.album,
        },
        {
            name: "Artist",
            view: GlobalPage.artist,
        },
        {
            name: "Settings",
            view: GlobalPage.settings,
        },
    ];

    function changePage(toPage: GlobalPage) {
        currentPage.update(() => toPage)
    }

const desktopIcons = "dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block";
const mobileIcons = "dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden";
</script>

<header class="bg-white dark:bg-zinc-900 text-lg dark:text-zinc-300 mx-auto max-w-6xl flex flex-row justify-between">

    <a href="/" class="mx-8 my-5 flex items-center" aria-label="Website Logo">
        <Headphones class="w-8 h-8"/>
        <span class="self-center sm:hidden text-2xl whitespace-nowrap dark:text-white ml-3 mt-1">
            NoFuss
        </span>
    </a>

    {#each navbar_ as { name, view }}
        <nav class="pt-6 flex flex-row space-x-6">
            <div on:click={()=>{changePage(view)}} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block cursor-pointer">
                {name}
            </div>
        </nav>
    {/each}

    <div class="flex items-center justify-center">
        <InputSearch />
    </div>

    <button class="nav-toggle mx-8 my-5 sm:invisible display-none sm:hidden" aria-label="menu button">
        <Menu class="w-8 h-8" />
    </button>
</header>

<header class="nav-menu hidden bg-white dark:bg-zinc-900">
    {#each navbar_ as { name, view }}
        <nav class="m-6 flex flex-col space-y-3">
            <div on:click={()=>{changePage(view)}} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden cursor-pointer">
                {name}
            </div>
        </nav>
    {/each}
</header>