import { authenticatedFetch } from './client';
import type { DashboardStatsDto, RecentActivityDto, UpcomingDrawDto } from '../types/dashboard';

export const dashboardService = {
    /**
     * Get dashboard statistics
     */
    getStats: async (): Promise<DashboardStatsDto> => {
        const response = await authenticatedFetch('/api/v1/dashboard/stats');
        return response.json();
    },

    /**
     * Get recent user activity
     */
    getRecentActivity: async (limit = 5): Promise<RecentActivityDto[]> => {
        const response = await authenticatedFetch(`/api/v1/dashboard/activity?limit=${limit}`);
        return response.json();
    },

    /**
     * Get upcoming lottery draws
     */
    getUpcomingDraws: async (limit = 3): Promise<UpcomingDrawDto[]> => {
        const response = await authenticatedFetch(`/api/v1/dashboard/upcoming-draws?limit=${limit}`);
        return response.json();
    },
};
