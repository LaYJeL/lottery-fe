import { useKeycloak } from '@react-keycloak/web';
import { DollarSign, Star, Ticket, Trophy } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { authenticatedFetch } from '../api/client';
import { dashboardService } from '../api/dashboardService';
import type { UserProfileDto } from '../types/user';
import type { DashboardStatsDto, RecentActivityDto, UpcomingDrawDto } from '../types/dashboard';
import { StatsCard, RecentActivity, UpcomingDraws, QuickActions } from '../components/dashboard';

const DashboardPage = () => {
    const { keycloak } = useKeycloak();
    const [user, setUser] = useState<UserProfileDto | null>(null);
    const [stats, setStats] = useState<DashboardStatsDto | null>(null);
    const [activities, setActivities] = useState<RecentActivityDto[]>([]);
    const [upcomingDraws, setUpcomingDraws] = useState<UpcomingDrawDto[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (keycloak.authenticated) {
            try {
                setLoading(true);

                // Fetch user data
                try {
                    const userData = await authenticatedFetch('/api/v1/users/me').then(res => res.json());
                    setUser(userData);
                } catch { /* Failed to fetch user */ }

                // Fetch dashboard stats
                try {
                    const statsData = await dashboardService.getStats();
                    setStats(statsData);
                } catch { /* Failed to fetch stats */ }

                // Fetch recent activity
                try {
                    const activityData = await dashboardService.getRecentActivity(4);
                    setActivities(activityData);
                } catch { /* Failed to fetch activity */ }

                // Fetch upcoming draws
                try {
                    const drawsData = await dashboardService.getUpcomingDraws(3);
                    setUpcomingDraws(drawsData);
                } catch { /* Failed to fetch draws */ }
            } finally {
                setLoading(false);
            }
        }
    }, [keycloak.authenticated]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const containerStyle = {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const sectionGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    // Get display name
    const displayName = user?.onboardingStatus?.firstNamePresent
        ? user.firstName
        : (user?.displayName || 'Player');

    if (loading && !user && !stats) {
        return <div style={{ ...containerStyle, textAlign: 'center', marginTop: '4rem' }}>Loading dashboard...</div>;
    }

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Welcome back, {displayName}!
                </h1>
                <p style={{ color: '#94a3b8' }}>Here's what's happening with your account</p>
            </div>

            {/* Stats Grid */}
            <div style={statsGridStyle}>
                <StatsCard
                    label="Account Balance"
                    value={stats ? `${stats.currency}${stats.balance.toFixed(2)}` : '...'}
                    change={stats?.balanceChange}
                    icon={DollarSign}
                    color="#22c55e"
                />
                <StatsCard
                    label="Reputation Score"
                    value={stats?.reputation?.toString() || '...'}
                    change={stats?.reputationChange}
                    icon={Star}
                    color="#eab308"
                />
                <StatsCard
                    label="Active Tickets"
                    value={stats?.activeTickets?.toString() || '...'}
                    change={stats?.ticketsChange}
                    icon={Ticket}
                    color="#646cff"
                />
                <StatsCard
                    label="Competitions"
                    value={stats?.activeCompetitions?.toString() || '...'}
                    change={stats?.competitionsChange}
                    icon={Trophy}
                    color="#ec4899"
                />
            </div>

            {/* Activity and Draws Grid */}
            <div style={sectionGridStyle}>
                <RecentActivity activities={activities} />
                <UpcomingDraws draws={upcomingDraws} />
            </div>

            {/* Quick Actions */}
            <QuickActions />
        </div>
    );
};

export default DashboardPage;
