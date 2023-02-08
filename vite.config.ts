import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
})
