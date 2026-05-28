import type { LucideIcon } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { cardStyle } from './dashboardStyles';

interface StatsCardProps {
    label: string;
    value: string;
    change?: string;
    icon: LucideIcon;
    color: string;
}

export function StatsCard({ label, value, change, icon: Icon, color }: StatsCardProps) {
    return (
        <div style={cardStyle}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
            }}>
                <div style={{
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    backgroundColor: `${color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={24} color={color} />
                </div>
                {change && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        color: '#34d399'
                    }}>
                        <TrendingUp size={16} style={{ marginRight: '0.25rem' }} />
                        <span>{change}</span>
                    </div>
                )}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {value}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                {label}
            </div>
        </div>
    );
}
