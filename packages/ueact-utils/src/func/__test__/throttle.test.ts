import { throttleAndQueue } from '../throttle';

describe('', () => {
  const logMessageLimited = throttleAndQueue((msg: string) => {
    console.log(msg);
  }, 10 * 1000);

  for (let i = 0; i < 3; i++) {
    logMessageLimited(`[Message Log] Action (${i}) rate limited.`);
  }
});
