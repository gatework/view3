# view3

view3 是一个面向 Vue 3 的前端组件库，当前项目已升级为 Vite 构建，示例应用使用 Vue 3、vue-router 和 Pinia。样式层已迁移到 Sass module 体系，避免继续依赖即将废弃的 Sass `@import`。

## 技术栈

- Vue 3.5+
- Vite 8
- vue-router 5
- Pinia 3
- Sass module (`@use` / `@forward`)
- ESLint 10
- Stylelint 17

## 环境要求

- Node.js 20+
- Yarn 1.22+

## 安装依赖

```bash
yarn install
```

## 本地开发

启动示例应用：

```bash
yarn serve
```

默认访问地址：

```text
http://127.0.0.1:5173/
```

## 构建

构建示例应用：

```bash
yarn build:prod
```

构建组件库产物：

```bash
yarn build:lib
```

库入口产物输出到：

```text
dist/view3.mjs
```

## 代码检查

检查 JavaScript / Vue：

```bash
./node_modules/.bin/eslint "src/**/*.{js,vue}" "examples/**/*.{js,vue}" --no-fix --quiet
```

检查 Sass / CSS：

```bash
./node_modules/.bin/stylelint "src/**/*.{scss,css}" --allow-empty-input --formatter compact
```

## 在 Vue 3 项目中使用

```js
import { createApp } from 'vue'
import View3 from 'view3'
import 'view3/src/styles/index.scss'

import App from './App.vue'

const app = createApp(App)

app.use(View3)
app.mount('#app')
```

也可以按需导入组件：

```js
import { VButton, Modal, Transfer } from 'view3'
```

## Rails 本地联调

在 Rails 项目中推荐使用本地 link 依赖：

```json
{
  "dependencies": {
    "view3": "link:/Users/crate/Works/node/view3"
  }
}
```

更新依赖后执行：

```bash
yarn install --ignore-scripts
```

确认链接：

```bash
realpath node_modules/view3
```

应该指向：

```text
/Users/crate/Works/node/view3
```

Rails 样式入口应使用 Sass module 写法，不再使用 `@import`：

```scss
@use 'view3/src/styles/core' as view3;
@use 'view3/src/styles/components/button';
@use 'view3/src/styles/components/modal';
```

## 发布到 GitHub

首次发布到新仓库时：

```bash
git remote add gatework git@github.com:gatework/view3.git
git push -u gatework master
```

如果仓库尚未创建，需要先通过 GitHub API、GitHub CLI 或网页创建 `gatework/view3`。

## 当前维护约定

- 拒绝继续引入 Vue 2 旧范式，例如 `.sync`、`.native`、`$children`、`$destroy()`、旧 `input` v-model 事件。
- 组件 v-model 使用 `modelValue` / `update:modelValue`。
- 样式使用 `@use` / `@forward`。
- 动态挂载组件必须在关闭时正确 `unmount`。
- Rails 消费侧优先使用本地 link，避免旧 npm/git 依赖覆盖本地开发版本。
