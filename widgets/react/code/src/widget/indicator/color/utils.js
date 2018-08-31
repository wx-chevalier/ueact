/**
 * 颜色生成规则，
 * 取格式前三个字母，255 * 字母位置 / 32
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export const genColor = string => {
  if (!string) {
    return 'rgb(0, 0, 0)';
  }
  const array = string.split('');
  const rgb = [];
  for (let index = 0; index < 3; index += 1) {
    let char = array[index] || 'Z';
    if (parseInt(char, 10)) {
      // 如果是数字
      char = String.fromCharCode(char.charCodeAt() - 48 + 65);
    }
    rgb.push(parseInt((char.charCodeAt() - 64) / 32 * 255, 10));
  }
  return `rgb(${`${rgb}`})`;
};
