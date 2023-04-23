<script>
	import Header from "./+Header.svelte";
	import ThemeToggle from "./+ThemeToggle.svelte";
	import MenuRoute from "$components/navigation/+MenuRoute.svelte";

</script>

<Header />
<MenuRoute />
<main class="m-auto p-6 max-w-4xl md:p-8 min-h-screen">
  <slot />
  <ThemeToggle />
</main>