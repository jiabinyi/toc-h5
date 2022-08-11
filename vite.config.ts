/* eslint-disable new-cap */
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, NutuiResolve } from 'vite-plugin-style-import'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir: string) {
  return path.join(__dirname, dir)
}

/*
 * https://vitejs.dev/config/
 * https://github.com/vitejs/vite/issues/1930 .env
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createStyleImportPlugin({ resolves: [NutuiResolve()] }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: 'src/components.d.ts',
        // ui库解析器，也可以自定义，需要安装相关UI库
        resolvers: []
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex', '@vueuse/head', '@vueuse/core'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: 'src/auto-import.d.ts'
      })
    ],
    server: {
      host: 'localhost',
      port: 9022,
      proxy: {
        '/devApi': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: p => p.replace(/^\/devApi/, '')
        }
      }
    },
    base: './',
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData:
            '@import "@common/assets/theme/blue.scss";@import "@nutui/nutui/dist/styles/variables.scss";'
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
  }
})
