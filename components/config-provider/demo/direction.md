## zh-CN

这里列出了支持 `rtl` 方向的组件，您可以在演示中切换方向。

## en-US

Components which support rtl direction are listed here, you can toggle the direction in the demo.

```css
.button-demo .g-btn,
.button-demo .g-btn-group {
  margin-inline-end: 8px;
  margin-bottom: 12px;
}
.button-demo .g-btn-group > .g-btn,
.button-demo .g-btn-group > span > .g-btn {
  margin-inline-end: 0;
  margin-inline-start: 0;
}

.head-example {
  display: inline-block;
  width: 42px;
  height: 42px;
  vertical-align: middle;
  background: #eee;
  border-radius: 4px;
}

.g-badge:not(.g-badge-not-a-wrapper) {
  margin-inline-end: 20px;
}

.g-badge-rtl:not(.g-badge-not-a-wrapper) {
  margin-inline-end: 0;
  margin-inline-start: 20px;
}
```
