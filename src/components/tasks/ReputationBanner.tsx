import { TrendingUp } from 'lucide-react';
import type { UserProfileDto } from '../../types/user';

interface ReputationBannerProps {
    user: UserProfileDto;
}

export function ReputationBanner({ user }: ReputationBannerProps) {
    return (
        <div style={{ background: 'linear-gradient(to right, #eab308, #f97316)', padding: '1.5rem', borderRadius: '1rem', color: 'white', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.25rem' }}>Current Level</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{user.accountLevel || 'Member'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.25rem' }}>Progress</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{user.levelProgress}%</div>
                </div>
            </div>
            <div style={{ height: '0.75rem', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${user.levelProgress || 0}%`, background: 'white', borderRadius: '999px' }} />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <TrendingUp size={20} />
                <span>Keep completing tasks to level up!</span>
            </div>
        </div>
    );
}
