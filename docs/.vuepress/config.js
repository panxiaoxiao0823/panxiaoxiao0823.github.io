module.exports = {
    title: '阿伮',
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
                },
                {
                    title: "vue",
                    collapsable: true,
                    children: [
                        'vue/'
                    ]
                },
                {
                    title: "vue-typescript-admin",
                    collapsable: true,
                    children: [
                        'vue-typescript-admin/'
                    ]
                }
                // {
                //     title: "healthlife",
                //     collapsable: true,
                //     children: [
                //         'healthlife/'
                //     ]
                // },
            ]
        }
    },
    plugins: [['@vuepress/active-header-links'], ['go-top']]

}