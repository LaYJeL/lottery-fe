import { DollarSign } from 'lucide-react';
import type { PaymentMethodDto } from '../../types/wallet';
import { modalOverlayStyle, modalContentStyle, inputStyle, selectStyle, buttonPrimary, buttonSecondary } from './walletStyles';

interface DepositModalProps {
    isOpen: boolean;
    amount: string;
    selectedPaymentMethod: string;
    paymentMethods: PaymentMethodDto[];
    onClose: () => void;
    onAmountChange: (amount: string) => void;
    onPaymentMethodChange: (methodId: string) => void;
    onSubmit: () => void;
}

export function DepositModal({
    isOpen,
    amount,
    selectedPaymentMethod,
    paymentMethods,
    onClose,
    onAmountChange,
    onPaymentMethodChange,
    onSubmit
}: DepositModalProps) {
    if (!isOpen) return null;

    const quickAmounts = [25, 50, 100, 200];

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>
                    Deposit Funds
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem'
                    }}>
                        Amount
                    </label>
                    <div style={{ position: 'relative' }}>
                        <DollarSign
                            size={20}
                            style={{
                                position: 'absolute',
                                left: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }}
                        />
                        <input
                            type="number"
                            min="10"
                            step="10"
                            value={amount}
                            onChange={(e) => onAmountChange(e.target.value)}
                            style={inputStyle}
                            placeholder="Enter amount"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                        {quickAmounts.map(val => (
                            <button
                                key={val}
                                onClick={() => onAmountChange(val.toString())}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                ${val}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem'
                    }}>
                        Payment Method
                    </label>
                    <select
                        value={selectedPaymentMethod}
                        onChange={(e) => onPaymentMethodChange(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="" disabled>Select a method</option>
                        {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>
                                {method.type === 'CRYPTO_USDT_TRC20' ? 'USDT (TRC20)' : 'Bank'} ••••{method.identifier.slice(-4)}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={onClose} style={buttonSecondary}>
                        Cancel
                    </button>
                    <button onClick={onSubmit} style={buttonPrimary}>
                        Deposit
                    </button>
                </div>
            </div>
        </div>
    );
}
