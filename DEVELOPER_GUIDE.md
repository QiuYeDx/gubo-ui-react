# 开发者指引手册

> 本文档面向参与本项目开发的工程师，帮助你快速上手项目的开发、构建与调试。

## 项目概览

本项目是基于 [Ant Design](https://ant.design) 的 React 组件库（v6.x），使用 TypeScript 编写，采用 CSS-in-JS 架构（基于 `@ant-design/cssinjs`），支持 Design Token 主题系统、暗色模式、RTL 布局、SSR 及 150+ 语言国际化。

- **包名**：`antd`
- **版本**：6.3.3
- **最低 React 版本**：React 18+
- **文档站框架**：[Dumi](https://d.umijs.org/)
- **构建工具**：antd-tools（es/lib）+ father（UMD）

---

## 项目结构

```
├── components/               # 组件源码（77+ 组件）
│   ├── button/               # 单个组件目录（以 Button 为例）
│   │   ├── Button.tsx        #   主组件实现
│   │   ├── demo/             #   演示代码（*.tsx + *.md）
│   │   ├── style/            #   CSS-in-JS 样式（index.ts / token.ts）
│   │   ├── __tests__/        #   单元测试
│   │   ├── index.en-US.md    #   英文 API 文档
│   │   ├── index.zh-CN.md    #   中文 API 文档
│   │   └── index.tsx         #   导出入口
│   ├── _util/                # 共享工具函数库
│   ├── config-provider/      # 全局配置（主题、国际化、尺寸等）
│   ├── theme/                # Design Token 主题系统
│   │   ├── themes/
│   │   │   ├── seed.ts       #   种子 Token（全局主题色等基础值）
│   │   │   ├── default/      #   默认主题算法
│   │   │   ├── dark/         #   暗色主题算法
│   │   │   ├── compact/      #   紧凑主题算法
│   │   │   └── shared/       #   共享 Token 生成逻辑
│   │   ├── interface/        #   Token 类型定义
│   │   ├── util/             #   主题工具函数
│   │   ├── context.ts        #   主题上下文
│   │   ├── useToken.ts       #   useToken Hook
│   │   ├── getDesignToken.ts #   获取完整 Design Token
│   │   └── index.tsx         #   主题模块入口
│   ├── locale/               # 国际化文本（150+ 语言）
│   └── index.ts              # 所有组件的统一导出
├── docs/                     # 文档站内容
│   ├── blog/                 #   技术博客（36+ 篇）
│   ├── react/                #   React 使用文档
│   └── spec/                 #   设计规范文档
├── tests/                    # 测试工具和共享测试
├── scripts/                  # 构建/发布脚本
├── .dumi/                    # Dumi 文档站配置与自定义
│   ├── theme/                #   文档站主题
│   ├── pages/                #   自定义页面
│   └── hooks/                #   文档站 Hooks
├── .dumirc.ts                # Dumi 主配置文件
├── .fatherrc.ts              # Father 构建配置（UMD）
├── package.json              # 项目依赖与脚本
├── tsconfig.json             # TypeScript 配置
├── eslint.config.mjs         # ESLint 配置
├── biome.json                # Biome Lint/Format 配置
├── .jest.js                  # Jest 单元测试配置
├── .jest.node.js             # Jest Node 测试配置
├── .jest.image.js            # Jest 图片快照配置
└── CHANGELOG.*.md            # 更新日志（中英文）
```

---

## 组件列表

项目包含 77+ 组件，涵盖以下类别：

| 类别 | 组件 |
| --- | --- |
| 通用 | Button, Icon, Typography |
| 布局 | Col, Row, Divider, Flex, Grid, Layout, Space, Splitter |
| 导航 | Affix, Anchor, BackTop, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs |
| 数据录入 | AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload |
| 数据展示 | Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Masonry, Popover, QRCode, Segmented, Statistic, Table, Tag, Timeline, Tooltip, Tour, Tree |
| 反馈 | Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin |
| 其他 | App, ConfigProvider, FloatButton, Watermark |

---

## 快速开始

### 环境准备

- Node.js >= 18
- pnpm（推荐）

### 安装依赖

```bash
pnpm install
```

### 启动文档站（开发模式）

```bash
pnpm start
# 访问 http://localhost:8001
```

### 运行测试

```bash
# 单元测试
pnpm test

# Node 环境测试
pnpm test:node

# 图片快照测试
pnpm test:image

# 文档站测试
pnpm test:site
```

### 构建

```bash
# 完整构建（es + lib + dist）
pnpm build

# 仅编译（es + lib）
pnpm compile

# 仅构建 UMD
pnpm dist

# 构建文档站
pnpm site
```

### 代码检查与格式化

```bash
# 全量 Lint
pnpm lint

# ESLint
pnpm lint:script

# Biome Lint
pnpm lint:biome

# TypeScript 类型检查
pnpm tsc

# 代码格式化
pnpm format      # Biome
pnpm prettier     # Prettier
```

---

## 构建产物

| 产物目录 | 格式 | 入口               | 说明          |
| -------- | ---- | ------------------ | ------------- |
| `es/`    | ESM  | `es/index.js`      | `module` 字段 |
| `lib/`   | CJS  | `lib/index.js`     | `main` 字段   |
| `dist/`  | UMD  | `dist/antd.min.js` | `unpkg` 字段  |

---

## 主题系统

### 架构

主题系统基于三层 Token 设计：

```
Seed Token（种子）  →  Map Token（梯度）  →  Alias Token（别名）
```

1. **Seed Token**：最基础的设计变量（如 `colorPrimary`、`borderRadius`、`fontSize`），定义在 `components/theme/themes/seed.ts`
2. **Map Token**：由 Seed Token 经算法派生的梯度值（如 `colorPrimaryHover`、`colorPrimaryBg`）
3. **Alias Token**：面向组件使用的语义化别名（如 `colorBgContainer`、`colorText`）

### 主题算法

| 算法     | 目录                               | 说明         |
| -------- | ---------------------------------- | ------------ |
| 默认主题 | `components/theme/themes/default/` | 标准亮色主题 |
| 暗色主题 | `components/theme/themes/dark/`    | 暗色模式     |
| 紧凑主题 | `components/theme/themes/compact/` | 紧凑布局     |

### 修改全局主题色

全局主题色定义在种子 Token 文件中：

**文件**：`components/theme/themes/seed.ts`

```typescript
const seedToken: SeedToken = {
  colorPrimary: '#5D2DCD', // 全局主题色
  colorInfo: '#5D2DCD', // 信息色（通常与主题色一致）
  // ...
};
```

由 `colorPrimary` 会自动派生出以下颜色：

- `colorPrimaryBg` - 主色背景
- `colorPrimaryBgHover` - 主色背景悬浮
- `colorPrimaryBorder` - 主色边框
- `colorPrimaryBorderHover` - 主色边框悬浮
- `colorPrimaryHover` - 主色悬浮
- `colorPrimaryActive` - 主色激活
- `colorPrimaryTextHover` / `colorPrimaryText` / `colorPrimaryTextActive`

### 运行时覆盖主题

使用者可通过 `ConfigProvider` 在运行时覆盖主题，无需修改源码：

```tsx
import { ConfigProvider } from 'antd';

<ConfigProvider theme={{ token: { colorPrimary: '#5D2DCD' } }}>
  <App />
</ConfigProvider>;
```

---

## 组件开发规范

### 目录结构

每个组件应包含以下文件：

```
components/my-component/
├── MyComponent.tsx        # 主组件实现
├── index.tsx              # 导出入口
├── index.en-US.md         # 英文 API 文档
├── index.zh-CN.md         # 中文 API 文档
├── style/
│   ├── index.ts           # 样式入口（CSS-in-JS）
│   └── token.ts           # 组件级 Token 定义
├── demo/
│   ├── basic.tsx          # 基础演示
│   └── basic.md           # 演示说明
└── __tests__/
    ├── index.test.tsx     # 单元测试
    └── demo.test.tsx      # Demo 测试
```

### API 文档格式

API 表格按字母排序，格式如下：

| 参数     | 说明     | 类型                   | 默认值    | 版本 |
| -------- | -------- | ---------------------- | --------- | ---- |
| disabled | 是否禁用 | boolean                | false     | -    |
| type     | 类型     | `primary` \| `default` | `default` | -    |

- 字符串默认值使用反引号
- 布尔/数字默认值直接书写
- 无默认值填 `-`
- 新增属性需标注版本号

### 国际化

- 语言文件位于 `components/locale/`
- 添加/修改文本时，需同步更新所有语言文件
- 类型定义入口：`components/locale/index.tsx`

---

## 文档站

### 技术栈

- **Dumi**：文档站框架
- **SSR**：生产环境使用 Mako 构建
- **多语言**：en-US / zh-CN

### 配置

- 主配置：`.dumirc.ts`
- 文档目录：`docs/`
- 组件文档：`components/*/index.{en-US,zh-CN}.md`
- 自定义主题：`.dumi/theme/`
- 自定义页面：`.dumi/pages/`

### 启动

```bash
pnpm start
# → http://localhost:8001
```

---

## 测试策略

| 类型      | 配置文件         | 命令              | 说明               |
| --------- | ---------------- | ----------------- | ------------------ |
| 单元测试  | `.jest.js`       | `pnpm test`       | 组件逻辑与渲染测试 |
| Node 测试 | `.jest.node.js`  | `pnpm test:node`  | 非 DOM 环境测试    |
| 图片快照  | `.jest.image.js` | `pnpm test:image` | 视觉回归测试       |
| 文档站    | `.jest.site.js`  | `pnpm test:site`  | 文档站功能测试     |

### 运行特定组件测试

```bash
npx jest components/button --no-cache
```

---

## 工具链总览

| 工具        | 用途          | 配置文件                |
| ----------- | ------------- | ----------------------- |
| TypeScript  | 类型系统      | `tsconfig.json`         |
| ESLint      | 代码检查      | `eslint.config.mjs`     |
| Biome       | Lint + Format | `biome.json`            |
| Prettier    | 代码格式化    | `.prettierrc`           |
| Jest        | 单元测试      | `.jest.js`              |
| Husky       | Git Hooks     | `.husky/`               |
| lint-staged | 暂存区检查    | `.lintstagedrc.json`    |
| Dumi        | 文档站        | `.dumirc.ts`            |
| father      | UMD 构建      | `.fatherrc.ts`          |
| antd-tools  | 编译工具链    | `.antd-tools.config.js` |

---

## 常用脚本速查

| 命令                   | 说明                |
| ---------------------- | ------------------- |
| `pnpm start`           | 启动文档站开发服务  |
| `pnpm build`           | 完整构建            |
| `pnpm compile`         | 编译 es/lib         |
| `pnpm test`            | 运行单元测试        |
| `pnpm lint`            | 全量代码检查        |
| `pnpm tsc`             | TypeScript 类型检查 |
| `pnpm format`          | Biome 格式化        |
| `pnpm prettier`        | Prettier 格式化     |
| `pnpm site`            | 构建文档站          |
| `pnpm clean`           | 清理构建产物        |
| `pnpm token:meta`      | 生成 Token 元数据   |
| `pnpm token:statistic` | Token 统计          |
| `pnpm version`         | 生成版本信息        |

---

## Git 工作流

### 分支命名

| 类型     | 格式            | 示例                         |
| -------- | --------------- | ---------------------------- |
| 功能开发 | `feat/描述`     | `feat/add-masonry-component` |
| Bug 修复 | `fix/描述`      | `fix/button-hover-style`     |
| 文档更新 | `docs/描述`     | `docs/update-theme-guide`    |
| 代码重构 | `refactor/描述` | `refactor/theme-token`       |

### 分支策略

- 新特性 → 基于 `feature` 分支开发，PR 目标为 `feature`
- 其他改动 → 提交至 `master`

### PR 规范

- 标题使用英文：`类型: 简短描述`
- 必须使用 PR 模板（`.github/PULL_REQUEST_TEMPLATE.md`）
