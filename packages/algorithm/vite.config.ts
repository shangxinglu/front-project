import { defineConfig } from 'vite'

import VitePluginJsx from '@vitejs/plugin-vue-jsx'


export default defineConfig({
    resolve:{
        extensions: ['.ts','.tsx','.js'],
        alias:{
            '@': require('path').resolve(__dirname,'examples'),
            '@src': require('path').resolve(__dirname,'src'),
        }
    },
    build:{
        lib:{
            entry: 'src/index.ts',
            name: 'algorithm',
            formats: ['es','cjs','umd'],
            
        },
    },
    server:{
        port: 3000,
        open: true,
        hmr: {
            overlay: true,
        }
    },
    plugins:[
        VitePluginJsx({enableObjectSlots: true})
    ]
})