export type CompetitionType = 'PHOTOGRAPHY' | 'WRITING' | 'DESIGN' | 'CULINARY' | 'VIDEO' | 'MUSIC' | 'GAMING' | 'OTHER';

export type CompetitionStatus = 'DRAFT' | 'ACTIVE' | 'ENDED' | 'CANCELLED';

export type EntryStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'WINNER';

export interface CompetitionDto {
    id: string; // UUID
    title: string;
    type: CompetitionType;
    description: string;
    prize: string; // Changed to string as per Swagger
    entryFee: number;
    startTime: string; // ISO date-time
    endTime: string;   // ISO date-time
    imageUrl: string;
    participantsCount: number;
    status: CompetitionStatus;
    entered: boolean;
    requiresApproval?: boolean;
}

export interface CompetitionEntryDto {
    id: string; // UUID
    competitionId: string; // UUID
    competitionTitle: string;
    competitionType: CompetitionType;
    content: string;
    status: EntryStatus;
    submittedAt: string; // ISO date-time
    votes: number;
}
