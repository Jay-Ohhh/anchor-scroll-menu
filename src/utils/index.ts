// 尾部防抖
// export function tailDebounce(fun: (...props: any[]) => any, ms = 500) {
//   let timer;
//   return function (...args: any[]) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       // @ts-ignore
//       fun.apply(this, args);
//     }, ms);
//   };
// }

/**
 * 子元素相对父元素的顶部/左侧距离，子元素是否到达父元素的顶部/左侧
 * @param child 子元素
 * @param parent 父元素
 * @param region 滚动的子元素与父元素顶部/左侧距离的区间
 */
export function getOffsetDistance(
  child: HTMLElement,
  parent: HTMLElement,
  direction: 'vertical' | 'horizontal' = 'vertical',
  region = [-20, 20],
) {
  if (direction === 'vertical') {
    // 子元素相对父容器的顶部距离
    const childOffsetTop = child.getBoundingClientRect().top - parent.getBoundingClientRect().top;
    const isReach = childOffsetTop >= region[0] && childOffsetTop < region[1];
    return { offsetDistance: childOffsetTop, isReach };
  } else {
    const childOffsetLeft =
      child.getBoundingClientRect().left - parent.getBoundingClientRect().left;
    const isReach = childOffsetLeft >= region[0] && childOffsetLeft < region[1];
    return { offsetDistance: childOffsetLeft, isReach };
  }
}
/**
 * 缓动函数
 * https://zhuanlan.zhihu.com/p/25676357
 * https://www.cnblogs.com/byit/p/4535971.html
 * t：time 当前已经运动的时间 = 当前时间-开始运动时间 变量
 * b：begin 初始值 开始时已经运动了的距离 常量
 * c: change 目标值与初始值的插值 常量
 * d：duration 运动时间 常量
 */
export type Easings = keyof typeof easings;
export const easings = {
  linear: (t: number, b: number, c: number, d: number) => {
    return c * (t / d) + b;
  },
  easeInQuad: (t: number, b: number, c: number, d: number) => {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function (t, b, c, d: number) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function (t, b, c, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function (t, b, c, d: number) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function (t, b, c, d: number) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function (t, b, c, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  },
};
// window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘(刷新)之前执行
// 与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。
// 换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
// requestAnimationFrame()的兼容性封装：先判断是否原生支持各种带前缀的
// (function () {
//   let lastTime = 0;
//   if (!window.requestAnimationFrame) {
//     window.requestAnimationFrame =
//       window.webkitRequestAnimationFrame ||
//       window.msRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       function (callback) {
//         let currentTime = new Date().getTime();
//         // 16.7ms是1000/60,每一帧需要的毫秒数
//         // currentTime - lastTime是两次window.requestAnimationFrame执行的间隔时间
//         // 16.7 - (currentTime - lastTime)估计是想让setTimeoutm每执行完回调函数callback刚好到达16.7ms
//         // 即在完成callback后刚好一帧结束
//         let timeToCall = Math.max(0, 16.7 - (currentTime - lastTime));
//         let timer = window.setTimeout(function () {
//           callback(currentTime + timeToCall);
//         }, timeToCall);
//         lastTime = currentTime + timeToCall;
//         return timer;
//       };
//   }
//   if (!window.cancelAnimationFrame) {
//     window.cancelAnimationFrame =
//       window.webkitCancelAnimationFrame ||
//       window.webkitCancelRequestAnimationFrame ||
//       window.mozCancelAnimationFrame ||
//       window.mozCancelRequestAnimationFrame ||
//       window.msCancelAnimationFrame ||
//       window.msCancelRequestAnimationFrame ||
//       window.oCancelAnimationFrame ||
//       window.oCancelRequestAnimationFrame ||
//       function (id) {
//         window.clearTimeout(id);
//       };
//   }
// })();
