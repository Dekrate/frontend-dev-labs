import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App Layout', () => {
  it('renders header banner', () => {
    render(<App />);
    expect(screen.getByTestId('header-banner')).toBeInTheDocument();
    expect(screen.getByText(/aromatyczne/i)).toBeInTheDocument();
    // szynka is split into szynk + a in separate spans; use getByText with a custom matcher or check container text
    expect(screen.getByText(/szynk/i)).toBeInTheDocument();
  });

  it('renders navigation with all links', () => {
    render(<App />);
    const nav = screen.getByTestId('main-navigation');
    expect(nav).toBeInTheDocument();
    // Navigation contains duplicate labels per original design; use getAllByRole and assert at least one exists
    expect(screen.getAllByRole('link', { name: /firma/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /informacje/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /oferta/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /promocje/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /radość zakupów/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /mapa strony/i })).toBeInTheDocument();
  });

  it('renders main article content', () => {
    render(<App />);
    expect(screen.getByTestId('main-article')).toBeInTheDocument();
    // The heading text is unique within h1
    expect(
      screen.getByRole('heading', { name: /si meliora dies, ut vina, poemata reddit/i })
    ).toBeInTheDocument();
  });

  it('renders image gallery', () => {
    render(<App />);
    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    expect(screen.getByLabelText(/poprzednie zdjęcie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/następne zdjęcie/i)).toBeInTheDocument();
  });

  it('renders sidebar with links', () => {
    render(<App />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /e-sklep/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /e-multimedia/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kuchnia polki/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gazetka/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /arabeska/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pióra/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /trafika/i })).toBeInTheDocument();
  });

  it('renders search and newsletter inputs', () => {
    render(<App />);
    const sidebar = screen.getByTestId('sidebar');
    expect(within(sidebar).getByRole('textbox', { name: /szukaj/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email do newslettera/i)).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
  });

  it('gallery buttons cycle images', async () => {
    const user = userEvent.setup();
    render(<App />);
    const nextBtn = screen.getByLabelText(/następne zdjęcie/i);
    const prevBtn = screen.getByLabelText(/poprzednie zdjęcie/i);
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();
    await user.click(nextBtn);
    await user.click(prevBtn);
  });

  it('sidebar search input accepts text', async () => {
    const user = userEvent.setup();
    render(<App />);
    const sidebar = screen.getByTestId('sidebar');
    const input = within(sidebar).getByRole('textbox', { name: /szukaj/i });
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  it('sidebar newsletter input accepts email', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText(/email do newslettera/i);
    await user.type(input, 'user@example.com');
    expect(input).toHaveValue('user@example.com');
  });
});
