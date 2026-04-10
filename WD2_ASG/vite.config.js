import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/api -> http://localhost:3000/api
      "/api": {
        target: "http://localhost:5000", // Your backend server address
        changeOrigin: true,
      },
    },
  },
});
