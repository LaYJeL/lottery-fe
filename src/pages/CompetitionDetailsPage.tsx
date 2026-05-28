import { useKeycloak } from '@react-keycloak/web';
import { ArrowLeft, Award, Clock, Users, Loader2, Upload, CheckCircle2 } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { competitionService } from '../api/competitionService';
import type { CompetitionDto } from '../types/competition';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';

const CompetitionDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const toast = useToast();

    // Using explicit null for initial state to differentiate from empty
    const [competition, setCompetition] = useState<CompetitionDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [joining, setJoining] = useState(false);

    const fetchData = useCallback(async () => {
        if (!id || !keycloak.authenticated) return;

        try {
            setLoading(true);
            setError(null);

            const compData = await competitionService.getCompetitionById(id);
            setCompetition(compData);
        } catch {
            setError("Failed to load competition details. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [id, keycloak.authenticated]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleJoin = async () => {
        if (!competition) return;

        try {
            setJoining(true);
            await competitionService.joinCompetition(competition.id);
            toast.success('Successfully joined competition!');
            // Refresh data to update status
            await fetchData();
        } catch {
            toast.error('Failed to join competition. Please try again.');
        } finally {
            setJoining(false);
        }
    };

    // Shared Styles
    const containerStyle = {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    const cardStyle = {
        background: 'rgba(30,41,59,0.7)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1rem',
        overflow: 'hidden',
        padding: '2rem'
    };

    if (loading) {
        return (
            <div style={{ ...containerStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    if (error || !competition) {
        return (
            <div style={containerStyle}>
                <button
                    onClick={() => navigate('/competitions')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        fontSize: '1rem'
                    }}
                >
                    <ArrowLeft size={20} />
                    Back to Competitions
                </button>
                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ef4444' }}>Error</h2>
                    <p>{error || "Competition not found"}</p>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
            <button
                onClick={() => navigate('/competitions')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={20} />
                Back to Competitions
            </button>

            <div style={cardStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Left Column: Image */}
                    <div>
                        <div style={{
                            position: 'relative',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}>
                            <img
                                src={competition.imageUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800'}
                                alt={competition.title}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                <div style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255,255,255,0.9)',
                                    backdropFilter: 'blur(4px)',
                                    borderRadius: '999px',
                                    fontSize: '0.875rem',
                                    color: '#000',
                                    fontWeight: 600
                                }}>
                                    {competition.type}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Actions */}
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
                            {competition.title}
                        </h1>

                        <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            {competition.description}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                                    <Award size={18} />
                                    <span>Prize Pool</span>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#a855f7' }}>
                                    {competition.prize}
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                                    <Clock size={18} />
                                    <span>Ends On</span>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                                    {new Date(competition.endTime).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                                    <Users size={18} />
                                    <span>Participants</span>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                                    {competition.participantsCount} Entries
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>💲</span>
                                    <span>Entry Fee</span>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: competition.entryFee > 0 ? 'white' : '#22c55e' }}>
                                    {competition.entryFee > 0 ? `$${competition.entryFee}` : 'Free'}
                                </div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                            {competition.entered ? (
                                <button disabled style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(34, 197, 94, 0.2)',
                                    color: '#22c55e',
                                    border: '1px solid #22c55e',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    cursor: 'default',
                                    fontWeight: 600,
                                    fontSize: '1.125rem'
                                }}>
                                    <CheckCircle2 size={24} />
                                    <span>You Have Entered This Competition</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleJoin}
                                    disabled={joining}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'linear-gradient(to right, #9333ea, #db2777)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        cursor: joining ? 'not-allowed' : 'pointer',
                                        fontWeight: 600,
                                        fontSize: '1.125rem',
                                        opacity: joining ? 0.7 : 1,
                                        transition: 'transform 0.2s',
                                        boxShadow: '0 4px 14px 0 rgba(147, 51, 234, 0.5)'
                                    }}
                                >
                                    {joining ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
                                    <span>Join Competition Now</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompetitionDetailsPage;
