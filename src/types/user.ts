export const VerificationLevel = {
    NEW: 'NEW',
    BASIC: 'BASIC',
    VERIFIED: 'VERIFIED'
} as const;

export type VerificationLevel = typeof VerificationLevel[keyof typeof VerificationLevel];

export const AccountStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED'
} as const;

export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];

export interface UserOnboardingDto {
    emailVerified: boolean;
    phoneVerified: boolean;
    emailPresent: boolean;
    phonePresent: boolean;
    firstNamePresent: boolean;
    lastNamePresent: boolean;
    countryPresent: boolean;
    paymentMethodPresent: boolean;
}

export interface UserProfileDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    displayName?: string;
    phoneNumber?: string;
    country?: string;
    birthDate?: string;
    accountStatus: AccountStatus;
    verificationLevel: VerificationLevel;
    onboardingStatus: UserOnboardingDto;
    reputation: number;
    balance: number;
    ticketsPurchased: number;
    competitionEntries: number;
    tasksCompleted: number;
    totalWinnings: number;
    accountLevel: string;
    levelProgress: number;
    emailNotifications: boolean;
    createdAt: string;
}

export interface UserUpdateRequest {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phoneNumber?: string;
    country?: string;
    birthDate?: string;
    displayName?: string;
    emailNotifications?: boolean;
    email?: string;
}
