import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('PublicRoute', () => {
  test('debe de mostrar el children si no está autenticado', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Public route')).toBeTruthy();
  });

  test('debe navegar si está autenticado', () => {
    render(
      <AuthContext.Provider
        value={{ isAuthenticated: true, user: { name: 'John Doe' } }}
      >
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path='login'
              element={
                <PublicRoute>
                  <h1>Public route</h1>
                </PublicRoute>
              }
            ></Route>
            <Route path='/' element={<h1>Marvel</h1>}></Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Marvel')).toBeTruthy();
  });
});
