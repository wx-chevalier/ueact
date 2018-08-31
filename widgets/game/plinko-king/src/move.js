// when the player is charging, set the power to min power allowed
// and wait the player to release the input to fire the ball
import { updateHud } from './score';

export function charge() {
  const game = this.game;
  game.extra.state.power = game.extra.cons.minPower;
  game.input.onDown.remove(charge, this);
  game.input.onUp.add(fire, this);
  game.extra.state.charging = true;
}

// FIRE!!
// update ball speed according to arrow direction
// invert arrow rotation
// reset power and update game text
// wait for the player to fire again
export function fire() {
  const game = this.game;
  const {
    ins: { ball, arrow },
    cons: { degToRad },
    state: { power }
  } = game.extra;

  game.input.onUp.remove(fire, this);
  game.input.onDown.add(charge, this);
  ball.xSpeed += Math.cos(arrow.angle * degToRad) * power / 20;
  ball.ySpeed += Math.sin(arrow.angle * degToRad) * power / 20;
  game.extra.state.power = 0;
  updateHud(game);
  game.extra.state.charging = false;
  game.extra.state.rotateDirection *= -1;
}
