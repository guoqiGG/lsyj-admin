import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  viteMockServe
} from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  viteMockServe: {
    supportTs: false,
    logger: false,
    mockPath: "./mock/index.js"

  },
  plugins: [vue()],
  css: {
    /* CSS 预处理器   导入全局样式*/
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/styles/var.scss";'
      }
    }
  },

})