import { authenticatedFetch } from './client';
import type { AddPaymentMethodRequest, DepositRequest, Page, PaymentMethodDto, TransactionDto, WalletDto, WithdrawRequest } from '../types/wallet';

const WALLET_API_BASE = '/api/v1/wallet';

export const walletService = {
    getWalletDetails: async (): Promise<WalletDto> => {
        const response = await authenticatedFetch(WALLET_API_BASE);
        return response.json();
    },

    getTransactions: async (page = 0, size = 10): Promise<Page<TransactionDto>> => {
        // Construct query params
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sort: 'createdAt,desc' // Default sort by newest
        });

        const response = await authenticatedFetch(`${WALLET_API_BASE}/transactions?${params.toString()}`);
        return response.json();
    },

    getPaymentMethods: async (): Promise<PaymentMethodDto[]> => {
        const response = await authenticatedFetch(`${WALLET_API_BASE}/payment-methods`);
        return response.json();
    },

    deposit: async (request: DepositRequest): Promise<void> => {
        await authenticatedFetch(`${WALLET_API_BASE}/deposit`, {
            method: 'POST',
            body: JSON.stringify(request)
        });
    },

    withdraw: async (request: WithdrawRequest): Promise<void> => {
        await authenticatedFetch(`${WALLET_API_BASE}/withdraw`, {
            method: 'POST',
            body: JSON.stringify(request)
        });
    },

    addPaymentMethod: async (request: AddPaymentMethodRequest): Promise<PaymentMethodDto> => {
        const response = await authenticatedFetch(`${WALLET_API_BASE}/payment-methods`, {
            method: 'POST',
            body: JSON.stringify(request)
        });
        return response.json();
    }
};
