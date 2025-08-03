import { defineConfig } from 'vite';
import path from 'node:path';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        cart: resolve(__dirname, 'src/cart.html'),
        checkout: resolve(__dirname, 'src/checkout.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        secret: resolve(__dirname, 'src/secret.html'),
        shop: resolve(__dirname, 'src/shop.html'),
        error404: resolve(__dirname, 'src/404.html'),
        ...Object.fromEntries(
          [
            'aether',
            'arrow',
            'bullet',
            'cloudsurfer',
            'condor',
            'dragonfly',
            'eagle',
            'falcon',
            'hummingbird',
            'mirage',
            'nightshade',
            'origami',
            'phoenix',
            'raptor',
            'silverwing',
            'stingray',
            'swift',
            'thunderbolt',
            'voyager',
            'winddancer',
            'zenith',
          ].map((name) => [
            `product_${name}`,
            resolve(__dirname, `src/product/${name}.html`),
          ])
        ),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [{ src: 'products.json', dest: '.' }],
    }),
  ],
});
