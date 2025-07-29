/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    //  Tailwind CSS 默认会重置所有 HTML 元素的样式（即 Preflight 功能）
    preflight: false, // 禁用 Preflight
  },
  plugins: [],
}