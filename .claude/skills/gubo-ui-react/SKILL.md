---
name: gubo-ui-react
description: >-
  Guide for using @guwave/ui-react React component library (based on Ant Design v6). Use when installing, configuring, or integrating @guwave/ui-react components in React projects. Crucial: verify .npmrc configuration for @guwave scope before installation. Triggers on: "@guwave/ui-react", "gubo-ui", "gubo ui", "gubo组件库", "ui-react", "guwave ui", "antd私有库", "Button", "Table", "Form", "ConfigProvider", "theme".
---

# @guwave/ui-react 使用指南

基于 Ant Design v6 的企业级 React 组件库，使用 TypeScript 编写，支持 Design Token 主题系统、暗色模式、RTL 布局及国际化。

- **包名**：`@guwave/ui-react`
- **最低 React 版本**：React 18+
- **样式方案**：CSS-in-JS（零 CSS 文件导入）

## 前提条件：.npmrc 配置

`@guwave/ui-react` 托管在私有仓库，安装前**必须**确保项目根目录下存在 `.npmrc` 文件，并正确配置 `@guwave` 作用域的仓库地址。

检查或创建 `.npmrc`，确保包含以下内容：

```ini
@guwave:registry=http://192.168.2.210:7001/
```

完整 `.npmrc` 示例：

```ini
registry=https://registry.npmmirror.com/

# 必须配置 @guwave 作用域指向私有仓库
@guwave:registry=http://192.168.2.210:7001/
```

## 安装

确认 `.npmrc` 配置正确后，执行安装命令：

**pnpm（推荐）：**

```bash
pnpm i @guwave/ui-react
```

**npm：**

```bash
npm i @guwave/ui-react
```

**yarn：**

```bash
yarn add @guwave/ui-react
```

### 安装失败排查

如果安装报错，尝试以下步骤：

1. 确认 `.npmrc` 中 `@guwave:registry` 配置正确
2. 确认能访问 `http://192.168.2.210:7001/`（需在内网环境）
3. 删除 `node_modules` 和锁文件后重试：

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 导入与使用

所有组件从 `@guwave/ui-react` 统一导入，支持 Tree Shaking：

```tsx
import { Button, ConfigProvider, Form, Input, Select, Table } from '@guwave/ui-react';
```

导入类型：

```tsx
import type { ButtonProps, FormInstance, TableProps } from '@guwave/ui-react';
```

### 基础示例

```tsx
import React from 'react';
import { Button, Space } from '@guwave/ui-react';

const App: React.FC = () => (
  <Space>
    <Button type="primary">主按钮</Button>
    <Button>默认按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <Button type="link">链接按钮</Button>
  </Space>
);

export default App;
```

### 暗色模式

```tsx
import { ConfigProvider, theme } from '@guwave/ui-react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 紧凑模式

```tsx
import { ConfigProvider, theme } from '@guwave/ui-react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.compactAlgorithm,
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 国际化

```tsx
import { ConfigProvider } from '@guwave/ui-react';
import zhCN from '@guwave/ui-react/locale/zh_CN';

const App: React.FC = () => (
  <ConfigProvider locale={zhCN}>
    <YourApp />
  </ConfigProvider>
);
```

## 组件列表

| 类别 | 组件 |
| --- | --- |
| 通用 | Button, Typography |
| 布局 | Col, Row, Divider, Flex, Grid, Layout, Space, Splitter |
| 导航 | Affix, Anchor, BackTop, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs |
| 数据录入 | AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload |
| 数据展示 | Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Masonry, Popover, QRCode, Segmented, Statistic, Table, Tag, Timeline, Tooltip, Tour, Tree |
| 反馈 | Alert, Drawer, message, Modal, notification, Popconfirm, Progress, Result, Skeleton, Spin |
| 其他 | App, ConfigProvider, FloatButton, Watermark |

### 组件导入速查

```tsx
// 通用
// 布局

// 导航

// 数据录入

// 数据展示

// 反馈

// 其他

// 主题
import {
  Affix,
  Alert,
  Anchor,
  App,
  AutoComplete,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Flex,
  FloatButton,
  Form,
  Grid,
  Image,
  Input,
  InputNumber,
  Layout,
  List,
  Masonry,
  Mentions,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  QRCode,
  Radio,
  Rate,
  Result,
  Row,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Splitter,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  theme,
  Timeline,
  TimePicker,
  Tooltip,
  Tour,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
  Watermark,
} from '@guwave/ui-react';
import type { GlobalToken, MappingAlgorithm, ThemeConfig } from '@guwave/ui-react';
```

## 常用组件示例

### Table 表格

```tsx
import { Table } from '@guwave/ui-react';
import type { TableColumnsType } from '@guwave/ui-react';

interface DataType {
  key: string;
  name: string;
  age: number;
}

const columns: TableColumnsType<DataType> = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
];

const data: DataType[] = [
  { key: '1', name: '张三', age: 32 },
  { key: '2', name: '李四', age: 28 },
];

const App = () => <Table columns={columns} dataSource={data} />;
```

### Form 表单

```tsx
import { Button, Form, Input } from '@guwave/ui-react';

const App = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('表单值:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
```

### Modal 弹窗

```tsx
import { useState } from 'react';
import { Button, Modal } from '@guwave/ui-react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <Modal title="标题" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
        <p>弹窗内容</p>
      </Modal>
    </>
  );
};
```

### message 全局提示

```tsx
import { Button, message } from '@guwave/ui-react';

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Button onClick={() => messageApi.success('操作成功')}>提示</Button>
    </>
  );
};
```

## 注意事项

- `message` 和 `notification` 是小写导出（非大写组件），推荐使用 Hooks 方式 `message.useMessage()` / `notification.useNotification()`
- `ConfigProvider` 建议包裹在应用最外层，统一管理主题、语言、尺寸等全局配置
- 所有日期相关组件（DatePicker、Calendar、TimePicker）默认使用 `dayjs`
- 组件库支持 Tree Shaking，按需导入不会引入多余代码
