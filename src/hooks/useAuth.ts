import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';

export interface UseAuthReturn {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        id?: string;
        email?: string;
        name?: string;
        preferredUsername?: string;
    } | null;
    token: string | undefined;
    roles: string[];
    hasRole: (role: string) => boolean;
    isAdmin: boolean;
    login: (redirectUri?: string) => void;
    logout: (redirectUri?: string) => void;
    register: (redirectUri?: string) => void;
}

export function useAuth(): UseAuthReturn {
    const { keycloak, initialized } = useKeycloak();

    const isAuthenticated = !!keycloak.authenticated;
    const isLoading = !initialized;

    const user = isAuthenticated && keycloak.tokenParsed ? {
        id: keycloak.tokenParsed.sub,
        email: keycloak.tokenParsed.email as string | undefined,
        name: keycloak.tokenParsed.name as string | undefined,
        preferredUsername: keycloak.tokenParsed.preferred_username as string | undefined,
    } : null;

    const token = keycloak.token;

    const roles = keycloak.realmAccess?.roles || [];

    const hasRole = useCallback((role: string): boolean => {
        return keycloak.hasRealmRole(role);
    }, [keycloak]);

    const isAdmin = hasRole('ADMIN');

    const login = useCallback((redirectUri?: string) => {
        keycloak.login({ redirectUri });
    }, [keycloak]);

    const logout = useCallback((redirectUri?: string) => {
        keycloak.logout({ redirectUri });
    }, [keycloak]);

    const register = useCallback((redirectUri?: string) => {
        keycloak.register({ redirectUri });
    }, [keycloak]);

    return {
        isAuthenticated,
        isLoading,
        user,
        token,
        roles,
        hasRole,
        isAdmin,
        login,
        logout,
        register,
    };
}
