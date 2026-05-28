import { Ticket } from 'lucide-react';
import type { LotteryTicketDto } from '../../types/lottery';
import { cardStyle, labelStyle } from './lotteryStyles';

interface MyTicketsProps {
    tickets: LotteryTicketDto[];
}

export function MyTickets({ tickets }: MyTicketsProps) {
    if (tickets.length === 0) {
        return null;
    }

    return (
        <div style={{ ...cardStyle, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                My Active Tickets
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                            borderRadius: '0.75rem'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                padding: '0.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#6366f1'
                            }}>
                                <Ticket size={20} />
                            </div>
                            <div>
                                <div style={{ marginBottom: '0.25rem', fontWeight: 500 }}>
                                    {ticket.lotteryName}
                                </div>
                                <div style={labelStyle}>{ticket.ticketNumber}</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={labelStyle}>Draw Date</div>
                            <div style={{ fontSize: '0.875rem' }}>
                                {new Date(ticket.drawDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
