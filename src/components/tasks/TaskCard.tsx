import { CheckCircle2, Circle, Star, Loader2 } from 'lucide-react';
import type { UserTaskDto } from '../../types/task';
import { labelStyle } from './taskStyles';

interface TaskCardProps {
    task: UserTaskDto;
    claimingTaskId: string | null;
    onClaim: (taskId: string) => void;
    variant?: 'default' | 'weekly' | 'special';
}

export function TaskCard({ task, claimingTaskId, onClaim, variant = 'default' }: TaskCardProps) {
    const isClaimed = task.status === 'CLAIMED';
    const isCompleted = task.status === 'COMPLETED';
    const isClaiming = claimingTaskId === task.taskId;

    const getBackgroundStyle = () => {
        if (variant === 'weekly') {
            return {
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)'
            };
        }
        if (variant === 'special') {
            return {
                background: 'linear-gradient(to right, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                border: '1px solid rgba(147, 51, 234, 0.3)'
            };
        }
        return {
            background: isClaimed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
            border: isClaimed ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255,255,255,0.1)'
        };
    };

    const starColor = variant === 'special' ? '#a855f7' : '#eab308';

    if (variant === 'weekly') {
        return (
            <div style={{ padding: '1rem', ...getBackgroundStyle(), borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div>
                        <div style={{ marginBottom: '0.25rem', fontWeight: 500 }}>{task.title}</div>
                        <div style={{ ...labelStyle, marginBottom: 0 }}>{task.description}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: starColor, fontWeight: 600 }}>
                            <Star size={20} fill={starColor} />
                            <span>+{task.rewardPoints}</span>
                        </div>
                        {isCompleted && (
                            <button
                                onClick={() => onClaim(task.taskId)}
                                disabled={isClaiming}
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    background: '#22c55e',
                                    color: 'white',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 600
                                }}
                            >
                                {isClaiming ? <Loader2 size={14} className="animate-spin" /> : 'Claim'}
                            </button>
                        )}
                        {isClaimed && (
                            <span style={{ fontSize: '0.875rem', color: '#22c55e', fontWeight: 600 }}>Claimed</span>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: '0.5rem', background: 'white', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${task.progressPercentage}%`, background: '#6366f1', borderRadius: '999px' }} />
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{task.currentCount}/{task.targetCount}</div>
                </div>
            </div>
        );
    }

    if (variant === 'special') {
        return (
            <div style={{ padding: '1rem', ...getBackgroundStyle(), borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>
                            {task.actionType === 'VERIFY_ID' ? '🎯' : task.actionType === 'REFERRAL' ? '👥' : '🏆'}
                        </div>
                        <div>
                            <div style={{ marginBottom: '0.25rem', fontWeight: 500 }}>{task.title}</div>
                            <div style={{ ...labelStyle, marginBottom: 0 }}>{task.description}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: starColor, fontWeight: 600 }}>
                            <Star size={20} fill={starColor} />
                            <span>+{task.rewardPoints}</span>
                        </div>
                        {isCompleted ? (
                            <button
                                onClick={() => onClaim(task.taskId)}
                                disabled={isClaiming}
                                style={{ padding: '0.25rem 0.5rem', background: '#22c55e', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                                Claim
                            </button>
                        ) : isClaimed ? (
                            <div style={{ color: '#22c55e', fontSize: '0.75rem' }}>Claimed</div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                ...getBackgroundStyle(),
                borderRadius: '0.75rem'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isClaimed ? <CheckCircle2 size={24} color="#22c55e" /> : <Circle size={24} color="#94a3b8" />}
                <div>
                    <div style={{ marginBottom: '0.25rem', fontWeight: 500 }}>{task.title}</div>
                    <div style={{ ...labelStyle, marginBottom: 0 }}>{task.description}</div>
                    {task.targetCount > 1 && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                            Progress: {task.currentCount}/{task.targetCount}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: starColor, fontWeight: 600 }}>
                    <Star size={20} fill={starColor} />
                    <span>+{task.rewardPoints}</span>
                </div>
                {isCompleted ? (
                    <button
                        onClick={() => onClaim(task.taskId)}
                        disabled={isClaiming}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#22c55e',
                            color: 'white',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {isClaiming && <Loader2 size={16} className="animate-spin" />}
                        Claim
                    </button>
                ) : isClaimed ? (
                    <span style={{ fontSize: '0.875rem', color: '#22c55e', fontWeight: 600 }}>Claimed</span>
                ) : (
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                        {task.targetCount > 1 ? `${Math.round(task.progressPercentage)}%` : 'In Progress'}
                    </span>
                )}
            </div>
        </div>
    );
}
