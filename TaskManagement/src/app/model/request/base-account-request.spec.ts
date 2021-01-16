import { BaseAccountRequest } from './base-account-request';

describe('BaseAccount', () => {
  it('should create an instance', () => {
    expect(new BaseAccountRequest(1, "", "", "", 1, null)).toBeTruthy();
  });
});
