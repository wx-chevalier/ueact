

/**
 * Description 获取某个元素渲染之后的高度
 * @param ele
 */
export const getComputedHeight = (ele): number => {
  const heightText = window.getComputedStyle(ele).getPropertyValue('height');
  if (/px$/.test(heightText)) {
    return Number(heightText.slice(0, -2));
  }
};

/**
 * Description 获取偏移量
 * @param height
 * @param amount
 * @param index
 */
export const getYOffset = (
  height: number,
  amount: number,
  index: number
): number => {
  const itemHeight = height / amount;
  return -itemHeight * index;
};
