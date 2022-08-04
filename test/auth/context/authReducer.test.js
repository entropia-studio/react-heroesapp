import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: {},
  };
  test('debe devolver el estado por defecto', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('debe (login) llamar el login autenticar y establecer el user', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'John Doe',
      },
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({
      isAuthenticated: true,
      user: action.payload,
    });
  });

  test('debe (logout) borrar el name del usuario y isAuthtenticated es false', () => {
    const action = {
      type: types.logout,
    };

    const initialState = {
      isAuthenticated: true,
      user: {
        name: 'John Doe',
      },
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({
      isAuthenticated: false,
      user: {},
    });
  });
});
