import { Ticket, Clock, Users, TrendingUp } from 'lucide-react';
import type { LotteryDto } from '../../types/lottery';
import { cardStyle, labelStyle, lotteryGradients } from './lotteryStyles';

interface LotteryCardProps {
    lottery: LotteryDto;
    onBuyTickets: (lottery: LotteryDto) => void;
}

function formatTimeRemaining(drawTime: string): string {
    const now = new Date();
    const draw = new Date(drawTime);
    const diffMs = draw.getTime() - now.getTime();

    if (diffMs <= 0) return 'Drawing soon';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

export function LotteryCard({ lottery, onBuyTickets }: LotteryCardProps) {
    const gradient = lottery.color || lotteryGradients[lottery.type] || lotteryGradients.WEEKLY;
    const odds = lottery.odds || `1 in ${lottery.participantsCount.toLocaleString()}`;

    return (
        <div style={cardStyle}>
            <div style={{ height: '8rem', background: gradient, padding: '1.5rem', color: 'white' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '999px'
                    }}>
                        {lottery.type}
                    </div>
                    <Ticket size={24} />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{lottery.name}</div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                        {lottery.prize}
                    </div>
                    <div style={labelStyle}>{lottery.description}</div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                            <Clock size={16} style={{ marginRight: '0.5rem' }} />
                            Draw in
                        </div>
                        <div>{formatTimeRemaining(lottery.drawTime)}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                            <Users size={16} style={{ marginRight: '0.5rem' }} />
                            Participants
                        </div>
                        <div>{lottery.participantsCount.toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                            <TrendingUp size={16} style={{ marginRight: '0.5rem' }} />
                            Your odds
                        </div>
                        <div>{odds}</div>
                    </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                    }}>
                        <div style={{ color: '#94a3b8' }}>Ticket Price</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>${lottery.ticketPrice}</div>
                    </div>
                    <button
                        onClick={() => onBuyTickets(lottery)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: gradient,
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: '1rem'
                        }}
                    >
                        Buy Tickets
                    </button>
                </div>
            </div>
        </div>
    );
}
