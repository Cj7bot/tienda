import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false
			},
			'/uploads': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false
			}
		}
	}
});
