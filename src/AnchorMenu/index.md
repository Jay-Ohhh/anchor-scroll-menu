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

const commonStyle = { height: 300 };
const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}1`,
    content: <div style={{ ...commonStyle, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'lightcoral' }} />,
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

const commonStyle = { height: 300 };
const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} placement="top" />
  </div>
);
```

### scrollDirection horizontal

```tsx
import React from 'react';
import { AnchorMenu } from 'anchor-scroll-menu';

const commonStyle = { width: 500, height: 300 };
const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} placement="top" scrollDirection="horizontal" hideTitle />
  </div>
);
```

### activeKey

```tsx
import React from 'react';
import { AnchorMenu } from 'anchor-scroll-menu';

const commonStyle = { height: 300 };
const id = +new Date();
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral${id}`,
    content: <div style={{ ...commonStyle, backgroundColor: 'lightcoral' }} />,
  },
];

export default () => (
  <div style={{ width: '100%', height: 600 }}>
    <AnchorMenu menuList={menuList} activeKey={`lightcoral${id}`} />
  </div>
);
```

<API></API>
