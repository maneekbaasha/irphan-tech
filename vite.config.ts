import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        portfolio: "index.html",
        helpdeskCaseStudy: "projets/modern-it-helpdesk-lab/index.html",
      },
    },
  },
});
