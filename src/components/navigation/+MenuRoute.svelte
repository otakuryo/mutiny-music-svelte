<script lang="ts">
	import InputSearch from '$components/global/+InputSearch.svelte';
    import { Headphones, Menu } from 'lucide-svelte';

    const navbar_ = [
        {
            name: "Home",
            href: '/',
        },
        {
            name: "Directory",
            href: `/directory`,
        },
        {
            name: "Album",
            href: '/',
        },
        {
            name: "Artist",
            href: '/',
        },
        {
            name: "Playlist",
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

<header class="bg-white dark:bg-zinc-900 text-lg dark:text-zinc-300 mx-auto max-w-6xl flex flex-row justify-between">

    <a href="/" class="mx-8 my-5 flex items-center" aria-label="Website Logo">
        <Headphones class="w-8 h-8"/>
        <span class="self-center sm:hidden text-2xl whitespace-nowrap dark:text-white ml-3 mt-1">
            NoFuss
        </span>
    </a>

    {#each navbar_ as { name, href }}
        <nav class="pt-6 flex flex-row space-x-6">
            <a href={href} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block cursor-pointer">
                {name}
            </a>
        </nav>
    {/each}

    <div class="flex items-center justify-center">
        <InputSearch />
    </div>

    <button class="nav-toggle mx-8 my-5 sm:invisible display-none sm:hidden" aria-label="menu button" on:keypress={toggleMenu} on:click={toggleMenu}>
        <Menu class="w-8 h-8" />
    </button>
</header>

<header class="nav-menu hidden bg-white dark:bg-zinc-900">
    {#each navbar_ as { name, href }}
        <nav class="m-6 flex flex-col space-y-3">
            <a href={href} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden cursor-pointer">
                {name}
            </a>
        </nav>
    {/each}
</header>