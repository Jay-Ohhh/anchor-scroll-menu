import React, { memo, useEffect, useState, useRef, useMemo, CSSProperties } from 'react'
import useScrollToElement from '@/hooks/useScrollToElement'
import { tailDebounce } from '@/utils/debounce'
import './index.less'

export interface AnchorScrollProps {
  /**
   * @description  菜单数据数组，key会被用作元素节点的id，请确保是唯一的，由字母数字组成，且必须以字母开头
   * @default      []
   */
  menuList: { name: string, content: React.ReactNode, key: string }[];
  /**
   * @description  菜单宽度，placement为 left | right 时，默认为 100px；placement为 top | bottom 时，默认为 100%
   * @default
   */
  menuWidth?: number | string; // menu宽度
  /**
   * @description  菜单高度，placement为 left | right 时，默认为 100%；placement为 top| bottom 时，默认为 30px
   * @default
   */
  menuHeigth?: number | string; // menu高度
  /**
   * @description  menu区的style
   * @default
   */
  menuStyle?: CSSProperties;
  /**
   * @description  菜单的位置
   * @default      'left'
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * @description  滚动内容跟父元素顶部距离的区间,滚动内容一到达该区间,左侧菜单就高亮
   * @default      [-10, 10]
   */
  region?: [number, number];

  /**
   * @description  Element.scrollIntoView()的参数
   * @default      { behavior: 'smooth', block: 'nearest', inline: 'start' }
   */
  scrollIntoViewOptions?: ScrollIntoViewOptions | boolean;
}

const AnchorMenu: React.FC<AnchorScrollProps> = function ({
  menuList,
  placement = 'left',
  region = [-10, 10],
  menuStyle,
  scrollIntoViewOptions,
}) {
  // 滚动时设置为true,到达目的地后为false
  // 滚动到目的前,经过的菜单不会高亮
  const clock = useRef(false)
  const [elementNames, setElementNames] = useState<string[]>([])
  const scrollEle = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<HTMLElement[]>([])
  const [currentMenuKey, setCurrentMenuKey] = useState<string>()
  const [scrollEleTop, setScrollEleTop] = useState(0) // 包裹滚动区域的元素相对于视口的位置的top

  const menuWidth: number | string = useMemo(() => {
    return (placement === 'left' || placement === 'right') ? 100 : '100%'
  }, [placement])

  const menuHeigth: number | string = useMemo(() => {
    return (placement === 'left' || placement === 'right') ? '100%' : 30
  }, [placement])

  useEffect(() => {
    setElementNames(menuList.map((menu) => menu.key))
  }, [menuList])

  useEffect(() => {
    setScrollEleTop(scrollEle.current!.getBoundingClientRect().top)
  }, [])

  useEffect(() => {
    if (menuList && menuList.length > 0) {
      const els = menuList.map(menu => document.getElementById(menu.key)!);
      setElements(els)
      // 设置数组第一个为默认
      menuList[0] && setCurrentMenuKey(menuList[0].key)
    }
  }, [menuList])

  const {
    getScrollToElementRef,
    scrollToElementClickHandler
  } = useScrollToElement(elementNames, scrollIntoViewOptions);

  return (
    <div className="menu-anchor-scroll-container">
      <div className="menu-anchor-scroll-left"
        style={{ width: menuWidth, height: menuHeigth, ...menuStyle }}
      >
        <ul>
          {menuList.map(menu => (
            <li
              key={menu.key}
              className={menu.key === currentMenuKey ? 'menu-item active' : 'menu-item'}
              onClick={async () => {
                clock.current = true
                scrollToElementClickHandler(menu.key)
                setCurrentMenuKey(menu.key)
              }}
            >
              {menu.name}
            </li>
          ))}
        </ul>
      </div>
      <div ref={scrollEle} className="menu-anchor-scroll-main" onScroll={() => {
        elements.map((item, index) => {
          // 当前内容相对父容器的高度
          const eleTop = item.getBoundingClientRect().top - scrollEleTop
          const isReach = eleTop >= region[0] && eleTop < region[1]
          // 手动滚动：内容到达位置后，设置菜单高亮
          if (isReach && !clock.current) {
            setCurrentMenuKey(menuList[index].key)
          }
          // 将锁关闭
          tailDebounce(() => {
            if (clock.current) {
              clock.current = false
            }
          }, 500)()
        })
      }}>
        {menuList.map((item, index) => {
          return (
            <div
              key={item.key}
              className="menu-content"
              ref={getScrollToElementRef(item.key, index) as any}
            >
              <h5 className='menu-content-title' id={item.key} >{item.name}</h5>
              <div>{item.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default memo(AnchorMenu)

