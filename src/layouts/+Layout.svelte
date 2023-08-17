<script>
	import Header from "./+Header.svelte";
	import ThemeToggle from "./+ThemeToggle.svelte";
	import MenuRoute from "$components/navigation/+MenuRoute.svelte";
	import ImgCoverModal from "$components/global/ImgCoverModal.svelte";
	import InformationModal from "$components/global/SongInformation/InformationModal.svelte";
</script>

<Header />
<MenuRoute />
<main class="m-auto p-3 h-screen-wo-menu-20 md:h-screen-wo-menu-10 flex flex-row">
  <slot />
  <ThemeToggle />
  <ImgCoverModal />
  <InformationModal />
</main>