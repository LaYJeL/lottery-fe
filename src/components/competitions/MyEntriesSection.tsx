import { Trophy, CheckCircle2 } from 'lucide-react';
import type { CompetitionEntryDto } from '../../types/competition';
import { cardStyle } from './competitionStyles';

interface MyEntriesSectionProps {
    entries: CompetitionEntryDto[];
}

export function MyEntriesSection({ entries }: MyEntriesSectionProps) {
    if (entries.length === 0) {
        return null;
    }

    return (
        <div style={{
            ...cardStyle,
            padding: '1.5rem',
            marginBottom: '2rem',
            height: 'auto',
            display: 'block'
        }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                My Competition Entries
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: 'linear-gradient(to right, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                            borderRadius: '0.75rem'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                padding: '0.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#a855f7'
                            }}>
                                <Trophy size={20} />
                            </div>
                            <div>
                                <div style={{ marginBottom: '0.25rem', fontWeight: 500 }}>
                                    {entry.competitionTitle}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                                    Status: {entry.status}
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                display: 'inline-flex',
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(34, 197, 94, 0.2)',
                                color: '#22c55e',
                                borderRadius: '999px',
                                fontSize: '0.875rem',
                                marginBottom: '0.25rem',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <CheckCircle2 size={14} />
                                Entered
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
