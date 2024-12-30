import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Tic-Tac-Toe/", // Set to the name of your repository
  plugins: [react()],
});
