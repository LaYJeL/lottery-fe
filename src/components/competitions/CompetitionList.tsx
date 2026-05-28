import { ChevronDown } from 'lucide-react';
import type { CompetitionDto } from '../../types/competition';
import { CompetitionCard } from './CompetitionCard';

interface CompetitionListProps {
    competitions: CompetitionDto[];
    joiningId: string | null;
    onJoin: (id: string) => void;
    hasMore?: boolean;
    loadingMore?: boolean;
    onLoadMore?: () => void;
}

export function CompetitionList({
    competitions,
    joiningId,
    onJoin,
    hasMore = false,
    loadingMore = false,
    onLoadMore
}: CompetitionListProps) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Active Competitions
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
            }}>
                {competitions.length === 0 ? (
                    <div style={{ color: '#94a3b8', gridColumn: '1 / -1' }}>
                        No active competitions found.
                    </div>
                ) : (
                    competitions.map((competition) => (
                        <CompetitionCard
                            key={competition.id}
                            competition={competition}
                            joiningId={joiningId}
                            onJoin={onJoin}
                        />
                    ))
                )}
            </div>

            {hasMore && onLoadMore && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem'
                }}>
                    <button
                        onClick={onLoadMore}
                        disabled={loadingMore}
                        style={{
                            padding: '0.75rem 2rem',
                            background: 'rgba(99, 102, 241, 0.2)',
                            color: '#a5b4fc',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            cursor: loadingMore ? 'not-allowed' : 'pointer',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s',
                            opacity: loadingMore ? 0.6 : 1
                        }}
                    >
                        {loadingMore ? (
                            'Loading...'
                        ) : (
                            <>
                                Show more...
                                <ChevronDown size={18} />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
