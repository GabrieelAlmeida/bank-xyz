import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/loginApi': {
        target: 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/loginApi/, '')
      },

      '/balanceApi': {
        target: 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/balanceApi/, '')
      },

      '/transferListApi': {
        target: 'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/transferListApi/, '')
      },
      '/newTransferApi': {
        target: 'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/newTransferApi/, '')
      }
    }
  }
})
