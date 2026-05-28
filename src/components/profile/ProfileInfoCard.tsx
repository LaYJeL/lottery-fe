import { User, Mail, Phone, MapPin, Calendar, Bell, Settings, Loader2 } from 'lucide-react';
import type { UserProfileDto } from '../../types/user';
import { cardStyle, rowStyle, iconBoxStyle, labelStyle, valueStyle, inputStyle, formatDate } from './profileStyles';

interface EmailResetState {
    isEditing: boolean;
    email: string;
    isLoading: boolean;
    error: string;
}

interface ProfileInfoCardProps {
    user: UserProfileDto;
    emailResetState: EmailResetState;
    onEditProfile: () => void;
    onEmailEditStart: () => void;
    onEmailEditCancel: () => void;
    onEmailChange: (email: string) => void;
    onEmailSave: () => void;
    onToggleNotifications: () => void;
}

export function ProfileInfoCard({
    user,
    emailResetState,
    onEditProfile,
    onEmailEditStart,
    onEmailEditCancel,
    onEmailChange,
    onEmailSave,
    onToggleNotifications
}: ProfileInfoCardProps) {
    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Account Information</h2>
                <button
                    onClick={onEditProfile}
                    style={{ fontSize: '0.875rem', color: '#646cff', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Settings size={20} /> Edit Profile
                </button>
            </div>
            <div>
                {/* Full Name */}
                <div style={rowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle()}><User size={20} /></div>
                        <div>
                            <div style={labelStyle}>Full Name</div>
                            <div style={valueStyle}>{user.firstName} {user.lastName} {user.middleName}</div>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div style={rowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle()}><Mail size={20} /></div>
                        <div>
                            <div style={labelStyle}>Email</div>
                            {!emailResetState.isEditing ? (
                                <div style={valueStyle}>{user.email}</div>
                            ) : (
                                <input
                                    type="email"
                                    value={emailResetState.email}
                                    onChange={(e) => onEmailChange(e.target.value)}
                                    style={{
                                        ...inputStyle,
                                        marginTop: 0,
                                        padding: '0.25rem 0.5rem',
                                        width: '250px'
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    {!emailResetState.isEditing ? (
                        <button
                            onClick={onEmailEditStart}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#334155',
                                color: 'white',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Settings size={16} /> Edit
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={onEmailEditCancel}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'transparent',
                                    color: '#94a3b8',
                                    border: '1px solid #94a3b8',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onEmailSave}
                                disabled={emailResetState.isLoading}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: '#4f46e5',
                                    color: 'white',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {emailResetState.isLoading && <Loader2 size={16} className="animate-spin" />}
                                Save
                            </button>
                        </div>
                    )}
                </div>

                {/* Phone Number */}
                <div style={rowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle()}><Phone size={20} /></div>
                        <div>
                            <div style={labelStyle}>Phone Number</div>
                            <div style={valueStyle}>{user.phoneNumber || 'Not set'}</div>
                        </div>
                    </div>
                </div>

                {/* Birth Date */}
                <div style={rowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle()}><Calendar size={20} /></div>
                        <div>
                            <div style={labelStyle}>Birth Date</div>
                            <div style={valueStyle}>{formatDate(user.birthDate)}</div>
                        </div>
                    </div>
                </div>

                {/* Country */}
                <div style={rowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle()}><MapPin size={20} /></div>
                        <div>
                            <div style={labelStyle}>Country</div>
                            <div style={valueStyle}>{user.country || 'Not set'}</div>
                        </div>
                    </div>
                </div>

                {/* Email Notifications Toggle */}
                <div style={rowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={iconBoxStyle()}><Bell size={20} /></div>
                        <div>
                            <div style={labelStyle}>Email Notifications</div>
                            <div style={valueStyle}>Receive updates via email</div>
                        </div>
                    </div>
                    <div
                        onClick={onToggleNotifications}
                        style={{
                            width: '3rem',
                            height: '1.5rem',
                            background: user.emailNotifications ? '#4f46e5' : '#334155',
                            borderRadius: '999px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <div style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            background: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '0.125rem',
                            left: user.emailNotifications ? 'calc(100% - 1.375rem)' : '0.125rem',
                            transition: 'left 0.2s'
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
