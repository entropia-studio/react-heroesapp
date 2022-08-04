import { types } from '../../../src/auth/types/types';

describe('types', () => {
  test('debe devolver estos types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});
