import { Mail, User, Shield } from 'lucide-react';
import { VerificationLevel, type UserProfileDto } from '../../types/user';
import { cardStyle, rowStyle, iconBoxStyle, labelStyle } from './profileStyles';

interface VerificationStatusProps {
    user: UserProfileDto;
    onEditProfile: () => void;
}

export function VerificationStatus({ user, onEditProfile }: VerificationStatusProps) {
    const isVerified = user.verificationLevel === VerificationLevel.VERIFIED;

    // Calculate missing fields
    const obs = user.onboardingStatus;
    const missingFields: string[] = [];

    if (!obs?.firstNamePresent) missingFields.push('Add your first name');
    if (!obs?.lastNamePresent) missingFields.push('Add your last name');
    if (!obs?.countryPresent) missingFields.push('Add your country');
    if (!obs?.phonePresent) missingFields.push('Add your phone number');
    else if (!obs?.phoneVerified) missingFields.push('Verify your phone number');
    if (!obs?.emailPresent) missingFields.push('Add your email');
    if (!obs?.paymentMethodPresent) missingFields.push('Add a payment method');

    const isPersonalInfoComplete = missingFields.length === 0;

    return (
        <div style={cardStyle}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Verification Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Email Status */}
                <div style={{
                    ...rowStyle,
                    background: user.onboardingStatus?.emailVerified ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                    border: user.onboardingStatus?.emailVerified ? '1px solid rgba(34, 197, 94, 0.3)' : 'none'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle(user.onboardingStatus?.emailVerified ? '#22c55e' : '#94a3b8')}>
                            <Mail size={20} />
                        </div>
                        <div>
                            <div style={{ color: user.onboardingStatus?.emailVerified ? '#22c55e' : 'white' }}>Email Verified</div>
                            <div style={labelStyle}>{user.onboardingStatus?.emailVerified ? 'Your email has been confirmed' : 'Email not verified'}</div>
                        </div>
                    </div>
                    {user.onboardingStatus?.emailVerified && (
                        <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderRadius: '999px', fontSize: '0.875rem' }}>
                            Verified
                        </div>
                    )}
                </div>

                {/* Personal Info Status */}
                <div style={{
                    ...rowStyle,
                    background: isPersonalInfoComplete ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    border: isPersonalInfoComplete ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)',
                    alignItems: 'flex-start'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                        <div style={{ ...iconBoxStyle(isPersonalInfoComplete ? '#22c55e' : '#eab308'), height: '2.5rem' }}>
                            <User size={20} />
                        </div>
                        <div>
                            <div style={{ color: isPersonalInfoComplete ? '#22c55e' : '#eab308', marginBottom: '0.25rem' }}>
                                Personal Information
                            </div>
                            {isPersonalInfoComplete ? (
                                <div style={labelStyle}>Personal info complete</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <div style={{ ...labelStyle, color: '#eab308', marginBottom: '0.25rem' }}>
                                        Please complete the following:
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.25rem', ...labelStyle }}>
                                        {missingFields.map((msg, index) => (
                                            <li key={index}>{msg}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    {!isPersonalInfoComplete && (
                        <button onClick={onEditProfile} style={{ padding: '0.5rem 1rem', background: '#eab308', color: 'white', borderRadius: '0.5rem', border: 'none', fontSize: '0.875rem', cursor: 'pointer', marginTop: '0.25rem' }}>
                            Update
                        </button>
                    )}
                    {isPersonalInfoComplete && (
                        <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderRadius: '999px', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                            Complete
                        </div>
                    )}
                </div>

                {/* Identity Status (KYC) */}
                <div style={{
                    ...rowStyle,
                    background: isVerified ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    border: isVerified ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle(isVerified ? '#22c55e' : '#eab308')}>
                            <Shield size={20} />
                        </div>
                        <div>
                            <div style={{ color: isVerified ? '#22c55e' : '#eab308' }}>Identity Verification</div>
                            <div style={labelStyle}>{isVerified ? 'Identity verified' : 'Complete KYC to unlock all features'}</div>
                        </div>
                    </div>
                    {!isVerified && (
                        <button style={{ padding: '0.5rem 1rem', background: '#eab308', color: 'white', borderRadius: '0.5rem', border: 'none', fontSize: '0.875rem', cursor: 'pointer' }}>
                            Verify Now
                        </button>
                    )}
                    {isVerified && (
                        <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderRadius: '999px', fontSize: '0.875rem' }}>
                            Verified
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
