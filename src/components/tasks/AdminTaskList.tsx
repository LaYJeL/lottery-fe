import { Plus, Trash2, Edit2 } from 'lucide-react';
import type { TaskDto } from '../../types/task';

interface AdminTaskListProps {
    tasks: TaskDto[];
    isLoading: boolean;
    onCreateTask: () => void;
    onEditTask: (task: TaskDto) => void;
    onDeleteTask: (id: string) => void;
}

export function AdminTaskList({ tasks, isLoading, onCreateTask, onEditTask, onDeleteTask }: AdminTaskListProps) {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={onCreateTask}
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
                    Create New Task
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {tasks.map(task => (
                    <div
                        key={task.id}
                        style={{
                            background: 'rgba(30,41,59,0.7)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{task.title}</span>
                                {!task.active && (
                                    <span style={{ background: '#ef4444', padding: '0.1rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                                        Inactive
                                    </span>
                                )}
                                <span style={{ background: '#6366f1', padding: '0.1rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                                    {task.category}
                                </span>
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{task.description}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                Target: {task.targetCount} | Action: {task.actionType} | Reward: {task.rewardPoints} pts
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => onEditTask(task)}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => onDeleteTask(task.id)}
                                disabled={task.active}
                                title={task.active ? "Deactivate task to delete" : "Delete task"}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    background: task.active ? 'rgba(255,255,255,0.05)' : 'rgba(239, 68, 68, 0.2)',
                                    border: 'none',
                                    color: task.active ? '#64748b' : '#ef4444',
                                    cursor: task.active ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && !isLoading && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No tasks found.</div>
                )}
            </div>
        </div>
    );
}
