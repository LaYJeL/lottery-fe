import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- mocks ------------------------------------------------------------------
const mockKeycloak = { authenticated: false as boolean, tokenParsed: { preferred_username: 'tester' } };
vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({ keycloak: mockKeycloak }),
}));

const mockFetch = vi.fn();
vi.mock('../../api/client', () => ({
  authenticatedFetch: (...args: unknown[]) => mockFetch(...args),
}));

import HomePage from '../HomePage';

describe('HomePage system status', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockKeycloak.authenticated = false;
  });

  it('shows the login prompt when unauthenticated and never calls the API', () => {
    render(<HomePage />);
    expect(screen.getByText(/PLEASE LOGIN TO PLAY/)).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('renders the health response when authenticated', async () => {
    mockKeycloak.authenticated = true;
    mockFetch.mockResolvedValue({ text: () => Promise.resolve('DB OK') });

    render(<HomePage />);

    await waitFor(() => expect(screen.getByText(/DB OK/)).toBeInTheDocument());
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/health');
  });

  it('surfaces a DOWN status when the health check fails', async () => {
    mockKeycloak.authenticated = true;
    mockFetch.mockRejectedValue(new Error('boom'));

    render(<HomePage />);

    await waitFor(() => expect(screen.getByText(/DOWN/)).toBeInTheDocument());
    expect(screen.getByText(/Error: boom/)).toBeInTheDocument();
  });
});
