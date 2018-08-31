/** 更新游戏内容 */
export function updateHud(game) {
  const {
    ins: { hudText },
    state: { power, score }
  } = game.extra;

  hudText.text = 'Power: ' + power + ' * Score: ' + score;
}
