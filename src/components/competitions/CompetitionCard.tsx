import { Clock, Users, Award, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import type { CompetitionDto } from '../../types/competition';
import { cardStyle } from './competitionStyles';

interface CompetitionCardProps {
    competition: CompetitionDto;
    joiningId: string | null;
    onJoin: (id: string) => void;
}

export function CompetitionCard({ competition, joiningId, onJoin }: CompetitionCardProps) {
    const isJoining = joiningId === competition.id;

    return (
        <div style={cardStyle}>
            <div style={{ position: 'relative', height: '12rem', flexShrink: 0 }}>
                <img
                    src={competition.imageUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400'}
                    alt={competition.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <div style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        color: '#000',
                        fontWeight: 500
                    }}>
                        {competition.type}
                    </div>
                </div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                    {competition.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
                    {competition.description}
                </p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    marginTop: 'auto'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                            <Award size={16} style={{ marginRight: '0.5rem' }} />
                            Prize
                        </div>
                        <div style={{ color: '#a855f7', fontWeight: 600 }}>{competition.prize}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                            <Clock size={16} style={{ marginRight: '0.5rem' }} />
                            Ends
                        </div>
                        <div>{new Date(competition.endTime).toLocaleDateString()}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                            <Users size={16} style={{ marginRight: '0.5rem' }} />
                            Entries
                        </div>
                        <div>{competition.participantsCount}</div>
                    </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                    }}>
                        <div style={{ color: '#94a3b8' }}>Entry Fee</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>${competition.entryFee}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => window.location.href = `/competitions/${competition.id}`}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: 500
                            }}
                        >
                            Details
                        </button>

                        {competition.entered ? (
                            <button disabled style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: 'rgba(34, 197, 94, 0.2)',
                                color: '#22c55e',
                                border: '1px solid #22c55e',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                cursor: 'default',
                                fontWeight: 500
                            }}>
                                <CheckCircle2 size={20} />
                                <span>Entered</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => onJoin(competition.id)}
                                disabled={isJoining}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'linear-gradient(to right, #9333ea, #db2777)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: isJoining ? 'not-allowed' : 'pointer',
                                    fontWeight: 500,
                                    opacity: isJoining ? 0.7 : 1
                                }}
                            >
                                {isJoining ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                                <span>Join</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
