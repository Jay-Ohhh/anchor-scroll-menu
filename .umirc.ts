import { defineConfig } from 'dumi';
import { IConfig } from '@umijs/types';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

const config: IConfig = {
  title: 'anchor-scroll-menu',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // 由于 GitHub Pages 是非域名根路径部署, base 和 publicPath 配置项需改为 仓库名称 。
  base: '/anchor-scroll-menu/',
  publicPath: '/anchor-scroll-menu/',
  // more config: https://d.umijs.org/config

  // 单语言配置方式如下
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/Jay-Ohhh/anchor-scroll-menu',
    },
    { title: 'Changelog', path: 'https://github.com/Jay-Ohhh/anchor-scroll-menu/releases' },
  ],

  alias: {
    '@/*': 'src/*',
  },

  fastRefresh: {}, // 开发环境下，可以保持组件状态，同时编辑提供即时反馈

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
  devServer: {
    port: 8081,
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    if (env === 'development') {
      memo.plugin('openBrowser').use(OpenBrowserPlugin, [
        {
          url: 'http://localhost:8081',
        },
      ]);
    }
  },
};

export default defineConfig(config);
