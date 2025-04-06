import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'Draggable List',
  description: '一个轻量级的可拖动排序列表组件',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    // 基础 SEO
    ['meta', { name: 'keywords', content: '拖拽列表,排序列表,Vue组件,JavaScript组件,拖拽排序,Draggable List,Vue3,前端组件,列表排序,UI组件' }],
    ['meta', { name: 'author', content: 'gengyu' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    
    // Open Graph 协议
    ['meta', { property: 'og:title', content: 'Draggable List - 轻量级的可拖动排序列表组件' }],
    ['meta', { property: 'og:description', content: '简单、高效、易用的列表拖拽排序解决方案，支持Vue3和原生JavaScript' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://github.com/gengyu/draggable-list' }],
    ['meta', { property: 'og:image', content: 'https://github.com/gengyu/draggable-list/logo.png' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: 'Draggable List' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Draggable List - 轻量级的可拖动排序列表组件' }],
    ['meta', { name: 'twitter:description', content: '简单、高效、易用的列表拖拽排序解决方案，支持Vue3和原生JavaScript' }],
    ['meta', { name: 'twitter:image', content: 'https://github.com/gengyu/draggable-list/logo.png' }],
    ['meta', { name: 'twitter:creator', content: '@gengyu' }],
    
    // 移动端优化
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    
    // Canonical URL
    ['link', { rel: 'canonical', href: 'https://github.com/gengyu/draggable-list' }],
    
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
  ],
  // 结构化数据
  transformHtml: (html, id, { pageData }) => {
    let structuredData = '';
    
    // 首页结构化数据
    if (pageData.relativePath === 'index.md') {
      structuredData = `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Draggable List",
        "description": "一个轻量级的可拖动排序列表组件",
        "applicationCategory": "WebApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "gengyu"
        }
      }
      </script>`;
    }
    
    // Vue相关页面结构化数据
    else if (pageData.relativePath.startsWith('vue/')) {
      structuredData = `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "${pageData.title || 'Vue 3 Draggable List 组件'}",
        "description": "Vue 3的拖拽排序列表组件使用指南和API文档",
        "keywords": "Vue3,拖拽列表,Vue组件,排序列表,Draggable List",
        "author": {
          "@type": "Person",
          "name": "gengyu"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Draggable List",
          "logo": {
            "@type": "ImageObject",
            "url": "https://github.com/gengyu/draggable-list/logo.png"
          }
        }
      }
      </script>`;
    }
    
    // API文档页面结构化数据
    else if (pageData.relativePath.startsWith('api/')) {
      structuredData = `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "${pageData.title || 'Draggable List API文档'}",
        "description": "Draggable List组件API参考文档",
        "keywords": "API文档,拖拽列表,JavaScript组件,Vue组件",
        "author": {
          "@type": "Person",
          "name": "gengyu"
        }
      }
      </script>`;
    }
    
    if (structuredData) {
      return html.replace('</head>', `${structuredData}</head>`);
    }
    return html;
  },
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