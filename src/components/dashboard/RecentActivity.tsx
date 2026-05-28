import { Activity, Ticket, Trophy, Star, ArrowUpCircle, ArrowDownCircle, Gift } from 'lucide-react';
import type { RecentActivityDto } from '../../types/dashboard';
import { cardStyle } from './dashboardStyles';

interface RecentActivityProps {
    activities: RecentActivityDto[];
}

const activityConfig: Record<RecentActivityDto['type'], { icon: typeof Ticket; color: string }> = {
    LOTTERY: { icon: Ticket, color: '#646cff' },
    COMPETITION: { icon: Trophy, color: '#ec4899' },
    TASK: { icon: Star, color: '#eab308' },
    DEPOSIT: { icon: ArrowDownCircle, color: '#22c55e' },
    WITHDRAWAL: { icon: ArrowUpCircle, color: '#3b82f6' },
    REWARD: { icon: Gift, color: '#a855f7' },
};

function formatTimeAgo(timestamp: string): string {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
}

export function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div style={cardStyle}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Activity</h2>
                <Activity size={20} color="#94a3b8" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activities.length === 0 ? (
                    <div style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>
                        No recent activity
                    </div>
                ) : (
                    activities.map((activity) => {
                        const config = activityConfig[activity.type];
                        const Icon = config.icon;

                        return (
                            <div key={activity.id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <div style={{
                                    padding: '0.75rem',
                                    borderRadius: '0.75rem',
                                    backgroundColor: `${config.color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '1rem'
                                }}>
                                    <Icon size={24} color={config.color} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        marginBottom: '0.25rem',
                                        color: '#e2e8f0'
                                    }}>
                                        {activity.title}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        {activity.description}
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {formatTimeAgo(activity.timestamp)}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
