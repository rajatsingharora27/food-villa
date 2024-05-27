import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { config } from "dotenv"; // Import the 'config' method from 'dotenv'

// // Load environment variables from the .env file
// config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  port: 8000,
  watch: {
    usePolling: true,
  },
});
