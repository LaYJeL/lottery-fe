import type { UserTaskDto } from '../../types/task';
import { cardStyle, labelStyle } from './taskStyles';

interface AchievementsCardProps {
    achievements: UserTaskDto[];
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
    if (achievements.length === 0) return null;

    return (
        <div style={cardStyle}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Achievements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {achievements.map(achievement => (
                    <div
                        key={achievement.taskId}
                        style={{
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            textAlign: 'center',
                            background: achievement.status === 'CLAIMED'
                                ? 'linear-gradient(to right, rgba(234, 179, 8, 0.1), rgba(249, 115, 22, 0.1))'
                                : 'rgba(255,255,255,0.05)',
                            border: achievement.status === 'CLAIMED'
                                ? '1px solid rgba(234, 179, 8, 0.3)'
                                : '1px solid rgba(255,255,255,0.1)',
                            opacity: achievement.status === 'CLAIMED' ? 1 : 0.5
                        }}
                    >
                        <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>
                            {achievement.icon ? achievement.icon :
                                (achievement.title.includes('Winner') ? '💎' :
                                    achievement.title.includes('Social') ? '🦋' : '⭐')}
                        </div>
                        <div style={{ fontSize: '0.75rem' }}>{achievement.title}</div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '0.75rem', textAlign: 'center' }}>
                <div style={{ ...labelStyle, marginBottom: 0 }}>Achievements Unlocked</div>
                <div style={{ fontSize: '1.5rem', color: '#ca8a04', fontWeight: 600 }}>
                    {achievements.filter(a => a.status === 'CLAIMED').length} / {achievements.length}
                </div>
            </div>
        </div>
    );
}
