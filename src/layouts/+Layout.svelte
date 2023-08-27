<script>
	import Header from "./+Header.svelte";
	import ThemeToggle from "./+ThemeToggle.svelte";
	import MenuRoute from "$components/navigation/+MenuRoute.svelte";
	import ImgCoverModal from "$components/global/ImgCoverModal.svelte";
	import InformationModal from "$components/global/SongInformation/InformationModal.svelte";

	//App.svelte
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
	import { browser } from '$app/environment'

	// Create a client
	const queryClient = new QueryClient({
		defaultOptions: {
		queries: {
			enabled: browser,
		},
		},
	})
	
</script>

<QueryClientProvider client={queryClient}>
	<Header />
	<MenuRoute />
	<main class="m-auto p-3 h-screen-wo-menu-20 md:h-screen-wo-menu-10 flex flex-row">
	  <slot />
	  <ThemeToggle />
	  <ImgCoverModal />
	  <InformationModal />
	</main>
	<SvelteQueryDevtools />
</QueryClientProvider>