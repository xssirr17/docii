import { RatelimitMiddleware } from './ratelimit.middleware';

describe('RatelimitMiddleware', () => {
  it('should be defined', () => {
    expect(new RatelimitMiddleware(null)).toBeDefined();
  });
});
