import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';
import path from 'path'; // 1. Import 'path' module
import { fileURLToPath } from 'url'; // 2. Import utility to get __dirname equivalent

// Define __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certPath = path.resolve(__dirname, ''); // 3. Use path.resolve to create an absolute path
const keyFileName = 'localhost+3-key.pem';
const certFileName = 'localhost+3.pem';

// const keyFileName = 'localhost+3-key.pem'; 
// const certFileName = 'localhost+3.pem';

export default defineConfig({
  // plugins: [
  //   react(),
  //   tailwindcss(),
  //   basicSsl(),
  // ],
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    https: {
      // 4. Join the paths reliably
      key: fs.readFileSync(path.join(certPath, keyFileName)),
      cert: fs.readFileSync(path.join(certPath, certFileName)),
    },
    host: '0.0.0.0',
    port: 5173,
  },

})