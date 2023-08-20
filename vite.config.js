import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
	plugins: [sveltekit({
		preprocess: sveltePreprocess()
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
