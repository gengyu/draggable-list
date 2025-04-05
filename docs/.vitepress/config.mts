import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'Draggable List',
  description: '一个轻量级的可拖动排序列表组件',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/options' },
      { text: '示例', link: '/examples/basic' },
      { text: 'GitHub', link: 'https://github.com/gengyu/draggable-list' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '基础用法', link: '/guide/basic-usage' },
            { text: '进阶用法', link: '/guide/advanced-usage' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '配置选项', link: '/api/options' },
            { text: '事件', link: '/api/events' },
            { text: '类型定义', link: '/api/types' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '基础示例', link: '/examples/basic' },
            { text: '自定义样式', link: '/examples/custom-style' },
            { text: '触摸支持', link: '/examples/touch' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gengyu/draggable-list' }
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present gengyu & Contributors'
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'theme'),
      },
    },
  },
})