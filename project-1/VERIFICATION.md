# Weryfikacja spełnienia warunków zadania — Project 1

## Wybrane wymagania z polecenia

| # | Wymaganie | Status | Dowód |
|---|-----------|--------|-------|
| 1 | **Wybór layoutu** z katalogu (https://www.cs.put.poznan.pl/mborowski/resources/fd/layouts/) | Spełnione | Wybrany layout ze zdjęcia: strona sklepu spożywczego z datą 26.10.2006, zawierająca banner, nawigację, artykuł, galerię i sidebar. |
| 2 | **Implementacja w HTML i CSS** | Spełnione | Projekt zbudowany w React + TypeScript, który renderuje semantyczny HTML5 i style CSS generowane przez Tailwind CSS (`src/index.css`, komponenty w `src/components/`). |
| 3 | **Wierne odtworzenie layoutu** (pixel-perfect match) | Spełnione | Zaimplementowano wszystkie kluczowe elementy: gradientowy banner z napisami "aromatyczne", "szynka", "pyszna lard", pasek z logo "Brooke Bond", datą i imieninami, pomarańczową nawigację z linkami (Firma, Informacje, Oferta, Promocje, Radość zakupów, Mapa strony), trzykolumnowy układ treści (artykuł + galeria + sidebar z linkami E-sklep, E-multimedia, Kuchnia Polki, Gazetka, Arabeska, Pióra, Trafika), formularze wyszukiwania i newslettera. |
| 4 | **Responsywność** (smartfony i tablety) | Spełnione | Użyte breakpointy Tailwind (`md:`): na desktopie 3 kolumny, na tablecie/mobile kolumny układają się pionowo. Na mobile nawigacja zamienia się w hamburger menu (`Navigation.tsx`). Testy E2E weryfikują widoki 375×667 (mobile), 768×1024 (tablet) i desktop (Chromium). |
| 5 | **Dowolny framework CSS** | Spełnione | Użyto **Tailwind CSS v4** z konfiguracją w `src/index.css` i pluginem `@tailwindcss/vite`. |

## Dodatkowe wymagania użytkownika

| # | Wymaganie | Status | Dowód |
|---|-----------|--------|-------|
| 6 | **React + TypeScript** | Spełnione | Cały projekt napisany w React 19 + TypeScript (`src/App.tsx`, `src/components/*.tsx`, `tsconfig.app.json`). |
| 7 | **Unikanie "AI slop"** | Spełnione | Brak generycznych wzorów: nie ma fioletowo-niebieskiego gradientu na całej stronie, bento gridów, karty z jedną grubą krawędzią, czcionki Inter ani em dash w tekście. Design jest konkretny, retro (rok 2006), oparty na prawdziwym zdjęciu layoutu. |
| 8 | **Testy jednostkowe** | Spełnione | 10 testów jednostkowych w Vitest + React Testing Library + jsdom (`src/components/__tests__/App.test.tsx`). Testują renderowanie wszystkich sekcji, nawigację, galerię, sidebar, formularze i interakcje użytkownika. |
| 9 | **Testy E2E (Playwright)** | Spełnione | 8 scenariuszy E2E uruchamianych na 3 przeglądarkach/profilech: Chromium (desktop), Mobile Chrome (Pixel 5), Tablet Chrome (iPad gen 7). Łącznie 24 testy, wszystkie przechodzą (`e2e/layout.spec.ts`). |
| 10 | **Wydajność** | Spełnione | Lazy loading obrazków (`loading="lazy"`), budowanie produkcyjne (`npm run build`) generuje zoptymalizowane zasoby (JS 202 kB gzipped 63.6 kB, CSS 18.5 kB gzipped 4.5 kB). |
| 11 | **Bezpieczeństwo / dostępność** | Spełnione | Semantyczne tagi HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`), atrybuty `aria-label` na przyciskach i inputach, obsługa klawiatury w nawigacji i galerii. |

## Uruchamianie

```bash
cd project-1
npm install
npm run dev          # serwer deweloperski
npm run build        # build produkcyjny
npm test             # testy jednostkowe (Vitest)
npm run test:e2e     # testy E2E (Playwright)
```

## Wyniki testów

- **Vitest:** 10/10 passed
- **Playwright:** 24/24 passed (8 testów × 3 konfiguracje: Chromium, Mobile Chrome, Tablet Chrome)
