// Plugin que permite ao Vite processar componentes React e JSX.
import react from '@vitejs/plugin-react'
// Função auxiliar para declarar a configuração do Vite.
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Ativa o suporte do plugin React neste projeto.
  plugins: [react()],
})
