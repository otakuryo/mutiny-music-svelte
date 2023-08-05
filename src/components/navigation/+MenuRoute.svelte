<script lang="ts">
	import InputSearch from '$components/global/+InputSearch.svelte';
    import { Headphones, Menu } from 'lucide-svelte';

    const navbar_ = [
        {
            name: "Home",
            href: '/',
        },
        {
            name: "Search",
            href: `/search`,
        },
        {
            name: "Directory",
            href: `/directory`,
        },
        {
            name: "Album",
            href: '/albums',
        },
        {
            name: "Artist",
            href: '/artists',
        },
        {
            name: "Playlists",
            href: '/playlists',
        },
        {
            name: "Settings",
            href: '/settings',
        },
    ];

    function toggleMenu() {
        const menu = document.querySelector('.nav-menu');
        if (!menu) return;
        menu.classList.toggle('hidden');
    }

    const desktopIcons = "dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block";
    const mobileIcons = "dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden";
</script>

<!-- desktop menu -->
<header class=" fixed h-16 w-screen dark:text-zinc-300 bg-white dark:bg-zinc-900 z-50 dark:border-b-white border-b-2 border-b-zinc-300">
    <div class="text-lg mx-auto max-w-6xl flex flex-row justify-between h-full">
        <a href="/" class="mx-6 flex items-center " aria-label="Website Logo">
            <Headphones class="w-8 h-8"/>
            <span class="self-center sm:hidden text-2xl whitespace-nowrap dark:text-white ml-3 mt-1">
                 Mutiny
            </span>
        </a>
    
        {#each navbar_ as { name, href }}
            <nav class="flex flex-row space-x-3 h-full items-center">
                <a href={href} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block cursor-pointer">
                    {name}
                </a>
            </nav>
        {/each}
    
        <!-- <div class="flex items-center justify-center">
            <InputSearch />
        </div> -->
    
        <button class="nav-toggle mx-6 my-5 sm:invisible display-none sm:hidden" aria-label="menu button" on:keypress={toggleMenu} on:click={toggleMenu}>
            <Menu class="w-8 h-8" />
        </button>
    </div>
</header>

<!-- Space for the menu -->
<div class="h-16 w-screen"></div>

<header class="nav-menu hidden z-50 main-color relative h-screen">
    <div class="h-full overflow-scroll">
        {#each navbar_ as { name, href }}
            <nav class="m-6 flex flex-col space-y-3">
                <a href={href} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden cursor-pointer">
                    {name}
                </a>
            </nav>
        {/each}
    </div>
</header>