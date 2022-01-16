// todo：AnchorMenu用到了useRef、createRef，需要手动mock ref，并mock 元素的getBoundingClientRect、scrollTop等属性或方法，而且滚动时是动态的，不好模拟，即使模拟也是写死的，先不做了。
import React from 'react';
import { create, act } from 'react-test-renderer';
import AnchorMenu, { AnchorScrollProps } from '@/AnchorMenu/index';

const commonStyle = { height: 300 };
const menuList = [
  {
    name: 'antiquewhite',
    key: `antiquewhite`,
    content: <div style={{ ...commonStyle, backgroundColor: 'antiquewhite' }} />,
  },
  {
    name: 'skyblue',
    key: `skyblue`,
    content: <div style={{ ...commonStyle, backgroundColor: 'skyblue' }} />,
  },
  {
    name: 'pink',
    key: `pink`,
    content: <div style={{ ...commonStyle, backgroundColor: 'pink' }} />,
  },
  {
    name: 'orange',
    key: `orange`,
    content: <div style={{ ...commonStyle, backgroundColor: 'orange' }} />,
  },
  {
    name: 'lightcoral',
    key: `lightcoral`,
    content: <div style={{ ...commonStyle, backgroundColor: 'lightcoral' }} />,
  },
];

describe('Test AnchorMenu', () => {
  test('Renderer AnchorMenu', async () => {
    const props: AnchorScrollProps = {
      menuList,
      menuStyle: { fontSize: 20 },
      placement: 'left',
      scrollDirection: 'horizontal',
      region: [-10, 10],
      easing: 'easeInOutCubic',
      duration: 600,
      onMenuClick: (key) => {
        console.log(key);
      },
      onReach: (key) => {
        console.log(key);
      },
    };
    let component;
    // act保证所有由组件渲染、用户交互以及数据获取产生的更新全部在dom实现,否则测试不到useEffect等
    act(() => {
      component = create(
        <div style={{ width: '100%', height: 600 }}>
          <AnchorMenu {...props} />
        </div>,
      );
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    act(() => {
      // 更新属性
      component.update(
        <div style={{ width: '100%', height: 600 }}>
          <AnchorMenu
            {...props}
            placement="top"
            scrollDirection="vertical"
            hideTitle={true}
            activeKey="pink"
          />
        </div>,
      );
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
