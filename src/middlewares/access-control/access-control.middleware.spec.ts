import { AccessControlMiddleware } from './access-control.middleware';

describe('AccessControlMiddleware', () => {
  it('should be defined', () => {
    expect(new AccessControlMiddleware()).toBeDefined();
  });
});
