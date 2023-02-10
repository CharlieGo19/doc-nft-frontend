import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import type { UserConfig } from "vite";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// import rollupNodePolyFill from "rollup-plugin-polyfill-node";

const config: UserConfig = {
	plugins: [
		sveltekit(),
		// NodeGlobalsPolyfillPlugin({ buffer: true }),
		// NodeModulesPolyfillPlugin(),
	],
	// define: {
	// 	global: "globalThis",
	// },
	resolve: {
		alias: [
			{
				find: "src",
				replacement: path.resolve(__dirname, "./src"),
			},
		],
	},
	// optimizeDeps: {
	// 	esbuildOptions: {
	// 		define: {
	// 			global: "globalThis",
	// 		},
	// 	},
	// },
	logLevel: "info",
	build: {
		chunkSizeWarningLimit: 900,
		minify: true,
		rollupOptions: {
			// plugins: [rollupNodePolyFill()],
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules"))
						return id.toString().split("node_modules/")[1].split("/")[0].toString();
				},
			},
		},
	},
};

export default config;
