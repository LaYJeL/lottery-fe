import { X } from 'lucide-react';
import type { TaskDto, TaskCategory, TaskActionType } from '../../types/task';
import { labelStyle, inputStyle } from './taskStyles';

interface TaskFormModalProps {
    isOpen: boolean;
    editingTask: TaskDto | null;
    formData: Partial<TaskDto>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onFormChange: (data: Partial<TaskDto>) => void;
}

export function TaskFormModal({ isOpen, editingTask, formData, onClose, onSubmit, onFormChange }: TaskFormModalProps) {
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
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

                    <div>
                        <label style={labelStyle}>Icon (Emoji or Identifier)</label>
                        <input
                            style={inputStyle}
                            placeholder="e.g. 🏆, 💎 or custom key"
                            value={formData.icon || ''}
                            onChange={e => onFormChange({ ...formData, icon: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select
                                style={inputStyle}
                                value={formData.category}
                                onChange={e => onFormChange({ ...formData, category: e.target.value as TaskCategory })}
                            >
                                <option value="DAILY">Daily</option>
                                <option value="WEEKLY">Weekly</option>
                                <option value="SPECIAL">Special</option>
                                <option value="ACHIEVEMENT">Achievement</option>
                                <option value="ONETIME">One-Time</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Action Type</label>
                            <select
                                style={inputStyle}
                                value={formData.actionType}
                                onChange={e => onFormChange({ ...formData, actionType: e.target.value as TaskActionType })}
                            >
                                <option value="LOGIN">Login</option>
                                <option value="PURCHASE_TICKET">Purchase Ticket</option>
                                <option value="REFERRAL">Referral</option>
                                <option value="VOTE">Vote</option>
                                <option value="VERIFY_ID">Verify ID</option>
                                <option value="CHECK_RESULTS">Check Results</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Condition Value (Optional)</label>
                        <input
                            style={inputStyle}
                            placeholder="e.g. ticket count, specific url"
                            value={formData.conditionValue || ''}
                            onChange={e => onFormChange({ ...formData, conditionValue: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Target Count</label>
                            <input
                                type="number"
                                min="1"
                                style={inputStyle}
                                value={formData.targetCount}
                                onChange={e => onFormChange({ ...formData, targetCount: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Reward Points</label>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={formData.rewardPoints}
                                onChange={e => onFormChange({ ...formData, rewardPoints: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Reward Currency</label>
                            <input
                                type="number"
                                min="0"
                                style={inputStyle}
                                value={formData.rewardCurrency}
                                onChange={e => onFormChange({ ...formData, rewardCurrency: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={e => onFormChange({ ...formData, active: e.target.checked })}
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <span>Active</span>
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: '#22c55e',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            {editingTask ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
