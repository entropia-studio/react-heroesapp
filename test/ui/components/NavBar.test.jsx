import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui/components/NavBar';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('NavBar', () => {
  const contextValue = {
    isAuthenticated: true,
    user: { name: 'John Doe' },
    logout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe aparecer el nombre del usuario identificado', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('John Doe')).toBeTruthy();
  });
  test('debe de invocar la función navigate con parámetros', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    expect(contextValue.logout).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
