import { authenticatedFetch } from './client';
import type { LotteryDto, LotteryTicketDto, PurchaseTicketRequest, PurchaseTicketResponse } from '../types/lottery';

export const lotteryService = {
    /**
     * Get all available lotteries
     */
    getAllLotteries: async (): Promise<LotteryDto[]> => {
        const response = await authenticatedFetch('/api/v1/lotteries');
        return response.json();
    },

    /**
     * Get a specific lottery by ID
     */
    getLotteryById: async (id: string): Promise<LotteryDto> => {
        const response = await authenticatedFetch(`/api/v1/lotteries/${id}`);
        return response.json();
    },

    /**
     * Get user's lottery tickets
     */
    getMyTickets: async (): Promise<LotteryTicketDto[]> => {
        const response = await authenticatedFetch('/api/v1/lotteries/tickets/me');
        return response.json();
    },

    /**
     * Get user's active (pending draw) tickets
     */
    getMyActiveTickets: async (): Promise<LotteryTicketDto[]> => {
        const response = await authenticatedFetch('/api/v1/lotteries/tickets/me/active');
        return response.json();
    },

    /**
     * Purchase lottery tickets
     */
    purchaseTickets: async (request: PurchaseTicketRequest): Promise<PurchaseTicketResponse> => {
        const response = await authenticatedFetch('/api/v1/lotteries/tickets/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        return response.json();
    },
};
