import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('PrivateRoute', () => {
  test('debe de mostrar el children está autenticado', () => {
    Storage.prototype.setItem = jest.fn();

    render(
      <AuthContext.Provider
        value={{ isAuthenticated: true, user: { name: 'John Doe' } }}
      >
        <MemoryRouter>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Private route')).toBeTruthy();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('lastPath', '/');
  });

  test('debe de mostrar el login si el usuario no está autenticado', () => {
    Storage.prototype.setItem = jest.fn();

    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <MemoryRouter initialEntries={['/marvel']}>
          <Routes>
            <Route
              path='login'
              element={
                <PublicRoute>
                  <h1>Login</h1>
                </PublicRoute>
              }
            ></Route>
            <Route
              path='/*'
              element={
                <PrivateRoute>
                  <h1>Private route</h1>
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Login')).toBeTruthy();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/marvel'
    );
  });
});
