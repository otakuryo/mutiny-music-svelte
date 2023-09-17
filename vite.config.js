import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import sveltePreprocess from 'svelte-preprocess';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit({
		preprocess: sveltePreprocess()
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		https: {
			key: fs.readFileSync(`cert/key.pem`),
			cert: fs.readFileSync(`cert/cert.pem`)
		}
	}
});
