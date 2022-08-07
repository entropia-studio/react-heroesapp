import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('SearchPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrarse correctamente con los valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('debe de mostrarse Batman y el input con el valor del query string', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=Batman']}>
        <SearchPage />
      </MemoryRouter>
    );
    const inputValue = screen.getByRole('textbox');
    expect(inputValue.value).toBe('Batman');
    const imgElement = screen.getByRole('img');
    expect(imgElement.src).toContain('/assets/heroes/dc-batman.jpg');
    const searchDiv = screen.getByLabelText('Search a hero');
    expect(searchDiv.style).toHaveProperty('display', 'none');
  });

  test('debe de mostrarse un mensaje de error si el héroe no existe', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=Batman123']}>
        <SearchPage />
      </MemoryRouter>
    );
    const searchDiv = screen.getByLabelText('Search a hero');
    expect(searchDiv.style).toHaveProperty('display', 'none');
    const notFoundDiv = screen.getByLabelText('Hero not found');
    expect(notFoundDiv.style).toHaveProperty('display', '');
  });

  test('debe invocar navigate al pulsar el botón de buscar', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );
    const inputValue = screen.getByRole('textbox');
    fireEvent.change(inputValue, { target: { value: 'Batman' } });
    const form = screen.getByTestId('heroForm');
    fireEvent.submit(form);
    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=Batman`);
  });
});
