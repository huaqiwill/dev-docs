import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';
import timeline from "vitepress-markdown-timeline";


const sidebar = [
    {
        text: 'C语言',
        collapsed: false,
        items: []
    }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "黎明怀羽的个人博客",
    description: "黎明怀羽的个人博客",
    markdown: {
        //行号显示
        lineNumbers: true,

        //时间线
        config: (md) => {
            md.use(timeline);
        },
    },
    themeConfig: {

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/' },
            { text: '示例', link: '/markdown-examples' }
        ],

        sidebar: generateSidebar({
            documentRootPath: 'docs',
            useTitleFromFileHeading: true,
            hyphenToSpace: true,
            excludePattern: ['.vitepress']
        }),

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
