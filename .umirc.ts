import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'anchor-scroll-menu',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // 由于 GitHub Pages 是非域名根路径部署, base 和 publicPath 配置项需改为 仓库名称 。
  base: '/anchor-scroll-menu/',
  publicPath: '/anchor-scroll-menu/',
  alias: {
    '@/*': 'src/*',
  },
  // more config: https://d.umijs.org/config

  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
});
