import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, `./localhost-key.pem`)),
      cert: fs.readFileSync(path.resolve(__dirname, `./localhost.pem`)),
    },
    host: "0.0.0.0",
  },
});
