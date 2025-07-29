import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [  vue()],
  base: process.env.NODE_ENV === 'production' ? '/attendance-kanban/' : './',
  resolve: {
    alias: {
      //别名，给./src目录，起个别名@，在文件中就可以使用@替换src了
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api']
      },
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true", // 启用详细错误信息
  },
});
