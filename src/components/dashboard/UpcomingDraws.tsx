import { Ticket } from 'lucide-react';
import type { UpcomingDrawDto } from '../../types/dashboard';
import { cardStyle } from './dashboardStyles';

interface UpcomingDrawsProps {
    draws: UpcomingDrawDto[];
}

function formatTimeRemaining(drawTime: string): string {
    const now = new Date();
    const draw = new Date(drawTime);
    const diffMs = draw.getTime() - now.getTime();

    if (diffMs <= 0) return 'Drawing soon';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

export function UpcomingDraws({ draws }: UpcomingDrawsProps) {
    return (
        <div style={cardStyle}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Upcoming Draws</h2>
                <Ticket size={20} color="#94a3b8" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {draws.length === 0 ? (
                    <div style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>
                        No upcoming draws
                    </div>
                ) : (
                    draws.map((draw) => {
                        const progressPercent = draw.maxParticipants
                            ? Math.min((draw.participantsCount / draw.maxParticipants) * 100, 100)
                            : 65; // Default progress if no max

                        return (
                            <div
                                key={draw.id}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem'
                                }}>
                                    <div>
                                        <div style={{ marginBottom: '0.25rem', color: '#e2e8f0' }}>
                                            {draw.name}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                                            {draw.participantsCount.toLocaleString()} participants
                                            {draw.userTickets > 0 && (
                                                <span style={{ color: '#22c55e', marginLeft: '0.5rem' }}>
                                                    • {draw.userTickets} ticket{draw.userTickets > 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: '#646cff', fontWeight: 600 }}>
                                            {draw.prize}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                            {formatTimeRemaining(draw.drawTime)}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    marginTop: '0.75rem',
                                    height: '0.5rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '999px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${progressPercent}%`,
                                        background: '#646cff'
                                    }} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
