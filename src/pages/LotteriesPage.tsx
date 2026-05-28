import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState, useCallback } from 'react';
import { walletService } from '../api/walletService';
import { lotteryService } from '../api/lotteryService';
import type { LotteryDto, LotteryTicketDto } from '../types/lottery';
import type { WalletDto } from '../types/wallet';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { LotteryList, MyTickets, PurchaseModal } from '../components/lotteries';

const LotteriesPage = () => {
    const { keycloak } = useKeycloak();
    const toast = useToast();
    const [wallet, setWallet] = useState<WalletDto | null>(null);
    const [lotteries, setLotteries] = useState<LotteryDto[]>([]);
    const [myTickets, setMyTickets] = useState<LotteryTicketDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [selectedLottery, setSelectedLottery] = useState<LotteryDto | null>(null);
    const [ticketCount, setTicketCount] = useState(1);

    const fetchData = useCallback(async () => {
        if (keycloak.authenticated) {
            try {
                setLoading(true);

                // Fetch wallet data
                try {
                    const walletData = await walletService.getWalletDetails();
                    setWallet(walletData);
                } catch { /* Failed to fetch wallet */ }

                // Fetch lotteries
                try {
                    const lotteriesData = await lotteryService.getAllLotteries();
                    setLotteries(lotteriesData);
                } catch { /* Failed to fetch lotteries */ }

                // Fetch user's tickets
                try {
                    const ticketsData = await lotteryService.getMyActiveTickets();
                    setMyTickets(ticketsData);
                } catch { /* Failed to fetch tickets */ }
            } finally {
                setLoading(false);
            }
        }
    }, [keycloak.authenticated]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleBuyTickets = (lottery: LotteryDto) => {
        setSelectedLottery(lottery);
        setTicketCount(1);
    };

    const handlePurchase = async () => {
        if (!selectedLottery) return;

        setPurchasing(true);
        try {
            const response = await lotteryService.purchaseTickets({
                lotteryId: selectedLottery.id,
                quantity: ticketCount,
            });
            toast.success(`Successfully purchased ${response.tickets.length} ticket(s)!`);
            setSelectedLottery(null);
            setTicketCount(1);
            // Refresh data to show new tickets
            fetchData();
        } catch {
            toast.error('Failed to purchase tickets. Please try again.');
        } finally {
            setPurchasing(false);
        }
    };

    const containerStyle = {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
    };

    if (loading && !wallet && lotteries.length === 0) {
        return <div style={{ ...containerStyle, textAlign: 'center', marginTop: '4rem' }}>Loading lotteries...</div>;
    }

    return (
        <div style={containerStyle}>
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Lottery Tickets
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        Choose your lucky numbers and win big prizes
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Your Balance</div>
                    <div style={{ fontSize: '1.5rem', color: '#6366f1', fontWeight: 600 }}>
                        ${wallet?.balance.toFixed(2) || '0.00'}
                    </div>
                </div>
            </div>

            <MyTickets tickets={myTickets} />

            <LotteryList lotteries={lotteries} onBuyTickets={handleBuyTickets} />

            <PurchaseModal
                lottery={selectedLottery}
                ticketCount={ticketCount}
                isLoading={purchasing}
                onTicketCountChange={setTicketCount}
                onClose={() => setSelectedLottery(null)}
                onPurchase={handlePurchase}
            />
        </div>
    );
};

export default LotteriesPage;
