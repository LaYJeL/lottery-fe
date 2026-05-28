import { authenticatedFetch } from './client';
import type { CompetitionDto, CompetitionEntryDto } from '../types/competition';

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export const competitionService = {
    getCompetitions: async (page: number = 0, size: number = 6): Promise<PageResponse<CompetitionDto>> => {
        const response = await authenticatedFetch(`/api/v1/competitions?page=${page}&size=${size}`);
        return await response.json();
    },

    getMyEntries: async (): Promise<CompetitionEntryDto[]> => {
        const response = await authenticatedFetch('/api/v1/competitions/my-entries');
        return await response.json();
    },

    getCompetitionById: async (id: string | number): Promise<CompetitionDto> => {
        const response = await authenticatedFetch(`/api/v1/competitions/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch competition details');
        }
        return await response.json();
    },

    joinCompetition: async (id: string | number): Promise<void> => {
        await authenticatedFetch(`/api/v1/competitions/${id}/join`, {
            method: 'POST'
        });
    },

    submitEntry: async (id: string | number, content: string): Promise<void> => {
        await authenticatedFetch(`/api/v1/competitions/${id}/submit`, {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    }
};
