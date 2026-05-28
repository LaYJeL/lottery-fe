export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TICKET_PURCHASE' | 'COMPETITION_ENTRY' | 'REWARD' | 'OTHER';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'PROCESSING' | 'CANCELLED';

export interface WalletStatsDto {
    totalDeposited: number;
    totalWithdrawn: number;
    totalSpent: number;
}

export interface WalletDto {
    id: string;
    balance: number;
    currency: string;
    monthlyStats: WalletStatsDto;
}

export interface TransactionDto {
    id: string; // UUID or number, depending on backend, assuming UUID derived from Swagger
    type: TransactionType;
    amount: number;
    description: string;
    status: TransactionStatus;
    createdAt: string; // ISO Date string
    paymentMethodLabel?: string;
}

export interface PaymentMethodDto {
    id: string;
    type: string; // e.g., 'CRYPTO_USDT_TRC20', 'BANK_TRANSFER'
    label: string;
    identifier: string; // e.g., masked card number or account
    primary: boolean;
}

export interface DepositRequest {
    amount: number;
    paymentMethodId: string;
}

export interface WithdrawRequest {
    amount: number;
    paymentMethodId: string;
}

export interface AddPaymentMethodRequest {
    type: string;
    identifier: string;
    label: string;
}

export type PaymentMethodType =
    | 'CRYPTO_USDT_TRC20'
    | 'CRYPTO_USDT_ERC20'
    | 'CREDIT_CARD'
    | 'PAYPAL';

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}
