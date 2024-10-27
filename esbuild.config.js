// /workspaces/bene/esbuild.config.js
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app/javascript/application.tsx'],
  bundle: true,
  outdir: 'app/assets/builds',
  publicPath: '/assets',
  sourcemap: true,
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx'
  },
  plugins: []
}).catch(() => process.exit(1))