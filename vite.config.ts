import { defineConfig } from 'vite'
import { resolve } from 'path'

// Plugin for using Vite with Vue
import vue from '@vitejs/plugin-vue'
// Element Plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// Vue i18n
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // Auto import Element Plus components
        ElementPlusResolver(),

        // Auto import icon components
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        // Auto register icon components
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        ElementPlusResolver(),
      ],
    }),
    VueI18nPlugin({
      // Settings for i18n resource including paths
      include: resolve(__dirname, 'locales/**'),
      runtimeOnly: false,
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
