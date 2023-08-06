<script>
	import Header from "./+Header.svelte";
	import ThemeToggle from "./+ThemeToggle.svelte";
	import MenuRoute from "$components/navigation/+MenuRoute.svelte";
	import ImgCoverModal from "$components/global/ImgCoverModal.svelte";
</script>

<Header />
<MenuRoute />
<main class="m-auto p-3 min-h-screen flex flex-row">
  <slot />
  <ThemeToggle />
  <ImgCoverModal />
</main>