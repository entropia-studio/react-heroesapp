import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

describe('SearchPage', () => {
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
});
