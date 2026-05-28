import { authenticatedFetch } from './client';
import type { TaskDto } from '../types/task';

export const adminTaskService = {
    getAllTasks: async (): Promise<TaskDto[]> => {
        const response = await authenticatedFetch('/api/v1/admin/tasks');
        return await response.json();
    },

    createTask: async (task: Partial<TaskDto>): Promise<TaskDto> => {
        // Remove empty string for conditionValue if present
        const cleanTask = { ...task };
        if (cleanTask.conditionValue === '') {
            delete cleanTask.conditionValue;
        }

        const response = await authenticatedFetch('/api/v1/admin/tasks', {
            method: 'POST',
            body: JSON.stringify(cleanTask),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to create task: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    },

    deleteTask: async (id: string): Promise<void> => {
        await authenticatedFetch(`/api/v1/admin/tasks/${id}`, {
            method: 'DELETE'
        });
    },

    updateTask: async (id: string, task: Partial<TaskDto>): Promise<TaskDto> => {
        const response = await authenticatedFetch(`/api/v1/admin/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }
};
