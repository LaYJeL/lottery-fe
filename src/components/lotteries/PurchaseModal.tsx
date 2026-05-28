import { ShoppingCart } from 'lucide-react';
import type { LotteryDto } from '../../types/lottery';
import { modalOverlayStyle, modalContentStyle, inputStyle, labelStyle, lotteryGradients } from './lotteryStyles';

interface PurchaseModalProps {
    lottery: LotteryDto | null;
    ticketCount: number;
    isLoading: boolean;
    onTicketCountChange: (count: number) => void;
    onClose: () => void;
    onPurchase: () => void;
}

export function PurchaseModal({
    lottery,
    ticketCount,
    isLoading,
    onTicketCountChange,
    onClose,
    onPurchase
}: PurchaseModalProps) {
    if (!lottery) return null;

    const gradient = lottery.color || lotteryGradients[lottery.type] || lotteryGradients.WEEKLY;
    const totalCost = lottery.ticketPrice * ticketCount;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>
                    {lottery.name}
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem'
                    }}>
                        Number of Tickets
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={ticketCount}
                        onChange={(e) => onTicketCountChange(parseInt(e.target.value) || 1)}
                        style={inputStyle}
                        disabled={isLoading}
                    />
                </div>
                <div style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '0.75rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={labelStyle}>Price per ticket</span>
                        <span>${lottery.ticketPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={labelStyle}>Quantity</span>
                        <span>{ticketCount}</span>
                    </div>
                    <div style={{
                        paddingTop: '0.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>Total</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>${totalCost}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            borderRadius: '0.75rem',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onPurchase}
                        disabled={isLoading}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: gradient,
                            border: 'none',
                            color: 'white',
                            borderRadius: '0.75rem',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontWeight: 500,
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        <ShoppingCart size={20} />
                        <span>{isLoading ? 'Processing...' : 'Purchase'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
