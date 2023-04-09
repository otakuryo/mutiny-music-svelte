<script>
	import Header from "./+Header.svelte";
	import Menu from "$components/navigation/+Menu.svelte";

</script>

<Header />
<Menu />
<main class="m-auto p-6 max-w-4xl md:p-8 min-h-screen">
  <slot />
</main>