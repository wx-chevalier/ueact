// simple function to get the distance between two sprites
// does not use sqrt to save CPU
export function getDistance(from, to) {
  var xDist = from.x - to.x;
  var yDist = from.y - to.y;
  return xDist * xDist + yDist * yDist;
}
