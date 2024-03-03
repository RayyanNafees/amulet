// uno.config.ts
import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  // presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
})
