// https://github.com/patricktran/react-use-scroll-to-element-hook
import { createRef, RefObject, useRef, useCallback, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

type ScrollToElementRefs = {
  [key: string]: RefObject<HTMLElement>;
};

// 除去字母数字以外的字符
const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

// https://developer.mozilla.org/zh-CN/docs/web/api/element/scrollintoview
const defaultScrollIntoViewOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'nearest', // 垂直滚动时对齐到最近的滚动区的可视区域的顶端，不设置时有可能祖先级的元素也会滚动
  inline: 'start',
};

const useScrollToElement = (
  elementNames: string[],
  scrollIntoViewParams: ScrollIntoViewOptions | boolean = defaultScrollIntoViewOptions,
) => {
  const scrollToElementRefs = useRef<ScrollToElementRefs>({});
  const [trigger, setTrigger] = useState(+new Date());

  useDeepCompareEffect(() => {
    scrollToElementRefs.current = elementNames.reduce((acc, elementName, index) => {
      acc[removeSpecialCharacters(elementName) || index] = createRef<HTMLElement>();
      return acc;
    }, {} as ScrollToElementRefs);
    //set trigger to force update to below handlers
    setTrigger(+new Date());
  }, [elementNames]);

  const scrollToElementClickHandler = useCallback(
    (elementName: string, index: number = 0) => {
      // scroll to element ref if it exists
      scrollToElementRefs?.current[
        removeSpecialCharacters(elementName) || index
      ].current?.scrollIntoView(scrollIntoViewParams);
    },
    [trigger, scrollIntoViewParams],
  );

  const getScrollToElementRef = useCallback(
    (elementName: string, index: number) => {
      return scrollToElementRefs?.current[removeSpecialCharacters(elementName) || index];
    },
    [trigger],
  );

  return { getScrollToElementRef, scrollToElementClickHandler };
};

export default useScrollToElement;
