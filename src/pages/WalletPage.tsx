import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { walletService } from '../api/walletService';
import type { PaymentMethodDto, TransactionDto, WalletDto } from '../types/wallet';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import {
    BalanceCard,
    QuickStats,
    PaymentMethodsList,
    TransactionHistory,
    DepositModal,
    WithdrawModal,
    AddPaymentMethodModal
} from '../components/wallet';

const WalletPage = () => {
    const { keycloak } = useKeycloak();
    const toast = useToast();
    const [wallet, setWallet] = useState<WalletDto | null>(null);
    const [transactions, setTransactions] = useState<TransactionDto[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDto[]>([]);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showAddMethodModal, setShowAddMethodModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [newMethodType, setNewMethodType] = useState<string>('');
    const [newMethodIdentifier, setNewMethodIdentifier] = useState('');
    const [newMethodLabel, setNewMethodLabel] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const results = await Promise.allSettled([
                walletService.getWalletDetails(),
                walletService.getTransactions(0, 5),
                walletService.getPaymentMethods()
            ]);

            // Process wallet data
            if (results[0].status === 'fulfilled') {
                setWallet(results[0].value);
            }

            // Process transactions data
            if (results[1].status === 'fulfilled') {
                setTransactions(results[1].value.content);
            }

            // Process payment methods data
            if (results[2].status === 'fulfilled') {
                setPaymentMethods(results[2].value);
                if (results[2].value.length > 0) {
                    setSelectedPaymentMethod(results[2].value[0].id);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (keycloak.authenticated) {
            fetchData();
        }
    }, [keycloak.authenticated]);

    const handleAddMethod = async () => {
        if (!newMethodType || !newMethodIdentifier || !newMethodLabel) return;
        try {
            await walletService.addPaymentMethod({
                type: newMethodType,
                identifier: newMethodIdentifier,
                label: newMethodLabel
            });
            setShowAddMethodModal(false);
            setNewMethodType('');
            setNewMethodIdentifier('');
            setNewMethodLabel('');
            toast.success('Payment method added successfully.');
            fetchData();
        } catch {
            toast.error('Failed to add payment method. Please try again.');
        }
    };

    const handleDeposit = async () => {
        if (!amount || !selectedPaymentMethod) return;
        try {
            await walletService.deposit({
                amount: parseFloat(amount),
                paymentMethodId: selectedPaymentMethod
            });
            setShowDepositModal(false);
            setAmount('');
            toast.success('Deposit initiated successfully.');
            fetchData();
        } catch {
            toast.error('Deposit failed. Please try again.');
        }
    };

    const handleWithdraw = async () => {
        if (!amount || !selectedPaymentMethod) return;
        try {
            await walletService.withdraw({
                amount: parseFloat(amount),
                paymentMethodId: selectedPaymentMethod
            });
            setShowWithdrawModal(false);
            setAmount('');
            toast.success('Withdrawal initiated successfully.');
            fetchData();
        } catch {
            toast.error('Withdrawal failed. Please try again.');
        }
    };

    const containerStyle = {
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    if (loading && !wallet) {
        return <div style={{ ...containerStyle, textAlign: 'center' }}>Loading wallet details...</div>;
    }

    return (
        <div style={containerStyle}>
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Wallet</h1>
                <p style={{ color: '#94a3b8' }}>Manage your balance and transactions</p>
            </div>

            <BalanceCard
                wallet={wallet}
                onDeposit={() => setShowDepositModal(true)}
                onWithdraw={() => setShowWithdrawModal(true)}
            />

            <QuickStats wallet={wallet} />

            <PaymentMethodsList
                methods={paymentMethods}
                onAddMethod={() => setShowAddMethodModal(true)}
            />

            <TransactionHistory transactions={transactions} />

            <DepositModal
                isOpen={showDepositModal}
                amount={amount}
                selectedPaymentMethod={selectedPaymentMethod}
                paymentMethods={paymentMethods}
                onClose={() => setShowDepositModal(false)}
                onAmountChange={setAmount}
                onPaymentMethodChange={setSelectedPaymentMethod}
                onSubmit={handleDeposit}
            />

            <WithdrawModal
                isOpen={showWithdrawModal}
                amount={amount}
                wallet={wallet}
                selectedPaymentMethod={selectedPaymentMethod}
                paymentMethods={paymentMethods}
                onClose={() => setShowWithdrawModal(false)}
                onAmountChange={setAmount}
                onPaymentMethodChange={setSelectedPaymentMethod}
                onSubmit={handleWithdraw}
            />

            <AddPaymentMethodModal
                isOpen={showAddMethodModal}
                type={newMethodType}
                label={newMethodLabel}
                identifier={newMethodIdentifier}
                onClose={() => setShowAddMethodModal(false)}
                onTypeChange={setNewMethodType}
                onLabelChange={setNewMethodLabel}
                onIdentifierChange={setNewMethodIdentifier}
                onSubmit={handleAddMethod}
            />
        </div>
    );
};

export default WalletPage;
