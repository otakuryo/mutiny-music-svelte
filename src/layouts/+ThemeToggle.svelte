<script lang="ts">
    import { Moon, Sun } from "lucide-svelte";
    import { onMount } from 'svelte';
    
    /**
     * Toggle between dark and light theme and save the preference in localStorage
     */
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
    
    /**
     * Set the theme appearance based on the preference in localStorage
     */
    function setThemeAppearance() {
      let htmlClassList = document.documentElement.classList;
      let theme = localStorage.getItem("theme");
      if (theme === "dark") {
        htmlClassList.add("dark");
      } else {
        htmlClassList.remove("dark");
      }
    }

    function onKeyupfn(event: KeyboardEvent) {
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar" || event.key === "Space") {
        changeThemeAppearance();
      }
    }

    /**
     * Set the theme appearance on page load
     */
    onMount(async () => {
      setThemeAppearance();
    });
</script>

<div on:click|preventDefault={changeThemeAppearance} on:keydown|preventDefault={onKeyupfn} class="theme-toggle main-color-solid sm:top-4 bottom-4 right-4 ">
  <button aria-label="theme toggle">
    <Moon class="w-6 dark:hidden" />
    <Sun class="w-6 dark:text-white dark:block hidden" />
  </button>
</div>
