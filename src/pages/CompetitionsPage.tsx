import { useKeycloak } from '@react-keycloak/web';
import { Settings, Plus } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { authenticatedFetch } from '../api/client';
import { type UserProfileDto } from '../types/user';
import { competitionService } from '../api/competitionService';
import { adminCompetitionService } from '../api/adminCompetitionService';
import { walletService } from '../api/walletService';
import type { CompetitionDto, CompetitionEntryDto } from '../types/competition';
import type { WalletDto } from '../types/wallet';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import {
    CompetitionList,
    MyEntriesSection,
    CompetitionRules,
    CreateCompetitionModal
} from '../components/competitions';

const CompetitionsPage = () => {
    const { keycloak } = useKeycloak();
    const toast = useToast();
    const [user, setUser] = useState<UserProfileDto | null>(null);
    const [wallet, setWallet] = useState<WalletDto | null>(null);
    const [competitions, setCompetitions] = useState<CompetitionDto[]>([]);
    const [myEntries, setMyEntries] = useState<CompetitionEntryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [joiningId, setJoiningId] = useState<string | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // Admin State
    const isAdmin = keycloak.hasRealmRole('ADMIN');
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<CompetitionDto>>({
        title: '',
        description: '',
        prize: '',
        entryFee: 0,
        participantsCount: 0,
        imageUrl: ''
    });

    const fetchData = useCallback(async () => {
        if (keycloak.authenticated) {
            try {
                setLoading(true);
                try {
                    const [userData, walletData] = await Promise.all([
                        authenticatedFetch('/api/v1/users/me').then(res => res.json()),
                        walletService.getWalletDetails()
                    ]);
                    setUser(userData);
                    setWallet(walletData);
                } catch { /* Failed to fetch user/wallet data */ }

                try {
                    const pageResult = await competitionService.getCompetitions(0, 6);
                    setCompetitions(pageResult.content);
                    setCurrentPage(0);
                    setHasMore(!pageResult.last);
                } catch { /* Failed to fetch competitions */ }

                try {
                    const entries = await competitionService.getMyEntries();
                    setMyEntries(entries);
                } catch { /* Failed to fetch entries */ }
            } catch { /* Failed to fetch data */ }
            finally {
                setLoading(false);
            }
        }
    }, [keycloak.authenticated]);

    const handleLoadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;

        try {
            setLoadingMore(true);
            const nextPage = currentPage + 1;
            const pageResult = await competitionService.getCompetitions(nextPage, 6);
            setCompetitions(prev => [...prev, ...pageResult.content]);
            setCurrentPage(nextPage);
            setHasMore(!pageResult.last);
        } catch {
            toast.error('Failed to load more competitions.');
        } finally {
            setLoadingMore(false);
        }
    }, [currentPage, hasMore, loadingMore, toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleJoin = async (id: string) => {
        try {
            setJoiningId(id);
            await competitionService.joinCompetition(id);
            toast.success('Successfully joined competition!');
            fetchData();
        } catch {
            toast.error('Failed to join competition. Please try again.');
        } finally {
            setJoiningId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminCompetitionService.createCompetition(formData);
            setIsModalOpen(false);
            toast.success('Competition created successfully!');
            fetchData();
            setFormData({
                title: '',
                description: '',
                prize: '',
                entryFee: 0,
                participantsCount: 0,
                imageUrl: ''
            });
        } catch {
            toast.error('Failed to create competition. Please try again.');
        }
    };

    const containerStyle = {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    if (loading && !user && competitions.length === 0) {
        return <div style={{ ...containerStyle, textAlign: 'center', marginTop: '4rem' }}>Loading competitions...</div>;
    }

    return (
        <div style={containerStyle}>
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                        {isAdminMode ? 'Manage Competitions (Admin)' : 'Competitions'}
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        {isAdminMode ? 'Create and manage active competitions' : 'Showcase your talents and compete for amazing prizes'}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {isAdmin && (
                        <button
                            onClick={() => setIsAdminMode(!isAdminMode)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: isAdminMode ? '#6366f1' : 'rgba(255,255,255,0.1)',
                                color: 'white',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Settings size={18} />
                            {isAdminMode ? 'Exit Admin' : 'Admin Mode'}
                        </button>
                    )}

                    {!isAdminMode && (
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Your Balance</div>
                            <div style={{ fontSize: '1.5rem', color: '#a855f7', fontWeight: 600 }}>
                                ${wallet?.balance.toFixed(2) || '0.00'}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Admin Controls */}
            {isAdminMode && (
                <div style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#22c55e',
                            color: 'white',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={20} />
                        Create New Competition
                    </button>
                </div>
            )}

            <MyEntriesSection entries={myEntries} />

            <CompetitionList
                competitions={competitions}
                joiningId={joiningId}
                onJoin={handleJoin}
                hasMore={hasMore}
                loadingMore={loadingMore}
                onLoadMore={handleLoadMore}
            />

            <CompetitionRules />

            <CreateCompetitionModal
                isOpen={isModalOpen}
                formData={formData}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                onFormChange={setFormData}
            />
        </div>
    );
};

export default CompetitionsPage;
