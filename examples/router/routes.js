export const routes = [
  {
    path: '/split',
    component: () => import('../routers/split-page.vue'),
    meta: { label: 'Split' }
  },
  {
    path: '/layout',
    component: () => import('../routers/layout-page.vue'),
    meta: { label: 'Layout' }
  },
  {
    path: '/affix',
    component: () => import('../routers/affix-page.vue'),
    meta: { label: 'Affix' }
  },
  {
    path: '/anchor',
    component: () => import('../routers/anchor-page.vue'),
    meta: { label: 'Anchor' }
  },
  {
    path: '/grid',
    component: () => import('../routers/grid-page.vue'),
    meta: { label: 'Grid' }
  },
  {
    path: '/button',
    component: () => import('../routers/button-page.vue'),
    meta: { label: 'Button' }
  },
  {
    path: '/input',
    component: () => import('../routers/input-page.vue'),
    meta: { label: 'Input' }
  },
  {
    path: '/radio',
    component: () => import('../routers/radio-page.vue'),
    meta: { label: 'Radio' }
  },
  {
    path: '/checkbox',
    component: () => import('../routers/checkbox-page.vue'),
    meta: { label: 'Checkbox' }
  },
  {
    path: '/steps',
    component: () => import('../routers/steps-page.vue'),
    meta: { label: 'Steps' }
  },
  {
    path: '/timeline',
    component: () => import('../routers/timeline-page.vue'),
    meta: { label: 'Timeline' }
  },
  {
    path: '/switch',
    component: () => import('../routers/switch-page.vue'),
    meta: { label: 'Switch' }
  },
  {
    path: '/alert',
    component: () => import('../routers/alert-page.vue'),
    meta: { label: 'Alert' }
  },
  {
    path: '/badge',
    component: () => import('../routers/badge-page.vue'),
    meta: { label: 'Badge' }
  },
  {
    path: '/tag',
    component: () => import('../routers/tag-page.vue'),
    meta: { label: 'Tag' }
  },
  {
    path: '/input-number',
    component: () => import('../routers/input-number-page.vue'),
    meta: { label: 'InputNumber' }
  },
  {
    path: '/upload',
    component: () => import('../routers/upload-page.vue'),
    meta: { label: 'Upload' }
  },
  {
    path: '/progress',
    component: () => import('../routers/progress-page.vue'),
    meta: { label: 'Progress' }
  },
  {
    path: '/collapse',
    component: () => import('../routers/collapse-page.vue'),
    meta: { label: 'Collapse' }
  },
  {
    path: '/carousel',
    component: () => import('../routers/carousel-page.vue'),
    meta: { label: 'Carousel' }
  },
  {
    path: '/card',
    component: () => import('../routers/card-page.vue'),
    meta: { label: 'Card' }
  },
  {
    path: '/tree',
    component: () => import('../routers/tree-page.vue'),
    meta: { label: 'Tree' }
  },
  {
    path: '/rate',
    component: () => import('../routers/rate-page.vue'),
    meta: { label: 'Rate' }
  },
  {
    path: '/circle',
    component: () => import('../routers/circle-page.vue'),
    meta: { label: 'Circle' }
  },
  {
    path: '/tabs',
    component: () => import('../routers/tabs-page.vue'),
    meta: { label: 'Tabs' }
  },
  {
    path: '/tooltip',
    component: () => import('../routers/tooltip-page.vue'),
    meta: { label: 'Tooltip' }
  },
  {
    path: '/poptip',
    component: () => import('../routers/poptip-page.vue'),
    meta: { label: 'Poptip' }
  },
  {
    path: '/slider',
    component: () => import('../routers/slider-page.vue'),
    meta: { label: 'Slider' }
  },
  {
    path: '/dropdown',
    component: () => import('../routers/dropdown-page.vue'),
    meta: { label: 'Dropdown' }
  },
  {
    path: '/breadcrumb',
    component: () => import('../routers/breadcrumb-page.vue'),
    meta: { label: 'Breadcrumb' }
  },
  {
    path: '/menu',
    component: () => import('../routers/menu-page.vue'),
    meta: { label: 'Menu' }
  },
  {
    path: '/spin',
    component: () => import('../routers/spin-page.vue'),
    meta: { label: 'Spin' }
  },
  {
    path: '/cascader',
    component: () => import('../routers/cascader-page.vue'),
    meta: { label: 'Cascader' }
  },
  {
    path: '/select',
    component: () => import('../routers/select-page.vue'),
    meta: { label: 'Select' }
  },
  {
    path: '/backtop',
    component: () => import('../routers/back-top-page.vue'),
    meta: { label: 'BackTop' }
  },
  {
    path: '/page',
    component: () => import('../routers/page-page.vue'),
    meta: { label: 'Page' }
  },
  {
    path: '/transfer',
    component: () => import('../routers/transfer-page.vue'),
    meta: { label: 'Transfer' }
  },
  {
    path: '/date',
    component: () => import('../routers/date-page.vue'),
    meta: { label: 'Date' }
  },
  {
    path: '/form',
    component: () => import('../routers/form-page.vue'),
    meta: { label: 'Form' }
  },
  {
    path: '/table',
    component: () => import('../routers/table-page.vue'),
    meta: { label: 'Table' }
  },
  {
    path: '/loading-bar',
    component: () => import('../routers/loading-bar-page.vue'),
    meta: { label: 'LoadingBar' }
  },
  {
    path: '/modal',
    component: () => import('../routers/modal-page.vue'),
    meta: { label: 'Modal' }
  },
  {
    path: '/message',
    component: () => import('../routers/message-page.vue'),
    meta: { label: 'Message' }
  },
  {
    path: '/notice',
    component: () => import('../routers/notice-page.vue'),
    meta: { label: 'Notice' }
  },
  {
    path: '/avatar',
    component: () => import('../routers/avatar-page.vue'),
    meta: { label: 'Avatar' }
  },
  {
    path: '/color-picker',
    component: () => import('../routers/color-picker-page.vue'),
    meta: { label: 'ColorPicker' }
  },
  {
    path: '/auto-complete',
    component: () => import('../routers/auto-complete-page.vue'),
    meta: { label: 'AutoComplete' }
  },
  {
    path: '/scroll',
    component: () => import('../routers/scroll-page.vue'),
    meta: { label: 'Scroll' }
  },
  {
    path: '/divider',
    component: () => import('../routers/divider-page.vue'),
    meta: { label: 'Divider' }
  },
  {
    path: '/time',
    component: () => import('../routers/time-page.vue'),
    meta: { label: 'Time' }
  },
  {
    path: '/cell',
    component: () => import('../routers/cell-page.vue'),
    meta: { label: 'Cell' }
  },
  {
    path: '/drawer',
    component: () => import('../routers/drawer-page.vue'),
    meta: { label: 'Drawer' }
  },
  {
    path: '/icon',
    component: () => import('../routers/icon-page.vue'),
    meta: { label: 'Icon' }
  },
  {
    path: '/list',
    component: () => import('../routers/list-page.vue'),
    meta: { label: 'List' }
  }
]
