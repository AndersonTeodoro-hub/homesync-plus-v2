import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo (development/production)
  // Casting process to any to avoid TS errors in config file during build
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Define process.env para que o código funcione no navegador
    // Isso é crucial para a Vercel injetar as chaves corretamente
    define: {
      'process.env': JSON.stringify(env)
    },
    build: {
      outDir: 'dist',
    }
  };
});