import { ArrowUpCircle, ArrowDownCircle, DollarSign, Calendar } from 'lucide-react';
import type { TransactionDto } from '../../types/wallet';
import { cardStyle, labelStyle } from './walletStyles';

interface TransactionHistoryProps {
    transactions: TransactionDto[];
}

function getTransactionIcon(type: string) {
    switch (type) {
        case 'DEPOSIT':
            return <ArrowDownCircle size={20} color="#22c55e" />;
        case 'WITHDRAWAL':
            return <ArrowUpCircle size={20} color="#3b82f6" />;
        case 'REWARD':
            return <ArrowDownCircle size={20} color="#a855f7" />;
        default:
            return <DollarSign size={20} color="#94a3b8" />;
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case 'COMPLETED':
            return { background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' };
        case 'PROCESSING':
        case 'PENDING':
            return { background: 'rgba(234, 179, 8, 0.2)', color: '#eab308' };
        case 'FAILED':
            return { background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
        default:
            return { background: 'rgba(255,255,255,0.1)', color: '#94a3b8' };
    }
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
    return (
        <div style={cardStyle}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Transaction History</h2>
                <Calendar size={20} color="#94a3b8" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {transactions.length === 0 && (
                    <div style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>
                        No transactions found
                    </div>
                )}
                {transactions.map(transaction => {
                    const statusStyle = getStatusColor(transaction.status);
                    const date = new Date(transaction.createdAt);
                    return (
                        <div
                            key={transaction.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '0.75rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    padding: '0.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem'
                                }}>
                                    {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                    <div style={{ marginBottom: '0.25rem' }}>
                                        {transaction.type === 'DEPOSIT' && `Deposit via ${transaction.paymentMethodLabel}`}
                                        {transaction.type === 'WITHDRAWAL' && `Withdrawal to ${transaction.paymentMethodLabel}`}
                                        {!['DEPOSIT', 'WITHDRAWAL'].includes(transaction.type) && transaction.description}
                                    </div>
                                    <div style={labelStyle}>
                                        {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: '1.125rem',
                                    marginBottom: '0.25rem',
                                    color: transaction.amount > 0 ? '#22c55e' : 'white'
                                }}>
                                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.5rem',
                                    ...statusStyle,
                                    borderRadius: '999px',
                                    fontSize: '0.75rem'
                                }}>
                                    {transaction.status}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
