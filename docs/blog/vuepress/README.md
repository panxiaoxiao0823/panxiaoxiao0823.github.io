# vuepress

<ClientOnly><click></click></ClientOnly>

## 什么是vuepress
VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。  

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## 安装使用
```
# 全局安装vuepress
npm install -g vuepress

# 新建一个 vuepress 文件夹
mkdir vuepress
cd vuepress

# 初始化项目
npm init -y

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 设置package.json，在 package.json 里加一些脚本:
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 运行项目
npm run docs:dev

# 在docs目录下创建.vuepress目录
cd docs
mkdir .vuepress

# 在.vuepress目录下创建config.js
cd .vuepress
touch config.js
```
项目结构如下：  
<img style='width:250px;' :src="$withBase('/img/structure.png')" alt="foo">

### config.js
一个config.js的主要配置包括网站的标题、描述等基本信息，以及主题的配置。
```
module.exports = {
    title: '阿伮',
    base: "/blog-VuePress/",
    description: '使用VuePress写的个人博客，仅供学习使用',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        displayAllHeaders: true, // 默认值：false
        activeHeaderLinks: true,
        logo: '/img/index.jpeg',
        nav: [
            { text: '首页', link: '/' },
            { text: '查看源码', link: 'https://github.com/panxiaoxiao0823/blog-VuePress' },
        ],
        sidebar: {
            '/blog/': [
                {
                    title: "简介",
                    collapsable: false,
                    children: [
                        ''
                    ]
                },
                {
                    title: "typescript",
                    collapsable: true,
                    children: [
                        'typescript/',
                        'typescript/basicType',
                        'typescript/varDeclare',
                        'typescript/interface',
                        'typescript/declareFile',
                        'typescript/advance'
                    ]
                },
                {
                    title: "vuepress",
                    collapsable: true,
                    children: [
                        'vuepress/'
                    ]
                }
            ]
        }
    },
    plugins: [['@vuepress/active-header-links'], ['go-top']]

}
```



```
# 编译项目
npm run docs:build
```
默认情况下，文件将会被生成在 .vuepress/dist，当然，你也可以通过 .vuepress/config.js 中的 dest 字段来修改，生成的文件可以部署到任意的静态文件服务器上

## vue 爬坑记录
### 1. 使用插件时候写法没有问题，但是网页没有加载出插件，并且终端报错
`warning An error was encountered in plugin "@vuepress/back-to-top"`
::: tip 解决办法：
由于之前是全局安装的vuepress，猜测是全局环境有点问题，换成项目下安装就可以了  
`npm install -D vuepress`
:::