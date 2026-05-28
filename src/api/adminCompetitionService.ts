import { authenticatedFetch } from './client';
import type { CompetitionDto } from '../types/competition';

export const adminCompetitionService = {
    createCompetition: async (competition: Partial<CompetitionDto>): Promise<CompetitionDto> => {
        const response = await authenticatedFetch('/api/v1/admin/competitions', {
            method: 'POST',
            body: JSON.stringify(competition)
        });
        return await response.json();
    },

    deleteCompetition: async (id: string | number): Promise<void> => {
        await authenticatedFetch(`/api/v1/admin/competitions/${id}`, {
            method: 'DELETE'
        });
    }
};
