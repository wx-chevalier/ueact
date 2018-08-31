import {onCreate, onPreload, onUpdate, render} from './src/game';

// 初始化游戏实例
const game = new Phaser.Game(320, 480, Phaser.CANVAS, 'plinko-king', {
  preload: onPreload,
  create: onCreate,
  update: onUpdate,
  render: render
});

// 设置游戏的全局变量
game.extra = {
  // 对象实例
  ins: {
    // 球实例
    ball: undefined,
    // 球的箭头
    arrow: undefined,
    // an array which will be filled with enemies
    deadlyArray: [],
    // 球数组
    balls: [],
    // 结果显示区域
    hudText: undefined
  },
  // 常量
  cons: {
    // degrees-radians conversion
    degToRad: 0.0174532925,
    // friction affects ball speed，即球的速度衰减率
    friction: 0.99,
    // radius of all elements
    ballRadius: 10,
    // arrow rotation speed
    rotateSpeed: 3,
    // minimum power applied to ball
    minPower: 50,
    // maximum power applied to ball
    maxPower: 200
  },
  // 状态
  state: {
    // 游戏是否结束
    gameOver: false,
    // 箭头转动方向，1-clockwise, 2-counterclockwise
    rotateDirection: 1,
    // 动力
    power: 0,
    // 是否充能
    charging: false,
    // 最终得分
    score: 0,
    // 搜集到的金币
    coin: 0
  }
};
