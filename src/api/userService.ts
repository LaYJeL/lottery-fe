import { authenticatedFetch } from './client';
import type { UserProfileDto, UserUpdateRequest } from '../types/user';

export const userService = {
    getProfile: async (): Promise<UserProfileDto> => {
        const response = await authenticatedFetch('/api/v1/users/me');
        return await response.json();
    },
    updateProfile: async (data: UserUpdateRequest): Promise<void> => {
        await authenticatedFetch('/api/v1/users/me', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    sendPhoneVerification: async (): Promise<void> => {
        await authenticatedFetch('/api/v1/users/me/verification/phone/send', {
            method: 'POST'
        });
    },
    confirmPhoneVerification: async (code: string): Promise<void> => {
        await authenticatedFetch('/api/v1/users/me/verification/phone/confirm', {
            method: 'POST',
            body: JSON.stringify({ code })
        });
    },
    updateEmail: async (email: string): Promise<void> => {
        await authenticatedFetch('/api/v1/users/me/email', {
            method: 'PUT',
            body: JSON.stringify({ email })
        });
    }
};
