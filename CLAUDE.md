# CLAUDE.md - Lottery Frontend Context

## 1. Project Overview

**Goal:** Frontend application for a lottery and raffle service where users complete tasks to participate in competitions (lotteries/giveaways), manage their wallet, and track rewards.

### Key Features
* **Authentication:** Keycloak-based SSO with JWT tokens
* **Tasks:** Complete actions to earn reputation and tickets
* **Competitions:** Browse, join, and track lottery/giveaway entries
* **Wallet:** Deposit, withdraw, and view transaction history
* **Profile:** User settings, email/phone verification, notifications
* **Admin:** Task and competition management (role-based)

### Critical Business Rules
1. **Financial Accuracy:** All monetary displays must match backend precision
2. **Auth State:** Never show protected content to unauthenticated users
3. **Error Visibility:** Users must see meaningful error messages, not silent failures
4. **Data Freshness:** Wallet balances and competition status must reflect current state

---

## 2. Technology Stack

### Core Stack
* **Framework:** React 19.x with TypeScript 5.x (strict mode)
* **Build Tool:** Vite 7.x
* **Styling:** Tailwind CSS 4.x
* **Routing:** React Router DOM 7.x
* **Authentication:** Keycloak (keycloak-js, @react-keycloak/web)
* **Icons:** Lucide React
* **Internationalization:** i18next, react-i18next
* **HTTP Client:** Native Fetch API with authenticated wrapper

### Project Structure
```
src/
├── api/              # API service layer (authenticated fetch)
├── components/       # Reusable UI components
├── context/          # React Context providers (currently empty)
├── hooks/            # Custom React hooks
├── pages/            # Page-level components (route targets)
├── types/            # TypeScript interfaces and types
├── locales/          # i18n translation files (en, ru, ua)
├── utils/            # Utility functions
├── assets/           # Static assets (images, fonts)
├── App.tsx           # Main app with routing
├── main.tsx          # Entry point
├── keycloak.ts       # Keycloak configuration
└── i18n.ts           # i18next configuration
```

---

## 3. Coding Standards and Guidelines

### 3.1 General Principles
* **TypeScript First:** Never use `any` type; define proper interfaces
* **Functional Components:** Always use functional components with hooks
* **Small Components:** Keep components under 200 lines; extract when larger
* **Single Responsibility:** One component = one purpose
* **Composition Over Inheritance:** Compose small components into larger ones

### 3.2 Component Patterns

**File Naming:**
* Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
* Hooks: `camelCase.ts` with `use` prefix (e.g., `useWallet.ts`)
* Types: `camelCase.ts` (e.g., `wallet.ts`)
* Utilities: `camelCase.ts` (e.g., `formatCurrency.ts`)

**Component Structure:**
```typescript
// 1. Imports (external, then internal, then styles)
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SomeIcon } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { UserCard } from '../components/UserCard';
import type { User } from '../types/user';

// 2. Types/Interfaces for this component
interface UserListProps {
  users: User[];
  onSelect: (user: User) => void;
}

// 3. Component definition
export function UserList({ users, onSelect }: UserListProps) {
  // 4. Hooks first
  const { t } = useTranslation();
  const [selected, setSelected] = useState<User | null>(null);

  // 5. Effects
  useEffect(() => { /* ... */ }, []);

  // 6. Event handlers (use useCallback for passed-down functions)
  const handleSelect = useCallback((user: User) => {
    setSelected(user);
    onSelect(user);
  }, [onSelect]);

  // 7. Render
  return (/* JSX */);
}
```

### 3.3 TypeScript Guidelines

**Never Use `any`:**
```typescript
// BAD
const handleData = (data: any) => { ... }

// GOOD
interface ApiResponse<T> {
  data: T;
  error?: string;
}
const handleData = (data: ApiResponse<User>) => { ... }
```

**Use Proper Event Types:**
```typescript
// BAD
const handleClick = (e: any) => { ... }

// GOOD
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```

**Define Return Types for Complex Functions:**
```typescript
// GOOD
function useWallet(): {
  balance: number;
  isLoading: boolean;
  deposit: (amount: number) => Promise<void>;
} {
  // ...
}
```

### 3.4 State Management

**Local State:**
* Use `useState` for component-specific state
* Use `useReducer` for complex state with multiple sub-values

**Shared State:**
* Use React Context for auth state, theme, language
* Consider Zustand/Jotai for complex global state (wallet, user profile)

**Server State:**
* Treat API data as server state, not application state
* Consider React Query/TanStack Query for caching and synchronization

**State Lifting:**
* Lift state only when multiple siblings need it
* Prefer composition and passing data down over lifting up

### 3.5 API Integration

**Service Pattern:**
```typescript
// api/userService.ts
import { authenticatedFetch } from './client';
import type { User, UpdateUserRequest } from '../types/user';

export const userService = {
  getProfile: (): Promise<User> =>
    authenticatedFetch('/api/v1/profile'),

  updateProfile: (data: UpdateUserRequest): Promise<User> =>
    authenticatedFetch('/api/v1/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
```

**Error Handling:**
```typescript
// GOOD - handle errors properly
try {
  const user = await userService.getProfile();
  setUser(user);
} catch (error) {
  if (error instanceof ApiError) {
    setError(error.message);
  } else {
    setError(t('errors.unexpected'));
  }
} finally {
  setIsLoading(false);
}
```

**Never Swallow Errors:**
```typescript
// BAD
.catch(err => console.error(err));

// GOOD
.catch(err => {
  setError(err.message || t('errors.loadFailed'));
  // Optional: report to error tracking service
});
```

### 3.6 Error Handling (CRITICAL)

**User-Facing Errors:**
* Never use `alert()` for error messages
* Display errors inline or via toast notifications
* Provide actionable guidance when possible

**Error Boundaries:**
* Wrap route components with ErrorBoundary
* Provide fallback UI for crashed components

**Loading States:**
* Always show loading indicator during async operations
* Disable form buttons while submitting
* Show skeleton loaders for content areas

**Error State Pattern:**
```typescript
interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Usage
const [state, setState] = useState<AsyncState<User>>({
  data: null,
  isLoading: true,
  error: null,
});
```

### 3.7 Styling Guidelines

**Tailwind CSS Preferred:**
```typescript
// GOOD - use Tailwind classes
<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">

// AVOID - inline style objects (creates new object each render)
<button style={{ padding: '8px 16px', backgroundColor: '#4f46e5' }}>
```

**Extract Repeated Styles:**
```typescript
// styles/constants.ts
export const buttonStyles = {
  primary: 'px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700',
  secondary: 'px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700',
  danger: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700',
};

// Or use Tailwind @apply in CSS
```

**Color Palette:**
* Primary: `indigo-600` (#4f46e5)
* Secondary: `purple-600` (#9333ea)
* Background: `slate-800` (dark theme)
* Card Background: `rgba(30, 41, 59, 0.7)`
* Text Primary: `white`
* Text Secondary: `slate-400` (#94a3b8)
* Success: `green-500`
* Error: `red-500`
* Warning: `yellow-500`

### 3.8 Form Handling

**Controlled Components:**
```typescript
const [email, setEmail] = useState('');
const [errors, setErrors] = useState<Record<string, string>>({});

const validateEmail = (value: string): string | null => {
  if (!value) return t('validation.required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('validation.invalidEmail');
  return null;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const emailError = validateEmail(email);
  if (emailError) {
    setErrors({ email: emailError });
    return;
  }

  setIsSubmitting(true);
  try {
    await userService.updateEmail(email);
    // success handling
  } catch (error) {
    setErrors({ form: error.message });
  } finally {
    setIsSubmitting(false);
  }
};
```

**Validation Rules:**
* Validate on blur for immediate feedback
* Validate all fields on submit
* Show inline error messages below inputs
* Use proper input types (`email`, `tel`, `number`)

### 3.9 Accessibility (a11y)

**Required Practices:**
* All images must have `alt` attributes
* All interactive elements must be keyboard accessible
* Use semantic HTML (`button`, `nav`, `main`, `article`)
* Provide ARIA labels for icon-only buttons
* Ensure sufficient color contrast (4.5:1 minimum)
* Manage focus in modals (trap focus, return on close)

**Examples:**
```typescript
// Icon button with accessibility
<button
  onClick={handleEdit}
  aria-label={t('actions.edit')}
  className="p-2 hover:bg-slate-700 rounded"
>
  <Edit className="w-4 h-4" />
</button>

// Form field with error
<div>
  <label htmlFor="email" className="block text-sm">
    {t('profile.email')}
  </label>
  <input
    id="email"
    type="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <p id="email-error" className="text-red-500 text-sm" role="alert">
      {errors.email}
    </p>
  )}
</div>
```

### 3.10 Internationalization (i18n)

**Translation Keys:**
* Use dot notation for namespacing: `profile.email.label`
* Keep keys semantic, not literal: `errors.notFound` not `errors.404`
* Always use `t()` function, never hardcode user-facing strings

**Structure:**
```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel"
  },
  "profile": {
    "title": "Profile",
    "email": {
      "label": "Email",
      "placeholder": "Enter your email"
    }
  },
  "errors": {
    "required": "This field is required",
    "invalidEmail": "Please enter a valid email"
  }
}
```

### 3.11 Performance

**Memoization:**
```typescript
// Memoize expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Memoize callbacks passed to children
const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []);

// Memoize components that receive same props
const MemoizedCard = React.memo(UserCard);
```

**Code Splitting:**
```typescript
// Lazy load routes
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// With Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
</Suspense>
```

**Avoid:**
* Creating objects/arrays in render (move to useMemo or outside component)
* Inline arrow functions for event handlers passed to children
* Unnecessary re-renders (use React DevTools Profiler)

### 3.12 Security

**Never Store Sensitive Data:**
* No tokens in localStorage (Keycloak handles this)
* No passwords in state
* No PII logging to console

**XSS Prevention:**
* React escapes by default; never use `dangerouslySetInnerHTML`
* Sanitize any user-generated content displayed

**API Security:**
* All API calls must go through `authenticatedFetch`
* Never expose API keys in frontend code
* Use environment variables for configuration

### 3.13 Testing Standards

**Test Types:**
* **Unit Tests:** Utility functions, hooks, isolated components
* **Integration Tests:** Component interactions, form submissions
* **E2E Tests:** Critical user flows (auth, wallet, competition entry)

**File Naming:**
* `ComponentName.test.tsx` - co-located with component
* `useHook.test.ts` - co-located with hook

**What to Test:**
* User interactions (clicks, form input)
* Conditional rendering
* Error states
* Loading states
* API integration (mocked)

**Test Pattern:**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should display user name', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('should show error when save fails', async () => {
    const mockSave = vi.fn().mockRejectedValue(new Error('Failed'));
    render(<UserProfile user={mockUser} onSave={mockSave} />);

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed');
    });
  });
});
```

---

## 4. Workflow Guidelines

### 4.1 When Adding a New Feature
1. **Types First:** Define TypeScript interfaces for data structures
2. **API Layer:** Add service methods if new endpoints needed
3. **Components:** Build from smallest (button) to largest (page)
4. **State Management:** Decide local vs shared state needs
5. **Styling:** Use Tailwind classes, extract if repeated
6. **i18n:** Add all user-facing strings to locale files
7. **Testing:** Write tests for critical paths
8. **Accessibility:** Verify keyboard navigation and screen reader

### 4.2 When Refactoring
1. **Tests First:** Ensure existing behavior is covered
2. **Small Steps:** One component at a time
3. **No Logic Changes:** Preserve existing behavior
4. **Extract, Don't Rewrite:** Pull out pieces, don't rebuild
5. **Verify:** Manual testing after each change

### 4.3 When Fixing Bugs
1. **Reproduce:** Confirm the bug in development
2. **Isolate:** Find the specific component/function
3. **Test:** Write a failing test if possible
4. **Fix:** Minimal changes to resolve
5. **Verify:** Test fix and check for regressions

---

## 5. Code Review Checklist

Before submitting code for review, verify:

**TypeScript & Code Quality:**
- [ ] No `any` types - proper interfaces defined
- [ ] No `console.log`/`console.error` statements
- [ ] No hardcoded strings - using i18n
- [ ] No hardcoded URLs - using environment variables

**Components:**
- [ ] Components under 200 lines
- [ ] Props interface defined
- [ ] Loading state handled
- [ ] Error state handled and displayed to user
- [ ] No `alert()` dialogs

**State & Effects:**
- [ ] Cleanup in useEffect where needed
- [ ] Dependencies array complete and correct
- [ ] Memoization for expensive operations
- [ ] useCallback for handlers passed to children

**Accessibility:**
- [ ] Images have alt text
- [ ] Buttons have accessible names
- [ ] Form inputs have labels
- [ ] Focus management in modals

**Styling:**
- [ ] Using Tailwind classes (not inline styles)
- [ ] Responsive design considered
- [ ] Dark theme compatible

**API & Data:**
- [ ] Errors caught and displayed
- [ ] Loading indicators shown
- [ ] Using authenticatedFetch for API calls

---

## 6. Environment Setup

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application runs at http://localhost:5173
# API proxied to http://localhost:8088
```

### Environment Variables
```bash
# .env.local (do not commit)
VITE_API_URL=http://localhost:8088
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=lottery
VITE_KEYCLOAK_CLIENT_ID=lottery-frontend
```

### Build
```bash
# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 7. Common Pitfalls to Avoid

| Pitfall | Correct Approach |
|---------|------------------|
| Using `any` type | Define proper TypeScript interface |
| `console.log` in production | Remove or use proper logging service |
| Inline style objects | Use Tailwind classes or extract constants |
| `alert()` for errors | Use toast notifications or inline messages |
| Hardcoded strings | Use i18n `t()` function |
| Large monolithic components | Extract into smaller, focused components |
| Missing loading states | Always show loading indicator during async |
| Swallowing errors | Display errors to user, log for debugging |
| Missing error boundaries | Wrap routes with ErrorBoundary |
| No accessibility attributes | Add ARIA labels, semantic HTML |
| Inline arrow in JSX props | Use useCallback for passed handlers |
| Creating objects in render | Move to useMemo or outside component |
| Promise.all without handling | Use Promise.allSettled for resilience |
| Missing form validation | Validate inputs before submission |

---

## 8. Glossary

| Term | Definition |
|------|------------|
| Competition | A lottery or giveaway event users can enter |
| Task | An action users complete for rewards |
| Reputation | Points earned from completing tasks |
| Wallet | User's financial account within the system |
| Entry | A user's participation in a competition |
| SSO | Single Sign-On via Keycloak |
| JWT | JSON Web Token for authentication |
| i18n | Internationalization (multi-language support) |
| a11y | Accessibility (making app usable for all) |

## Claude Code Setup

- **Model: Claude Fable 5** — pinned via `.claude/settings.json`
  (`claude-fable-5[1m]`). Do not downgrade.
- Shared environment (MCP servers, skills, plugins) is provisioned by
  [LaYJeL/Claude_setup](https://github.com/LaYJeL/Claude_setup) — see its
  `PROJECTS.md` for the cross-project policy.
- On first session in a fresh clone, consider running `/graphify .` to build
  the codebase knowledge graph.
