const faker = require('faker');

/**
 * Generate random data for use in examples.
 */
export function generateRandomList() {

  const list = [];

  const ROW_HEIGHTS = [50, 75, 100];

  for (let i = 0; i < 100; i++) {

    list.push({
      color: faker.internet.color(),
      index: i,
      avatar: faker.image.imageUrl(),
      name: faker.name.findName(),
      size: ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)]
    })
  }

  return list
}
