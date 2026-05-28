import { modalOverlayStyle, modalContentStyle, inputStyle, selectStyle, buttonPrimary, buttonSecondary } from './walletStyles';

interface AddPaymentMethodModalProps {
    isOpen: boolean;
    type: string;
    label: string;
    identifier: string;
    onClose: () => void;
    onTypeChange: (type: string) => void;
    onLabelChange: (label: string) => void;
    onIdentifierChange: (identifier: string) => void;
    onSubmit: () => void;
}

export function AddPaymentMethodModal({
    isOpen,
    type,
    label,
    identifier,
    onClose,
    onTypeChange,
    onLabelChange,
    onIdentifierChange,
    onSubmit
}: AddPaymentMethodModalProps) {
    if (!isOpen) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>
                    Add Payment Method
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem'
                    }}>
                        Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="" disabled>Select type</option>
                        <option value="CRYPTO_USDT_TRC20">USDT (TRC20)</option>
                        <option value="CRYPTO_USDT_ERC20">USDT (ERC20)</option>
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="PAYPAL">PayPal</option>
                    </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem'
                    }}>
                        Label
                    </label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => onLabelChange(e.target.value)}
                        style={{ ...inputStyle, paddingLeft: '1rem' }}
                        placeholder="e.g. My Binance Wallet"
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem'
                    }}>
                        Identifier (Address/Number)
                    </label>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => onIdentifierChange(e.target.value)}
                        style={{ ...inputStyle, paddingLeft: '1rem' }}
                        placeholder="Enter wallet address or card #"
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={onClose} style={buttonSecondary}>
                        Cancel
                    </button>
                    <button onClick={onSubmit} style={buttonPrimary}>
                        Add Method
                    </button>
                </div>
            </div>
        </div>
    );
}
