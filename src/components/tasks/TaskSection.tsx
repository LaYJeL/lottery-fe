import { Calendar, CheckCircle2, Gift } from 'lucide-react';
import type { UserTaskDto } from '../../types/task';
import { TaskCard } from './TaskCard';
import { cardStyle } from './taskStyles';

interface TaskSectionProps {
    title: string;
    subtitle?: string;
    tasks: UserTaskDto[];
    claimingTaskId: string | null;
    onClaim: (taskId: string) => void;
    variant?: 'daily' | 'weekly' | 'onetime' | 'special';
}

export function TaskSection({ title, subtitle, tasks, claimingTaskId, onClaim, variant = 'daily' }: TaskSectionProps) {
    if (tasks.length === 0) return null;

    const getIcon = () => {
        switch (variant) {
            case 'onetime':
                return <CheckCircle2 size={16} />;
            case 'special':
                return <Gift size={24} color="#a855f7" />;
            default:
                return <Calendar size={16} />;
        }
    };

    const getCardVariant = (): 'default' | 'weekly' | 'special' => {
        if (variant === 'weekly') return 'weekly';
        if (variant === 'special') return 'special';
        return 'default';
    };

    return (
        <div style={{ ...cardStyle, marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {variant === 'special' && getIcon()}
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
                </div>
                {subtitle && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                        {variant !== 'special' && getIcon()}
                        <span>{subtitle}</span>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: variant === 'weekly' ? '1rem' : '0.75rem' }}>
                {tasks.map(task => (
                    <TaskCard
                        key={task.taskId}
                        task={task}
                        claimingTaskId={claimingTaskId}
                        onClaim={onClaim}
                        variant={getCardVariant()}
                    />
                ))}
            </div>
        </div>
    );
}
