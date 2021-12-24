// 尾部防抖
export function tailDebounce(fun: (...props: any[]) => any, ms = 500) {
  let timer;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      fun.apply(this, args);
    }, ms);
  };
}
