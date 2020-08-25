const nav = require('./nav.js');
module.exports = {
	title: '月晴星飞博客',
	description: '前端技术、移动端技术、后端技术、运维技术等相关笔记及项目示例。JavaScript,js,ES6,TypeScript,vue,react,webchat,python,css3,html5,Node,devops等技术文章。',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ['meta', { name: 'keywords', content: '前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown'}],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'}],
    ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc'}],
    ['meta', { name: 'theme-color', content: '#11a8cd'}]
  ],
	markdown: {
		lineNumbers: true
	},
  base: '/blog/',
  theme: 'vdoing',
	themeConfig: {
		nav,
    sidebar: 'structuring',
    logo: '/img/logo.png',
    repo: 'ywzhou123/ywzhou-blog',
    displayAllHeaders: false,
    sidebarDepth: 2,
    lastUpdated: '上次更新',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑',
    searchMaxSuggestions: 10,
    bodyBgImg: [
      '/img/20200507175828.jpeg',
      '/img/20200507175845.jpeg',
      '/img/20200507175846.jpeg'
    ],
    author: {
      name: '月晴星飞',
      link: 'https://github.com/ywzhou123'
    },
    blogger: {
      avatar: '/img/avator.jpg',
      name: '月晴星飞',
      slogan: '一个不安分的电脑爱好者'
    },
    social:{
      icons: [
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:8134599@qq.com'
        },
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/ywzhou123'
        },
        {
          iconClass: 'icon-erji',
          title: '听音乐',
          link: 'https://music.163.com/#/playlist?id=755597173'
        }
      ]
    },
    footer: {
      createYear: 2020,
      copyrightInfo: 'power by 月晴星飞'
    }
	},
  plugins: [
    [require('./plugins/love-me'), 
      {
        color: '#11a8cd',
        excludeClassName: 'theme-vdoing-content'
      }
    ],
    ['thirdparty-search', { // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
      thirdparty: [ // 可选，默认 []
        {
          title: '在MDN中搜索',
          frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', 
          behindUrl: ''
        },
        {
          title: '在Runoob中搜索',
          frontUrl: 'https://www.runoob.com/?s=',
        },
        {
          title: '在Vue API中搜索',
          frontUrl: 'https://cn.vuejs.org/v2/api/#',
        },
        {
          title: '在Bing中搜索',
          frontUrl: 'https://cn.bing.com/search?q='
        },
        {
          title: '通过百度搜索本站的',
          frontUrl: 'https://www.baidu.com/s?wd=ywzhou123%gitee.io%20'
        }
      ]
    }],
    ['one-click-copy', {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
      copyMessage: '复制成功',
      duration: 1000,
      showInMobile: false
    }],
    ['demo-block', {
      settings: {
        jsLib: [
          'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'
        ],
        jsfiddle: false,
        codepen: true,
        horizontal: false
      }
    }],
    [
      'vuepress-plugin-zooming',
      {
        selector:'.theme-vdoing-content img:not(.no-zoom)',
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        },
      },
    ],
    'vuepress-plugin-baidu-autopush',
    [
      'vuepress-plugin-baidu-tongji',
      {
        hm: '028f299ef1f8d727a111352fb0e6e590'
      }
    ],
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        options: {
          el: '#valine-vuepress-comment',
          appId: 'YA2WYHPMXQdEAVaM1kpLwGYh-gzGzoHsz',
          appKey: 'Lw8DxQbBcfgYGtAFrU8kfpQA'
        }
      }
      // {
      //   choosen: 'gitalk', 
      //   options: {
      //     clientID: 'a6e1355287947096b88b',
      //     clientSecret: 'f0e77d070fabfcd5af95bebb82b2d574d7248d71',
      //     repo: 'ywzhou-blog',
      //     owner: 'ywzhou123',
      //     admin: ['ywzhou123'],
      //     // distractionFreeMode: true,
      //     pagerDirection: 'last',
      //     id: "<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>",
      //     title: "「评论」<%- frontmatter.title %>",
      //     labels: ["Gitalk", "Comment"],
      //     body:"页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>"
      //   }
      // }
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment')
          return moment(timestamp).format('YYYY-MM-DD HH:MM:SS');
        }
      }
    ]
  ]
}

