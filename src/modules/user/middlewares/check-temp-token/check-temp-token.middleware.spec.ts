import { CheckTempTokenMiddleware } from './check-temp-token.middleware';

describe('CheckTempTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckTempTokenMiddleware()).toBeDefined();
  });
});
