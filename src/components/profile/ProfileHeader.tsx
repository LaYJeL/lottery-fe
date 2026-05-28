import { User, Shield, Star } from 'lucide-react';
import { VerificationLevel, type UserProfileDto } from '../../types/user';
import type { WalletDto } from '../../types/wallet';
import { formatDate } from './profileStyles';

interface ProfileHeaderProps {
    user: UserProfileDto;
    wallet: WalletDto | null;
}

export function ProfileHeader({ user, wallet }: ProfileHeaderProps) {
    const isVerified = user.verificationLevel === VerificationLevel.VERIFIED;
    const displayName = user.displayName || user.firstName ? `${user.firstName} ${user.lastName}` : 'User';

    const headerGradientStyle = {
        background: 'linear-gradient(to right, #4f46e5, #9333ea)',
        padding: '2rem',
        borderRadius: '1rem',
        color: 'white',
        marginBottom: '2rem'
    };

    return (
        <div style={headerGradientStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '6rem', height: '6rem', background: 'rgba(255,255,255,0.2)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={48} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{displayName}</h2>
                        {isVerified && (
                            <div style={{ padding: '0.25rem', background: 'rgba(255,255,255,0.2)', borderRadius: '999px' }} title="Verified">
                                <Shield size={20} />
                            </div>
                        )}
                    </div>
                    <div style={{ color: '#e0e7ff', marginBottom: '1rem' }}>{user.email}</div>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
                        <div>
                            <div style={{ color: '#e0e7ff' }}>Reputation</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={16} fill="white" />
                                <span>{user.reputation}</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ color: '#e0e7ff' }}>Member Since</div>
                            <div>{formatDate(user.createdAt)}</div>
                        </div>
                        <div>
                            <div style={{ color: '#e0e7ff' }}>Balance</div>
                            <div>${wallet?.balance?.toFixed(2) || '0.00'}</div>
                        </div>
                        <div>
                            <div style={{ color: '#e0e7ff' }}>Account Status</div>
                            <div>{user.accountStatus}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
