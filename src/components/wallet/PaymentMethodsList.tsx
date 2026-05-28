import { CreditCard, DollarSign } from 'lucide-react';
import type { PaymentMethodDto } from '../../types/wallet';
import { cardStyle, labelStyle } from './walletStyles';

interface PaymentMethodsListProps {
    methods: PaymentMethodDto[];
    onAddMethod: () => void;
}

export function PaymentMethodsList({ methods, onAddMethod }: PaymentMethodsListProps) {
    return (
        <div style={cardStyle}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Payment Methods
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {methods.length === 0 && (
                    <div style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>
                        No payment methods found
                    </div>
                )}
                {methods.map(method => {
                    const Icon = method.type.includes('CRYPTO') ? DollarSign : CreditCard;
                    return (
                        <div
                            key={method.id}
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
                                    <Icon size={20} color="#94a3b8" />
                                </div>
                                <div>
                                    <div style={{ marginBottom: '0.25rem' }}>{method.label}</div>
                                    <div style={labelStyle}>{method.identifier}</div>
                                </div>
                            </div>
                            {method.primary && (
                                <div style={{
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    color: '#818cf8',
                                    borderRadius: '999px',
                                    fontSize: '0.875rem'
                                }}>
                                    Primary
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <button
                onClick={onAddMethod}
                style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#94a3b8',
                    borderRadius: '0.75rem',
                    cursor: 'pointer'
                }}
            >
                Add Payment Method
            </button>
        </div>
    );
}
