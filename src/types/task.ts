export type TaskCategory = 'DAILY' | 'WEEKLY' | 'ACHIEVEMENT' | 'SPECIAL' | 'ONETIME';

export type TaskActionType =
    | 'LOGIN'
    | 'PURCHASE_TICKET'
    | 'REFERRAL'
    | 'VOTE'
    | 'VERIFY_ID'
    | 'CHECK_RESULTS';

export type TaskStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CLAIMED';

export interface UserTaskDto {
    taskId: string;
    title: string;
    description: string;
    category: TaskCategory;
    actionType: TaskActionType;
    targetCount: number;
    rewardPoints: number;
    rewardCurrency: number;
    currentCount: number;
    status: TaskStatus;
    progressPercentage: number;
    icon?: string;
}

export interface TaskDto {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    actionType: TaskActionType;
    conditionValue?: string;
    targetCount: number;
    rewardPoints: number;
    rewardCurrency: number;
    requiredLevel?: string;
    active: boolean;
    icon?: string;
}
