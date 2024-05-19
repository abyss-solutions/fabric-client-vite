import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      port: 3000,
      https: isDev
        ? {
            key: fs.readFileSync(
              path.resolve(__dirname, `./localhost-key.pem`)
            ),
            cert: fs.readFileSync(path.resolve(__dirname, `./localhost.pem`)),
          }
        : {},
      host: "0.0.0.0",
    },

    // path aliases
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
