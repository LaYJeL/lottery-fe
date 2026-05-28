import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import type { WalletDto } from '../../types/wallet';

interface BalanceCardProps {
    wallet: WalletDto | null;
    onDeposit: () => void;
    onWithdraw: () => void;
}

export function BalanceCard({ wallet, onDeposit, onWithdraw }: BalanceCardProps) {
    return (
        <div style={{
            background: 'linear-gradient(to right, #4f46e5, #9333ea)',
            padding: '2rem',
            borderRadius: '1rem',
            color: 'white',
            marginBottom: '1.5rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <div style={{ fontSize: '0.875rem', color: '#e0e7ff', marginBottom: '0.5rem' }}>
                        Available Balance
                    </div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 600 }}>
                        {wallet ? `${wallet?.currency || '$'}${wallet.balance.toFixed(2)}` : '...'}
                    </div>
                </div>
                <div style={{
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '0.75rem',
                    height: 'fit-content'
                }}>
                    <DollarSign size={32} />
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={onDeposit}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'white',
                        color: '#4f46e5',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 600
                    }}
                >
                    <ArrowDownCircle size={20} />
                    <span>Deposit</span>
                </button>
                <button
                    onClick={onWithdraw}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#6366f1',
                        color: 'white',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 600
                    }}
                >
                    <ArrowUpCircle size={20} />
                    <span>Withdraw</span>
                </button>
            </div>
        </div>
    );
}
