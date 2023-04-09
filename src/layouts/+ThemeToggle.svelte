<script>
    import { Moon, Sun } from "lucide-svelte";
    import { onMount } from 'svelte';
    
    function changeThemeAppearance() {
      
      let htmlClassList = document.documentElement.classList;
      if (htmlClassList.contains("dark")) {
        localStorage.setItem("theme", "light");
        htmlClassList.remove("dark");
      } else {
        localStorage.setItem("theme", "dark");
        htmlClassList.add("dark");
      }
    }
    
    function setThemeAppearance() {
      let htmlClassList = document.documentElement.classList;
      let theme = localStorage.getItem("theme");
      if (theme === "dark") {
        htmlClassList.add("dark");
      } else {
        htmlClassList.remove("dark");
      }
    }
    
    onMount(async () => {
      setThemeAppearance();
    });
</script>

<div on:click={changeThemeAppearance} class="theme-toggle text-lg not-italic font-normal leading-7 z-20 text-gray-900 box-border m-0 max-w-full p-0 align-baseline dark:bg-zinc-700 bg-zinc-300 w-12 h-12 fixed cursor-pointer flex justify-center items-center bottom-8 right-8 rounded-full left-unset border-none border-separate border-spacing-0">
  <button aria-label="theme toggle">
    <Moon outline class="w-6 hover:text-slate-500 dark:hover:text-slate-400 dark:hidden" />
    <Sun class="w-6 dark:text-white hover:text-slate-500 dark:hover:text-slate-400 hidden dark:block" />
  </button>
</div>
