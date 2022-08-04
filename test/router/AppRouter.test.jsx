import { AppRouter } from '../../src/router/AppRouter';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';

describe('AppRouter', () => {
  test('debe de mostrar el login si no está autenticado', () => {
    const contextValue = { isAuthenticated: false };
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText('LoginPage').length).toBe(1);
  });

  test('debe de mostrar el componente Marvel si está autenticado', () => {
    const contextValue = { isAuthenticated: true, user: { name: 'John Doe' } };
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText('MarvelPage').length).toBe(1);
  });
});
