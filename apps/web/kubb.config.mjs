import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  root: '.',
  input: {
    path: './swagger-test.json',
  },
  output: {
    path: './src/gen',
    clean: true,
  },
  plugins: [
    pluginOas({
      validate: false,
    }),
    pluginTs({
      output: {
        path: './types',
      },
    }),
    pluginClient({
      output: {
        path: './clients',
      },
    }),
    pluginReactQuery({
      output: {
        path: './hooks',
      },
      framework: 'react',
    }),
  ],
})
