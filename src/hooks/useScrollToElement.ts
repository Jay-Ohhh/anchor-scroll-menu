import { createRef, RefObject, useRef, useCallback, useState, useEffect } from 'react';
import { getOffsetDistance, easings } from '../utils';
import type { Easings } from '../utils';

type ScrollToElementRefs = {
  [key: string]: RefObject<HTMLElement>;
};

// 除去字母数字以外的字符
const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

const useScrollToElement = (
  elementKeys: string[],
  scrollViewEl: HTMLElement | null, // 滚动区域元素（带滚动条的元素）
  scrollDirection: 'vertical' | 'horizontal',
  easing: Easings = 'easeInOutCubic',
  duration: number = 300,
  callback?: (key: string, index: number) => void,
) => {
  const scrollToElementRefs = useRef<ScrollToElementRefs>({});
  const [trigger, setTrigger] = useState(+new Date());

  useEffect(() => {
    scrollToElementRefs.current = elementKeys.reduce((acc, elementName, index) => {
      acc[removeSpecialCharacters(elementName) || index] = createRef<HTMLElement>();
      return acc;
    }, {} as ScrollToElementRefs);
    //set trigger to force update to below handlers
    setTrigger(+new Date());
  }, [elementKeys]);

  // scroll function
  function myScroll(eleKey: string, index: number = 0) {
    const currentEl =
      scrollToElementRefs?.current[removeSpecialCharacters(eleKey) || index].current;

    let scrollPosition = 'scrollTop';
    let offsetPosition = 'offsetTop';
    let scrollLength = 'scrollHeight';
    let clientLength = 'clientHeight';
    if (scrollDirection === 'horizontal') {
      scrollPosition = 'scrollLeft';
      offsetPosition = 'offsetLeft';
      scrollLength = 'scrollWidth';
      clientLength = 'clientWidth';
    }

    if (!scrollViewEl || !currentEl) return;

    const { offsetDistance: change } = getOffsetDistance(currentEl!, scrollViewEl, scrollDirection); // 目标值与初始值的差值

    const startTime = +new Date(); // 开始滚动的时间
    const begin = scrollViewEl[scrollPosition]; // 初始值：一开始已经滚动了的距离
    let cancelId;

    function smoothScroll() {
      if (!scrollViewEl || !currentEl) return;
      // 垂直滚动 vertical scroll
      const currentElOffset = currentEl[offsetPosition]; // childNode.offsetTop|offsetLeft
      const scrollViewElScrollLength = scrollViewEl[scrollLength]; // scrollViewNode.scrollHeight|scrollWidth
      const scrollViewElClientLength = scrollViewEl[clientLength]; // scrollViewNode.offsetHeight|offsetWidth
      let scrollViewElScrollPosition = scrollViewEl[scrollPosition]; // scrollViewNode.scrollTop|scrollLeft
      let { offsetDistance: childToParent } = getOffsetDistance(
        currentEl,
        scrollViewEl,
        scrollDirection,
      );
      // 排除childToParent为null或undefined
      if (typeof childToParent === 'number') {
        // 判断是否已经滚动到底部/右侧
        // isReachToBottom | isReachToRight
        // 当滚动条元素的 clientHeight + scrollTop >= scrollHeight 时，表示已经抵达内容的底部了
        const isTail =
          scrollViewElScrollPosition + scrollViewElClientLength >= scrollViewElScrollLength;
        const time = Math.max(1, +new Date() - startTime);
        // 因为子元素到达顶部，与父元素可能会有[-1,1]的间距
        if (childToParent > 1 && !isTail) {
          scrollViewElScrollPosition = easings[easing](time, begin, change, duration);
          scrollViewEl[scrollPosition] = Math.min(currentElOffset, scrollViewElScrollPosition);
        } else if (childToParent < -1) {
          scrollViewElScrollPosition = easings[easing](time, begin, change, duration);
          scrollViewEl[scrollPosition] = Math.max(currentElOffset, scrollViewElScrollPosition);
        } else {
          cancelId && window.cancelAnimationFrame(cancelId);
          callback?.(eleKey, index);
          return;
        }
        cancelId = window.requestAnimationFrame(smoothScroll);
      }
    }
    smoothScroll();
  }

  const scrollToElementClickHandler = useCallback(myScroll, [
    trigger,
    scrollViewEl,
    scrollDirection,
  ]);

  const getScrollToElementRef = useCallback(
    (elementName: string, index: number) => {
      return scrollToElementRefs?.current[removeSpecialCharacters(elementName) || index];
    },
    [trigger],
  );

  return { getScrollToElementRef, scrollToElementClickHandler, scrollToElementRefs };
};

export default useScrollToElement;
