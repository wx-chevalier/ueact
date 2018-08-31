/** 加载游戏资源 */
import { buildFench, initBall, placeCoin, placeDeadly } from './build';
import { charge } from './move';
import { wallBounce } from './bounce';
import { updateHud } from './score';
import { getDistance } from './utils';

export function onPreload() {
  this.game.load.image('ball', 'assets/ball.png');
  this.game.load.image('deadly', 'assets/deadly.png');
  this.game.load.image('coin', 'assets/coin.png');
  this.game.load.image('arrow', 'assets/arrow.png');
}

/** 游戏创建时候调用 */
export function onCreate() {
  const game = this.game;

  // 使得 Stage 舞台居中
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  // 启动 BOX2D 插件
  game.physics.startSystem(Phaser.Physics.BOX2D);
  game.physics.box2d.gravity.y = 500;
  // 设置 Stage 边界，即小球可能弹出边界
  game.physics.box2d.setBoundsToWorld();
  game.physics.box2d.restitution = 0.5;

  // 初始化栅栏
  buildFench(game);

  // 初始化球
  initBall(game);

  // 放置危险球
  placeDeadly(game);

  placeCoin(game);

  // create and place the text showing speed and score
  game.extra.ins.hudText = game.add.text(5, 0, '', {
    font: '11px Arial',
    fill: '#ffffff',
    align: 'left'
  });

  // update text content
  updateHud(game);

  // listener for input down
  game.input.onDown.add(charge, this);
}

// function to be executed each time the game is updated
export function onUpdate() {
  const game = this.game;
  const gameState = game.extra.state;
  const gameCons = game.extra.cons;
  const gameIns = game.extra.ins;

  gameIns.ball.body.setZeroVelocity();

  // the game is update only if it's not game over
  if (!gameState.gameOver) {
    // when the player is charging the power, this is increased until it reaches the maximum allowed
    if (gameState.charging) {
      gameState.power++;
      gameState.power = Math.min(gameState.power, gameCons.maxPower);
      // then game text is updated
      updateHud(game);
    }

    // if the player is not charging, keep rotating the arrow
    else {
      gameIns.arrow.angle += gameCons.rotateSpeed * gameState.rotateDirection;
    }

    // update ball position according to its speed
    gameIns.ball.x += gameIns.ball.xSpeed;
    gameIns.ball.y += gameIns.ball.ySpeed;

    // handle wall bounce
    wallBounce(game);

    // reduce ball speed using friction
    gameIns.ball.xSpeed *= gameCons.friction;
    gameIns.ball.ySpeed *= gameCons.friction;

    // update arrow position
    gameIns.arrow.x = gameIns.ball.x;
    gameIns.arrow.y = gameIns.ball.y;

    // if the player picked a coin, then update score and text, change coin position and add an enemy
    if (
      getDistance(gameIns.ball, gameIns.coin) <
      gameCons.ballRadius * 2 * (gameCons.ballRadius * 2)
    ) {
      gameState.score += 1;
      placeDeadly(game);
      placeCoin(game);
      updateHud(game);
    }

    // if the player hits an enemy, it's game over
    for (let i = 0; i < gameIns.deadlyArray.length; i++) {
      if (
        getDistance(gameIns.ball, gameIns.deadlyArray[i]) <
        gameCons.ballRadius * 2 * (gameCons.ballRadius * 2)
      ) {
        gameState.gameOver = true;
      }
    }
  }
}

export function render() {
  this.game.debug.box2dWorld();
}
