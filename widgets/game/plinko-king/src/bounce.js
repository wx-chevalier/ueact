// function to handle bounces. Just check for game boundary collision
export function wallBounce(game) {
  const ball = game.extra.ins.ball;
  const ballRadius = game.extra.cons.ballRadius;

  if (ball.x < ballRadius) {
    ball.x = ballRadius;
    ball.xSpeed *= -1;
  }
  if (ball.y < ballRadius) {
    ball.y = ballRadius;
    ball.ySpeed *= -1;
  }
  if (ball.x > game.width - ballRadius) {
    ball.x = game.width - ballRadius;
    ball.xSpeed *= -1;
  }
  if (ball.y > game.height - ballRadius) {
    ball.y = game.height - ballRadius;
    ball.ySpeed *= -1;
  }
}
