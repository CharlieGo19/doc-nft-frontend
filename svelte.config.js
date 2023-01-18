import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true,
        }),
    ],

    kit: {
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: "index.html",
        }),
        files: {
            assets: "static",
            lib: "src/lib",
        },
        // prerender: {
        //     // This can be false if you're using a fallback (i.e. SPA mode)
        //     entries: [],
        // },
    },
    vite: {
        build: {
            minify: true,
        },
    },
};

export default config;
