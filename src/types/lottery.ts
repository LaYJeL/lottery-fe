export type LotteryType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'INSTANT';
export type LotteryStatus = 'ACTIVE' | 'DRAWING' | 'COMPLETED' | 'CANCELLED';
export type TicketStatus = 'ACTIVE' | 'WON' | 'LOST' | 'REFUNDED';

export interface LotteryDto {
    id: string;
    name: string;
    description: string;
    type: LotteryType;
    status: LotteryStatus;
    prize: string;
    prizeAmount: number;
    ticketPrice: number;
    drawTime: string; // ISO date string
    participantsCount: number;
    maxParticipants?: number;
    odds?: string;
    color?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LotteryTicketDto {
    id: string;
    lotteryId: string;
    lotteryName: string;
    ticketNumber: string;
    status: TicketStatus;
    purchaseDate: string;
    drawDate: string;
    prizeWon?: string;
}

export interface PurchaseTicketRequest {
    lotteryId: string;
    quantity: number;
}

export interface PurchaseTicketResponse {
    tickets: LotteryTicketDto[];
    totalCost: number;
    newBalance: number;
}

export interface LotteryResultDto {
    lotteryId: string;
    lotteryName: string;
    drawDate: string;
    winningNumbers?: string[];
    winners: {
        userId: string;
        username: string;
        ticketNumber: string;
        prize: string;
    }[];
}
