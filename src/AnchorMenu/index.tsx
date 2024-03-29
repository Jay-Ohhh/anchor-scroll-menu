import React, { memo, useEffect, useState, useRef, useMemo, CSSProperties } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useScrollToElement from '../hooks/useScrollToElement';
import { getOffsetDistance } from '../utils';
import './index.less';

export interface AnchorScrollProps {
  /**
   * @description  菜单数据数组，key请确保是唯一的，由字母数字组成，且必须以字母开头
   * @default      []
   */
  menuList: { name: string; content: React.ReactNode; key: string }[];

  /**
   * @description  menu区域的style
   * @default
   */
  menuStyle?: CSSProperties;

  /**
   * @description  menu区域的位置
   * @default      'left'
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * @description  滚动方向
   * @default      'vertical'
   */
  scrollDirection?: 'vertical' | 'horizontal';

  /**
   * @description  手动滚动时，滚动内容跟父元素顶部距离的区间,滚动内容一到达该区间,对应菜单按钮高亮。如果鼠标滚动幅度过大时，菜单没有高亮，不妨将区间增大。
   * @default      [-20, 20]
   */
  region?: [number, number];

  /**
   * @description  缓动动画函数
   * @default      easeInOutCubic
   */
  easing?:
    | 'linear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic';

  /**
   * @description  用多少ms完成滚动动画，单位 ms
   * @default      300
   */
  duration?: number;

  /**
   * @description  隐藏内容块的title
   * @default      false
   */
  hideTitle?: boolean;

  /**
   * @description  当前激活的menu的key
   * @default
   */
  activeKey?: string;

  /**
   * @description  点击菜单的回调函数
   * @default
   */
  onMenuClick?: (key: string, index: number, activeKey: string) => void;
  /**
   * @description  点击菜单滚动到达目的地后的回调函数
   * @default
   */
  onReach?: (key: string, index: number) => void;
}

const AnchorMenu: React.FC<AnchorScrollProps> = function ({
  menuList,
  placement = 'left',
  region = [-20, 20],
  menuStyle,
  easing,
  hideTitle = false,
  activeKey,
  onMenuClick,
  onReach,
  scrollDirection = 'vertical',
  duration,
}: AnchorScrollProps) {
  // 滚动时设置为true,到达目的地后为false
  // 滚动到目的前,经过的菜单不会高亮
  const clock = useRef(false);
  const [elementKeys, setElementKeys] = useState<string[]>([]);
  const scrollEle = useRef<HTMLElement>(null);
  const [currentMenuKey, setCurrentMenuKey] = useState<string | undefined>(activeKey);

  const menuWidth: number | string = useMemo(() => {
    // 菜单宽度，placement为 left | right 时，默认为 100px；placement为 top | bottom 时，默认为 100%
    return placement === 'left' || placement === 'right' ? 100 : '100%';
  }, [placement]);

  const menuHeigth: number | string = useMemo(() => {
    // 菜单高度，placement为 left | right 时，默认为 100%；placement为 top| bottom 时，默认为 30px
    return placement === 'left' || placement === 'right' ? '100%' : 40;
  }, [placement]);

  useDeepCompareEffect(() => {
    if (menuList && menuList.length > 0) {
      const eleNames = menuList.map((menu) => menu.key);
      setElementKeys(eleNames);
      // 设置数组第一个为默认
      !activeKey && menuList[0] && setCurrentMenuKey(menuList[0].key);
    }
  }, [menuList]);

  const { getScrollToElementRef, scrollToElementClickHandler, scrollToElementRefs } =
    useScrollToElement(
      elementKeys,
      scrollEle.current,
      scrollDirection,
      easing,
      duration,
      (key, index) => {
        clock.current = false;
        onReach?.(key, index);
      },
    );

  useEffect(() => {
    if (activeKey && scrollEle.current && scrollToElementRefs.current[activeKey]) {
      const activeEle = scrollToElementRefs.current[activeKey].current;
      if (activeEle) {
        let scrollPosition = 'scrollTop';
        let offsetPosition = 'offsetTop';
        if (placement === 'top' || placement === 'bottom') {
          scrollPosition = 'scrollLeft';
          offsetPosition = 'offsetLeft';
        }
        scrollEle.current[scrollPosition] = activeEle[offsetPosition];
      }
    }
  }, [activeKey, scrollToElementRefs.current]);

  const menuNav = (
    <ul
      className="menu-anchor-scroll-nav"
      style={{ width: menuWidth, height: menuHeigth, ...menuStyle }}
    >
      {menuList.map((menu, index) => (
        <li
          key={menu.key}
          className={menu.key === currentMenuKey ? 'menu-item active' : 'menu-item'}
          onClick={async () => {
            clock.current = true;
            onMenuClick?.(menu.key, index, menu.key);
            scrollToElementClickHandler(menu.key, index);
            setCurrentMenuKey(menu.key);
          }}
        >
          {menu.name}
        </li>
      ))}
    </ul>
  );

  const scrollContainer = (
    <div
      ref={scrollEle as any}
      className={`menu-anchor-scroll-main${scrollDirection === 'horizontal' ? ' horizontal' : ''}`}
      onScroll={() => {
        if (clock.current) return;
        for (let key in scrollToElementRefs.current) {
          const item = scrollToElementRefs.current[key].current!;
          const { isReach } = getOffsetDistance(item, scrollEle.current!, scrollDirection, region);
          // 手动滚动：内容到达位置后，设置菜单高亮
          if (isReach) {
            currentMenuKey !== key && setCurrentMenuKey(key);
          }
        }
      }}
    >
      {menuList.map((item, index) => {
        return (
          <div
            key={item.key}
            className="menu-content"
            ref={getScrollToElementRef(item.key, index) as any}
          >
            {!hideTitle && <h5 className="menu-content-title">{item.name}</h5>}
            {item.content}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={`menu-anchor-scroll-container ${
        placement === 'left' || placement === 'right' ? 'row' : 'col'
      }`}
    >
      {(placement === 'left' || placement === 'top') && menuNav}
      {scrollContainer}
      {(placement === 'right' || placement === 'bottom') && menuNav}
    </div>
  );
};

export default memo(AnchorMenu);
