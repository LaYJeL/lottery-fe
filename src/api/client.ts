import keycloak from "../keycloak";
import { maintenanceEvent } from "../utils/maintenanceEvent";

// const BASE_URL = 'http://localhost:6969'; // Invalid port to force network error
const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
    if (!keycloak.authenticated) {
        throw new Error("User not authenticated");
    }

    try {
        await keycloak.updateToken(30);
    } catch (error) {
        keycloak.login();
        throw error;
    }

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        'Authorization': `Bearer ${keycloak.token}`
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (response.status === 503) {
            maintenanceEvent.trigger();
            throw new Error('Service Unavailable');
        }

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        // Check if it's a network error (fetch failed completely)
        // or if we explicitly threw a 503 error above
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            maintenanceEvent.trigger();
        }
        throw error;
    }
}
