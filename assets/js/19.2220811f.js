(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{976:function(e,s,n){"use strict";n.r(s);var t=n(23),a=Object(t.a)({},(function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"vuepress"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vuepress"}},[e._v("#")]),e._v(" vuepress")]),e._v(" "),n("ClientOnly",[n("click")],1),e._v(" "),n("h2",{attrs:{id:"什么是vuepress"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#什么是vuepress"}},[e._v("#")]),e._v(" 什么是vuepress")]),e._v(" "),n("p",[e._v("VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。")]),e._v(" "),n("p",[e._v("每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。")]),e._v(" "),n("h2",{attrs:{id:"安装使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装使用"}},[e._v("#")]),e._v(" 安装使用")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('# 全局安装vuepress\nnpm install -g vuepress\n\n# 新建一个 vuepress 文件夹\nmkdir vuepress\ncd vuepress\n\n# 初始化项目\nnpm init -y\n\n# 新建一个 docs 文件夹\nmkdir docs\n\n# 新建一个 markdown 文件\necho \'# Hello VuePress!\' > docs/README.md\n\n# 设置package.json，在 package.json 里加一些脚本:\n{\n  "scripts": {\n    "docs:dev": "vuepress dev docs",\n    "docs:build": "vuepress build docs"\n  }\n}\n\n# 运行项目\nnpm run docs:dev\n\n# 在docs目录下创建.vuepress目录\ncd docs\nmkdir .vuepress\n\n# 在.vuepress目录下创建config.js\ncd .vuepress\ntouch config.js\n')])])]),n("p",[e._v("项目结构如下："),n("br"),e._v(" "),n("img",{staticStyle:{width:"250px"},attrs:{src:e.$withBase("/img/structure.png"),alt:"foo"}})]),e._v(" "),n("h3",{attrs:{id:"config-js"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#config-js"}},[e._v("#")]),e._v(" config.js")]),e._v(" "),n("p",[e._v("一个config.js的主要配置包括网站的标题、描述等基本信息，以及主题的配置。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("module.exports = {\n    title: '阿伮',\n    base: \"/blog-VuePress/\",\n    description: '使用VuePress写的个人博客，仅供学习使用',\n    head: [\n        ['link', { rel: 'icon', href: '/img/logo.ico' }]\n    ],\n    themeConfig: {\n        lastUpdated: 'Last Updated',\n        displayAllHeaders: true, // 默认值：false\n        activeHeaderLinks: true,\n        logo: '/img/index.jpeg',\n        nav: [\n            { text: '首页', link: '/' },\n            { text: '查看源码', link: 'https://github.com/panxiaoxiao0823/blog-VuePress' },\n        ],\n        sidebar: {\n            '/blog/': [\n                {\n                    title: \"简介\",\n                    collapsable: false,\n                    children: [\n                        ''\n                    ]\n                },\n                {\n                    title: \"typescript\",\n                    collapsable: true,\n                    children: [\n                        'typescript/',\n                        'typescript/basicType',\n                        'typescript/varDeclare',\n                        'typescript/interface',\n                        'typescript/declareFile',\n                        'typescript/advance'\n                    ]\n                },\n                {\n                    title: \"vuepress\",\n                    collapsable: true,\n                    children: [\n                        'vuepress/'\n                    ]\n                }\n            ]\n        }\n    },\n    plugins: [['@vuepress/active-header-links'], ['go-top']]\n\n}\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("# 编译项目\nnpm run docs:build\n")])])]),n("p",[e._v("默认情况下，文件将会被生成在 .vuepress/dist，当然，你也可以通过 .vuepress/config.js 中的 dest 字段来修改，生成的文件可以部署到任意的静态文件服务器上")]),e._v(" "),n("h2",{attrs:{id:"vue-爬坑记录"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue-爬坑记录"}},[e._v("#")]),e._v(" vue 爬坑记录")]),e._v(" "),n("h3",{attrs:{id:"_1-使用插件时候写法没有问题，但是网页没有加载出插件，并且终端报错"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用插件时候写法没有问题，但是网页没有加载出插件，并且终端报错"}},[e._v("#")]),e._v(" 1. 使用插件时候写法没有问题，但是网页没有加载出插件，并且终端报错")]),e._v(" "),n("p",[n("code",[e._v('warning An error was encountered in plugin "@vuepress/back-to-top"')])]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("解决办法：")]),e._v(" "),n("p",[e._v("\b由于之前是全局安装的vuepress，猜测是全局环境有点问题，换成项目下安装就可以了"),n("br"),e._v(" "),n("code",[e._v("npm install -D vuepress")])])])],1)}),[],!1,null,null,null);s.default=a.exports}}]);