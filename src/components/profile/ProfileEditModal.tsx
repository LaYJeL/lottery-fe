import { X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { UserProfileDto } from '../../types/user';
import { modalOverlayStyle, modalContentStyle, inputGroupStyle, inputStyle, labelStyle, buttonPrimaryStyle } from './profileStyles';

interface ProfileFormData {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    country: string;
    displayName: string;
    birthDate: string;
}

interface VerificationState {
    isSent: boolean;
    code: string;
    isLoading: boolean;
    error: string;
}

interface ProfileEditModalProps {
    isOpen: boolean;
    user: UserProfileDto;
    formData: ProfileFormData;
    isUpdating: boolean;
    verificationState: VerificationState;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSendVerification: () => void;
    onConfirmVerification: () => void;
    onVerificationCodeChange: (code: string) => void;
}

export function ProfileEditModal({
    isOpen,
    user,
    formData,
    isUpdating,
    verificationState,
    onClose,
    onSubmit,
    onInputChange,
    onSelectChange,
    onSendVerification,
    onConfirmVerification,
    onVerificationCodeChange
}: ProfileEditModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>Edit Profile</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            style={inputStyle}
                            placeholder="First Name"
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={onInputChange}
                            style={inputStyle}
                            placeholder="Last Name"
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={onInputChange}
                            style={inputStyle}
                            placeholder="Middle Name"
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Display Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={onInputChange}
                            style={inputStyle}
                            placeholder="Display Name"
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Phone Number</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={onInputChange}
                                style={{ ...inputStyle, marginTop: 0, flex: 1 }}
                                placeholder="+1234567890"
                            />
                            {user.onboardingStatus?.phonePresent && !user.onboardingStatus?.phoneVerified && (
                                !verificationState.isSent ? (
                                    <button
                                        type="button"
                                        onClick={onSendVerification}
                                        disabled={verificationState.isLoading}
                                        style={{
                                            padding: '0 1.5rem',
                                            background: '#eab308',
                                            color: 'white',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            marginLeft: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {verificationState.isLoading && <Loader2 size={16} className="animate-spin" />}
                                        Verify
                                    </button>
                                ) : (
                                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={verificationState.code}
                                            onChange={(e) => onVerificationCodeChange(e.target.value)}
                                            placeholder="123456"
                                            style={{
                                                width: '5rem',
                                                padding: '0.75rem',
                                                borderRadius: '0.5rem',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'white'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={onConfirmVerification}
                                            disabled={verificationState.isLoading}
                                            style={{
                                                padding: '0 1rem',
                                                background: '#22c55e',
                                                color: 'white',
                                                borderRadius: '0.5rem',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: 600
                                            }}
                                        >
                                            {verificationState.isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Confirm'}
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Birth Date</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate || ''}
                            onChange={onInputChange}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={onSelectChange}
                            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                        >
                            <option value="">Select Country</option>
                            {Object.entries(t('countries', { returnObjects: true }) as Record<string, string>).map(([code, name]) => (
                                <option key={code} value={name} style={{ background: '#1e293b', color: 'white' }}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: '#94a3b8', border: '1px solid #94a3b8', borderRadius: '0.5rem', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            style={{ ...buttonPrimaryStyle, opacity: isUpdating ? 0.7 : 1 }}
                        >
                            {isUpdating && <Loader2 size={16} className="animate-spin" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
