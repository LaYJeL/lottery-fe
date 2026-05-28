import { X } from 'lucide-react';
import type { CompetitionDto } from '../../types/competition';
import { inputStyle, labelStyle } from './competitionStyles';

interface CreateCompetitionModalProps {
    isOpen: boolean;
    formData: Partial<CompetitionDto>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onFormChange: (data: Partial<CompetitionDto>) => void;
}

export function CreateCompetitionModal({
    isOpen,
    formData,
    onClose,
    onSubmit,
    onFormChange
}: CreateCompetitionModalProps) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200
        }}>
            <div style={{
                background: '#1e293b',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        Create New Competition
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit}>
                    <div>
                        <label style={labelStyle}>Title</label>
                        <input
                            required
                            style={inputStyle}
                            value={formData.title}
                            onChange={e => onFormChange({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea
                            required
                            style={{ ...inputStyle, minHeight: '100px' }}
                            value={formData.description}
                            onChange={e => onFormChange({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Prize</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.prize}
                                onChange={e => onFormChange({ ...formData, prize: e.target.value })}
                                placeholder="e.g. $5000 + Gear"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Entry Fee ($)</label>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={formData.entryFee}
                                onChange={e => onFormChange({ ...formData, entryFee: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>Image URL</label>
                        <input
                            style={inputStyle}
                            placeholder="https://..."
                            value={formData.imageUrl || ''}
                            onChange={e => onFormChange({ ...formData, imageUrl: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        Create Competition
                    </button>
                </form>
            </div>
        </div>
    );
}
