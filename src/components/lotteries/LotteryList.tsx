import type { LotteryDto } from '../../types/lottery';
import { LotteryCard } from './LotteryCard';

interface LotteryListProps {
    lotteries: LotteryDto[];
    onBuyTickets: (lottery: LotteryDto) => void;
}

export function LotteryList({ lotteries, onBuyTickets }: LotteryListProps) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Available Lotteries
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
            }}>
                {lotteries.length === 0 ? (
                    <div style={{ color: '#94a3b8', gridColumn: '1 / -1' }}>
                        No lotteries available at the moment.
                    </div>
                ) : (
                    lotteries.map((lottery) => (
                        <LotteryCard
                            key={lottery.id}
                            lottery={lottery}
                            onBuyTickets={onBuyTickets}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
