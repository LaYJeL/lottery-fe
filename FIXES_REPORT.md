# lottery-fe — Звіт про виправлення та аналіз

**Дата:** 2026-06-13 · **Гілка:** main · **Модель:** Claude Fable 5
**Стек:** React 19 + TypeScript, Vite, Keycloak, i18next, Vitest.

> Усі зміни закомічено, **не запушено**.

**Базлайн:** `tsc -b` чистий · `eslint .` — **31 проблема** (30 errors) ·
36 тестів зелені.
**Після:** `tsc -b` чистий · `eslint .` — **0 проблем** · **39 тестів** зелені.

## Виправлення

### Гігієна ESLint (chore)
- `design/` — окремий reference-під-проект (власний `package.json`/`vite.config`),
  не імпортується з `src` — винесено в `globalIgnores` (давав 16 із 31 помилок).
- Дозволено `_`-префіксні навмисно невживані ідентифікатори та невживані
  catch-біндінги (`caughtErrors: 'none'`).
- `prefer-as-const` autofix: `'relative' as 'relative'` → `as const` (6 місць).

### Баги ефектів (fix, +3 тести)
- **HomePage** — `setState` синхронно в `useEffect` (гілка «PLEASE LOGIN TO
  PLAY») спричиняв каскадні ре-рендери. Тепер повідомлення **похідне** від
  `keycloak.authenticated`, а health-fetch має cancel-guard (немає setState
  після unmount / зміни auth). +3 тести (гілка без логіну без виклику API;
  health OK; health-фейл → DOWN).
- **ProfilePage** — `useEffect` із неповними залежностями (`exhaustive-deps`):
  `fetchProfile`/`fetchWallet` обгорнуто в `useCallback` і додано в deps
  (стейл-клоужер / пропущений refetch при зміні auth — правило «Data Freshness»).

## Спостереження для подальшого

- **Тихе ковтання помилок** у `ProfilePage` (`.catch(() => {})` для profile/
  wallet) — суперечить критичному правилу CLAUDE.md «Error Visibility: users
  must see meaningful error messages». Варто показувати тост (хук `useToast`
  уже є) — лишив як ідею, бо потребує i18n-ключів і дизайн-рішення.
- `HomePage` показує сирий health-статус як «system status» — більше схоже на
  дев-артефакт; можливо, прибрати з продакшн-UI.
- Інлайн-`style`-обʼєкти в `HomePage` (CLAUDE.md радить Tailwind) — косметика.
- `design/` лінтиться окремо (16 власних помилок: `no-explicit-any`,
  `react-refresh`) — якщо це жива частина, варто почистити; якщо ні — видалити.
