---
nav:
  title: 组件
  path: /components
group:
  path: /components
  title: 组件
---

## AnchorMenu

### 基本用法

```tsx
import React from 'react';
import { AnchorMenu } from 'anchor-scroll-menu';

const menuList = [
  {
    name: 'antiquewhite',
    key: 'antiquewhite',
    content: <div style={{ height: 300, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: 'skyblue',
    content: <div style={{ height: 300, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: 'pink',
    content: <div style={{ height: 300, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: 'orange',
    content: <div style={{ height: 300, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: 'lightcoral',
    content: <div style={{ height: 300, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} />
  </div>
);
```

<API></API>
