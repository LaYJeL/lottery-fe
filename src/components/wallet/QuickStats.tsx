import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp } from 'lucide-react';
import type { WalletDto } from '../../types/wallet';
import { cardStyle, labelStyle } from './walletStyles';

interface QuickStatsProps {
    wallet: WalletDto | null;
}

export function QuickStats({ wallet }: QuickStatsProps) {
    const stats = [
        {
            label: 'Total Deposited',
            value: wallet?.monthlyStats.totalDeposited ?? 0,
            icon: ArrowDownCircle,
            iconColor: '#22c55e',
            iconBg: 'rgba(34, 197, 94, 0.1)',
            trendColor: '#22c55e'
        },
        {
            label: 'Total Withdrawn',
            value: wallet?.monthlyStats.totalWithdrawn ?? 0,
            icon: ArrowUpCircle,
            iconColor: '#3b82f6',
            iconBg: 'rgba(59, 130, 246, 0.1)',
            trendColor: '#3b82f6'
        },
        {
            label: 'Total Spent',
            value: wallet?.monthlyStats.totalSpent ?? 0,
            icon: DollarSign,
            iconColor: '#a855f7',
            iconBg: 'rgba(168, 85, 247, 0.1)',
            trendColor: '#a855f7'
        }
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
        }}>
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} style={cardStyle}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem'
                        }}>
                            <div style={{
                                padding: '0.5rem',
                                background: stat.iconBg,
                                borderRadius: '0.5rem'
                            }}>
                                <Icon size={20} color={stat.iconColor} />
                            </div>
                            <div style={labelStyle}>{stat.label}</div>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                            ${stat.value.toFixed(2)}
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.875rem',
                            color: stat.trendColor,
                            marginTop: '0.25rem'
                        }}>
                            <TrendingUp size={16} style={{ marginRight: '0.25rem' }} />
                            <span>This month</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
