import { useKeycloak } from '@react-keycloak/web';
import { Star, Settings } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { authenticatedFetch } from '../api/client';
import { type UserProfileDto } from '../types/user';
import { taskService } from '../api/taskService';
import { adminTaskService } from '../api/adminTaskService';
import type { UserTaskDto, TaskDto } from '../types/task';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import {
    TaskSection,
    AchievementsCard,
    AdminTaskList,
    TaskFormModal,
    ReputationBanner,
    ReputationBenefits
} from '../components/tasks';

const TasksPage = () => {
    const { keycloak } = useKeycloak();
    const toast = useToast();
    const [user, setUser] = useState<UserProfileDto | null>(null);
    const [tasks, setTasks] = useState<UserTaskDto[]>([]);
    const [adminTasks, setAdminTasks] = useState<TaskDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [claimingTaskId, setClaimingTaskId] = useState<string | null>(null);

    // Admin State
    const isAdmin = keycloak.hasRealmRole('ADMIN');
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskDto | null>(null);
    const [formData, setFormData] = useState<Partial<TaskDto>>({
        title: '',
        description: '',
        category: 'DAILY',
        actionType: 'LOGIN',
        targetCount: 1,
        rewardPoints: 10,
        rewardCurrency: 0,
        active: true,
        conditionValue: '',
        icon: ''
    });

    const fetchData = useCallback(async () => {
        if (keycloak.authenticated) {
            setIsLoading(true);
            try {
                const results = await Promise.allSettled([
                    authenticatedFetch('/api/v1/users/me').then(res => res.json()),
                    taskService.getMyTasks(),
                    isAdmin && isAdminMode ? adminTaskService.getAllTasks() : Promise.resolve(null)
                ]);

                // Process user data
                if (results[0].status === 'fulfilled') {
                    setUser(results[0].value as UserProfileDto);
                }

                // Process tasks data
                if (results[1].status === 'fulfilled') {
                    setTasks(results[1].value as UserTaskDto[]);
                }

                // Process admin tasks data
                if (results[2].status === 'fulfilled' && results[2].value) {
                    setAdminTasks(results[2].value as TaskDto[]);
                }

                // Show error if critical data failed to load
                const hasCriticalFailure = results[0].status === 'rejected' || results[1].status === 'rejected';
                if (hasCriticalFailure) {
                    toast.error('Some data failed to load. Please try again.');
                }
            } finally {
                setIsLoading(false);
            }
        }
    }, [keycloak.authenticated, isAdmin, isAdminMode, toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClaim = async (taskId: string) => {
        setClaimingTaskId(taskId);
        try {
            await taskService.claimReward(taskId);
            toast.success('Reward claimed successfully!');
            fetchData();
        } catch {
            toast.error('Failed to claim reward. Please try again.');
        } finally {
            setClaimingTaskId(null);
        }
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setFormData({
            title: '',
            description: '',
            category: 'DAILY',
            actionType: 'LOGIN',
            targetCount: 1,
            rewardPoints: 10,
            rewardCurrency: 0,
            active: true,
            conditionValue: '',
            icon: ''
        });
        setIsModalOpen(true);
    };

    const handleEditTask = (task: TaskDto) => {
        setEditingTask(task);
        setFormData({ ...task });
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await adminTaskService.deleteTask(id);
            toast.success('Task deleted successfully.');
            fetchData();
        } catch {
            toast.error('Failed to delete task. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await adminTaskService.updateTask(editingTask.id, formData);
                toast.success('Task updated successfully.');
            } else {
                await adminTaskService.createTask(formData);
                toast.success('Task created successfully.');
            }
            setIsModalOpen(false);
            fetchData();
        } catch {
            toast.error('Failed to save task. Please try again.');
        }
    };

    // Group tasks for User View
    const dailyTasks = tasks.filter(t => t.category === 'DAILY');
    const weeklyTasks = tasks.filter(t => t.category === 'WEEKLY');
    const specialTasks = tasks.filter(t => t.category === 'SPECIAL');
    const achievements = tasks.filter(t => t.category === 'ACHIEVEMENT');
    const oneTimeTasks = tasks.filter(t => t.category === 'ONETIME');

    const containerStyle = {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    if (isLoading && !user && !isAdminMode) {
        return <div style={{ ...containerStyle, textAlign: 'center' }}>Loading tasks...</div>;
    }

    return (
        <div style={containerStyle}>
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                        {isAdminMode ? 'Manage Tasks (Admin)' : 'Tasks & Rewards'}
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        {isAdminMode ? 'Create and edit task definitions' : 'Complete tasks to earn reputation points'}
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
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Reputation Score</div>
                            <div style={{ fontSize: '1.5rem', color: '#ca8a04', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                <Star fill="#ca8a04" size={24} />
                                <span>{user?.reputation || 0}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Admin View */}
            {isAdminMode ? (
                <AdminTaskList
                    tasks={adminTasks}
                    isLoading={isLoading}
                    onCreateTask={handleCreateTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                />
            ) : (
                /* User View */
                <>
                    {user && <ReputationBanner user={user} />}

                    <TaskSection
                        title="Daily Tasks"
                        subtitle="Resets daily at 00:00 UTC"
                        tasks={dailyTasks}
                        claimingTaskId={claimingTaskId}
                        onClaim={handleClaim}
                        variant="daily"
                    />

                    <TaskSection
                        title="Weekly Challenges"
                        subtitle="Resets weekly"
                        tasks={weeklyTasks}
                        claimingTaskId={claimingTaskId}
                        onClaim={handleClaim}
                        variant="weekly"
                    />

                    <TaskSection
                        title="One-Time Tasks"
                        subtitle="Complete once"
                        tasks={oneTimeTasks}
                        claimingTaskId={claimingTaskId}
                        onClaim={handleClaim}
                        variant="onetime"
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <TaskSection
                            title="Special Rewards"
                            tasks={specialTasks}
                            claimingTaskId={claimingTaskId}
                            onClaim={handleClaim}
                            variant="special"
                        />

                        <AchievementsCard achievements={achievements} />
                    </div>

                    <ReputationBenefits />
                </>
            )}

            <TaskFormModal
                isOpen={isModalOpen}
                editingTask={editingTask}
                formData={formData}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                onFormChange={setFormData}
            />
        </div>
    );
};

export default TasksPage;
