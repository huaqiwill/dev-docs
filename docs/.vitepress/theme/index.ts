// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// .vitepress/theme/index.ts

import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式

// if (inBrowser) {
//       NProgress.configure({ showSpinner: false })
//       router.onBeforeRouteChange = () => {
//         NProgress.start() // 开始进度条
//       }
//       router.onAfterRouteChanged = () => {
//          busuanzi.fetch()
//          NProgress.done() // 停止进度条
//       }
// }

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
