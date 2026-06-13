import { useKeycloak } from '@react-keycloak/web';
import { useCallback, useEffect, useState } from 'react';
import { userService } from '../api/userService';
import { type UserProfileDto } from '../types/user';
import { walletService } from '../api/walletService';
import type { WalletDto } from '../types/wallet';
import {
    ProfileHeader,
    ProfileStats,
    ProfileInfoCard,
    ProfileEditModal,
    VerificationStatus
} from '../components/profile';

const ProfilePage = () => {
    const { keycloak } = useKeycloak();

    const [user, setUser] = useState<UserProfileDto | null>(null);
    const [wallet, setWallet] = useState<WalletDto | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        country: '',
        displayName: '',
        birthDate: ''
    });
    const [verificationState, setVerificationState] = useState({
        isSent: false,
        code: '',
        isLoading: false,
        error: ''
    });
    const [emailResetState, setEmailResetState] = useState({
        isEditing: false,
        email: '',
        isLoading: false,
        error: ''
    });

    const fetchProfile = useCallback(() => {
        if (keycloak.authenticated) {
            userService.getProfile()
                .then(data => {
                    setUser(data);

                    let formattedBirthDate = '';
                    if (data.birthDate) {
                        try {
                            const date = new Date(data.birthDate);
                            if (!isNaN(date.getTime())) {
                                formattedBirthDate = date.toISOString().split('T')[0];
                            }
                        } catch {
                            // Invalid birth date format
                        }
                    }

                    setFormData({
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        middleName: data.middleName || '',
                        phoneNumber: data.phoneNumber || '',
                        country: data.country || '',
                        displayName: data.displayName || '',
                        birthDate: formattedBirthDate
                    });
                })
                .catch(() => { /* Failed to fetch profile */ });
        }
    }, [keycloak.authenticated]);

    const fetchWallet = useCallback(() => {
        if (keycloak.authenticated) {
            walletService.getWalletDetails()
                .then(data => setWallet(data))
                .catch(() => { /* Failed to fetch wallet */ });
        }
    }, [keycloak.authenticated]);

    useEffect(() => {
        fetchProfile();
        fetchWallet();
    }, [fetchProfile, fetchWallet]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            await userService.updateProfile(formData);
            await fetchProfile();
            setIsEditModalOpen(false);
        } catch {
            // Failed to update profile
        } finally {
            setIsUpdating(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleNotifications = async () => {
        if (!user) return;
        const newValue = !user.emailNotifications;
        setUser({ ...user, emailNotifications: newValue });

        try {
            await userService.updateProfile({ emailNotifications: newValue });
            await fetchProfile();
        } catch {
            setUser({ ...user, emailNotifications: !newValue });
        }
    };

    const handleSendVerification = async () => {
        setVerificationState(prev => ({ ...prev, isLoading: true, error: '' }));
        try {
            await userService.sendPhoneVerification();
            setVerificationState(prev => ({ ...prev, isSent: true }));
        } catch {
            setVerificationState(prev => ({ ...prev, error: 'Failed to send code' }));
        } finally {
            setVerificationState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleConfirmVerification = async () => {
        setVerificationState(prev => ({ ...prev, isLoading: true, error: '' }));
        try {
            await userService.confirmPhoneVerification(verificationState.code);
            await fetchProfile();
            setVerificationState({ isSent: false, code: '', isLoading: false, error: '' });
        } catch {
            setVerificationState(prev => ({ ...prev, error: 'Invalid code' }));
        } finally {
            setVerificationState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleUpdateEmail = async () => {
        setEmailResetState(prev => ({ ...prev, isLoading: true, error: '' }));
        try {
            await userService.updateEmail(emailResetState.email);
            await fetchProfile();
            setEmailResetState({ isEditing: false, email: '', isLoading: false, error: '' });
        } catch {
            setEmailResetState(prev => ({ ...prev, error: 'Failed to update email' }));
        } finally {
            setEmailResetState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const containerStyle = {
        padding: '2rem 2rem 6rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    if (!user) return <div style={{ ...containerStyle, textAlign: 'center' }}>Loading profile...</div>;

    return (
        <div style={containerStyle}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Profile</h1>
                <p style={{ color: '#94a3b8' }}>Manage your account settings and preferences</p>
            </div>

            <ProfileHeader user={user} wallet={wallet} />

            <ProfileStats user={user} />

            <ProfileInfoCard
                user={user}
                emailResetState={emailResetState}
                onEditProfile={() => setIsEditModalOpen(true)}
                onEmailEditStart={() => setEmailResetState({ isEditing: true, email: user.email, isLoading: false, error: '' })}
                onEmailEditCancel={() => setEmailResetState(prev => ({ ...prev, isEditing: false }))}
                onEmailChange={(email) => setEmailResetState(prev => ({ ...prev, email }))}
                onEmailSave={handleUpdateEmail}
                onToggleNotifications={handleToggleNotifications}
            />

            <ProfileEditModal
                isOpen={isEditModalOpen}
                user={user}
                formData={formData}
                isUpdating={isUpdating}
                verificationState={verificationState}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdate}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onSendVerification={handleSendVerification}
                onConfirmVerification={handleConfirmVerification}
                onVerificationCodeChange={(code) => setVerificationState(prev => ({ ...prev, code }))}
            />

            <VerificationStatus user={user} onEditProfile={() => setIsEditModalOpen(true)} />
        </div>
    );
};

export default ProfilePage;
