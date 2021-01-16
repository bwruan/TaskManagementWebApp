import { AccountRequest } from './account-request';

describe('AccountRequest', () => {
  it('should create an instance', () => {
    expect(new AccountRequest(1, "", "", "", 1, null)).toBeTruthy();
  });
});
