import { authenticatedFetch } from './client';
import type { UserTaskDto } from '../types/task';

export const taskService = {
    getMyTasks: async (): Promise<UserTaskDto[]> => {
        const response = await authenticatedFetch('/api/v1/tasks');
        return await response.json();
    },

    claimReward: async (taskId: string): Promise<void> => {
        await authenticatedFetch(`/api/v1/tasks/${taskId}/claim`, {
            method: 'POST'
        });
    }
};
