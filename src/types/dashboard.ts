export interface DashboardStatsDto {
    balance: number;
    currency: string;
    reputation: number;
    activeTickets: number;
    activeCompetitions: number;
    balanceChange?: string;
    reputationChange?: string;
    ticketsChange?: string;
    competitionsChange?: string;
}

export interface RecentActivityDto {
    id: string;
    type: 'LOTTERY' | 'COMPETITION' | 'TASK' | 'DEPOSIT' | 'WITHDRAWAL' | 'REWARD';
    title: string;
    description: string;
    timestamp: string;
    amount?: number;
}

export interface UpcomingDrawDto {
    id: string;
    name: string;
    prize: string;
    prizeAmount: number;
    drawTime: string;
    participantsCount: number;
    maxParticipants?: number;
    userTickets: number;
}
