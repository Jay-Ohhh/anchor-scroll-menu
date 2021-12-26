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

const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ height: 300, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ height: 300, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ height: 300, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}1`,
    content: <div style={{ height: 300, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ height: 300, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} />
  </div>
);
```

### placement top

```tsx
import React from 'react';
import { AnchorMenu } from 'anchor-scroll-menu';

const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} placement="top" hideTitle />
  </div>
);
```

### activeKey

```tsx
import React from 'react';
import { AnchorMenu } from 'anchor-scroll-menu';

const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ width: 500, height: 300, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} activeKey={`lightcoral${id}`} />
  </div>
);
```

<API></API>
