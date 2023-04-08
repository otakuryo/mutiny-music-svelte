<script>

import { Headphones, Menu } from 'lucide-svelte';

const navbar = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Directory",
        href: "/directory",
    },
    {
        name: "Album",
        href: "/album",
    },
    {
        name: "Artist",
        href: "/artist",
    },
    {
        name: "Docs",
        href: "/docs",
    },
    {
        name: "Settings",
        href: "/settings",
    },
];

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

    {#each navbar as { name, href }}
        <nav class="pt-6 flex flex-row space-x-6">
            <a href={href} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block">
                {name}
            </a>
        </nav>
    {/each}

    <div class="flex items-center justify-center">
        <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden transition duration-500">
            <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>

            <input
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none"
                type="text"
                id="search"
                placeholder="Search..."
                autocomplete="off"
            />
        </div>
    </div>

    <button class="nav-toggle mx-8 my-5 sm:invisible display-none sm:hidden" aria-label="menu button">
        <Menu class="w-8 h-8" />
    </button>
</header>

<header class="nav-menu hidden bg-white dark:bg-zinc-900">
    {#each navbar as { name, href }}
        <nav class="m-6 flex flex-col space-y-3">
            <a href={href} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden">
                {name}
            </a>
        </nav>
    {/each}
</header>