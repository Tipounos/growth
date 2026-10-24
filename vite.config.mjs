
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/growth/",

  build: {
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        register: resolve(root, "register.html"),
        login: resolve(root, "login.html"),
      },
    },
  },
});
