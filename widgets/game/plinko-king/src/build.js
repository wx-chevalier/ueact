/** 构建基本的游戏场景 */

import { getDistance } from './utils';

/** 初始化球与箭头 */
export function initBall(game) {
  // add the ball and set its anchor point in the center
  let ball = game.add.sprite(game.world.centerX, 10, 'ball');
  ball.anchor.x = 0.5;
  ball.anchor.y = 0.5;

  game.physics.box2d.enable(ball);

  // ball starting speed
  ball.xSpeed = 0;
  ball.ySpeed = 0;

  // the rotating arrow
  let arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
  arrow.anchor.x = -1;
  arrow.anchor.y = 0.5;

  game.extra.ins.ball = ball;
  game.extra.ins.arrow = arrow;
}

export function buildFench(game) {
  const ground = new Phaser.Physics.Box2D.Body(
    game,
    null,
    game.world.centerX,
    200,
    0
  );
  ground.setRectangle(750, 50, 0, 0, -10);

  for (var i = 0; i < 10; i++) {
    var ball = new Phaser.Physics.Box2D.Body(
      game,
      null,
      game.world.randomX,
      game.world.randomY
    );
    ball.setCircle(16);
    ball.bullet = true;
  }
}

/** 放置对手 */
export function placeDeadly(game) {
  const {
    ins: { ball, deadlyArray },
    cons: { ballRadius }
  } = game.extra;

  // first, create the enemy and set its anchor point in the center
  const deadly = game.add.sprite(0, 0, 'deadly');
  deadly.anchor.x = 0.5;
  deadly.anchor.y = 0.5;

  // add the newly created enemy in the enemy array
  deadlyArray.push(deadly);

  // assign it a random position until such position is legal
  do {
    const randomX = Math.random() * (game.width - 2 * ballRadius) + ballRadius;
    const randomY = Math.random() * (game.height - 2 * ballRadius) + ballRadius;
    deadlyArray[deadlyArray.length - 1].x = randomX;
    deadlyArray[deadlyArray.length - 1].y = randomY;
  } while (illegalDeadly(ball, deadlyArray, ballRadius));
}

// determine if an enemy position is illegal
export function illegalDeadly(ball, deadlyArray, ballRadius) {
  // if the distance between the enemy and the ball is less than three times the radius, it's NOT legal
  if (
    getDistance(ball, deadlyArray[deadlyArray.length - 1]) <
    ballRadius * 3 * (ballRadius * 3)
  ) {
    return true;
  }

  // if the distance between the enemy and any other enemy is less than two times the radius, it's NOT legal
  for (let i = 0; i < deadlyArray.length - 1; i++) {
    if (
      getDistance(deadlyArray[i], deadlyArray[deadlyArray.length - 1]) <
      ballRadius * 2 * (ballRadius * 2)
    ) {
      return true;
    }
  }

  // otherwise it's legal
  return false;
}

// the function to place a coin is similar to the one which places the enemy, but this time we don't need
// to place it in an array because there's only one coin on the stage
export function placeCoin(game) {
  let coin;

  if (!game.extra.ins.coin) {
    // create and place a coin
    coin = game.add.sprite(
      Math.random() * 400 + 40,
      Math.random() * 240 + 40,
      'coin'
    );
    coin.anchor.x = 0.5;
    coin.anchor.y = 0.5;
    game.extra.ins.coin = coin;
  } else {
    coin = game.extra.ins.coin;
  }

  const {
    ins: { ball, deadlyArray },
    cons: { ballRadius }
  } = game.extra;
  // assign the coin a random position until such position is legal
  do {
    coin.x = Math.random() * (game.width - 2 * ballRadius) + ballRadius;
    coin.y = Math.random() * (game.height - 2 * ballRadius) + ballRadius;
  } while (illegalCoin(ball, coin, deadlyArray, ballRadius));
}

// determine if a coin position is illegal
export function illegalCoin(ball, coin, deadlyArray, ballRadius) {
  // if the distance between the coin and any ball is less than 2.5 times the radius, it's NOT legal
  if (getDistance(ball, coin) < ballRadius * 2.5 * (ballRadius * 2.5)) {
    return true;
  }

  // if the distance between the coin and any enemy is less than three times the radius, it's NOT legal
  for (let i = 0; i < deadlyArray.length; i++) {
    if (getDistance(deadlyArray[i], coin) < ballRadius * 3 * (ballRadius * 3)) {
      return true;
    }
  }

  // otherwise it's legal
  return false;
}
