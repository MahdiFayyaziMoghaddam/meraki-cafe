import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const API_PORT = process.env.API_PORT ?? 8787;

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	server: {
		// Same-origin /api in the browser, so no CORS and the API host never
		// reaches the client bundle. Point the bare server at :8787 directly
		// if you ever need to.
		proxy: {
			"/api": {
				target: `http://localhost:${API_PORT}`,
				changeOrigin: true
			}
		}
	}
});
