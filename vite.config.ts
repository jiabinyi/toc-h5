import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {
  createStyleImportPlugin,
  NutuiResolve
} from 'vite-plugin-style-import';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

function resolve(dir: string) {
  return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930 .env
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [NutuiResolve()]
    })
  ],
  server: {
    host: 'localhost',
    port: 9022,
    proxy: {
      '/dev': {
        // 开发地址
        target: 'XXXXXXXX',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, '')
      }
    }
  },
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        // 配置 nutui 全局 scss 变量
        additionalData: `@import "@common/assets/theme/blue.scss";@import "@nutui/nutui/dist/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@common': resolve('./src/common'),
      '@components': resolve('./src/components'),
      '@store': resolve('./src/store'),
      '@views': resolve('./src/views')
    }
  }
});
