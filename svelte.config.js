// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
// import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		//adapter: adapter(),
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$routes: './src/routes',
			$stores: './src/stores',
			$utils: './src/utils',
			$layouts: './src/layouts',
			$models: './src/models',
			$interfaces: './src/interfaces',
			$src: './src',
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: false,

			// config netlify
			edge: false,
			split: false,
		})
	},
	preprocess: vitePreprocess(),
};

export default config;
