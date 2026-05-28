import type { UserProfileDto } from '../../types/user';
import { cardStyle, labelStyle } from './profileStyles';

interface ProfileStatsProps {
    user: UserProfileDto;
}

export function ProfileStats({ user }: ProfileStatsProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Activity Statistics */}
            <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Activity Statistics</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={labelStyle}>Lottery Tickets Purchased</span>
                        <span style={{ fontWeight: 600 }}>{user.ticketsPurchased}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={labelStyle}>Competition Entries</span>
                        <span style={{ fontWeight: 600 }}>{user.competitionEntries}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={labelStyle}>Tasks Completed</span>
                        <span style={{ fontWeight: 600 }}>{user.tasksCompleted}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={labelStyle}>Total Winnings</span>
                        <span style={{ fontWeight: 600, color: '#22c55e' }}>${user.totalWinnings?.toFixed(2) || '0.00'}</span>
                    </div>
                </div>
            </div>

            {/* Account Level */}
            <div style={cardStyle}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Account Level</h2>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.accountLevel || 'Member'}</div>
                    <div style={labelStyle}>Level {Math.floor(user.levelProgress / 100) + 1}</div>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <span style={labelStyle}>Progress to Next Level</span>
                        <span>{user.levelProgress % 100}%</span>
                    </div>
                    <div style={{ height: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${user.levelProgress % 100}%`, height: '100%', background: 'linear-gradient(to right, #4f46e5, #9333ea)' }} />
                    </div>
                    <div style={{ ...labelStyle, textAlign: 'center', marginTop: '0.5rem', fontSize: '0.75rem' }}>{100 - (user.levelProgress % 100)} more points needed</div>
                </div>
            </div>
        </div>
    );
}
