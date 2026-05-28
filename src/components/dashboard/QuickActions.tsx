import { useNavigate } from 'react-router-dom';

export function QuickActions() {
    const navigate = useNavigate();

    return (
        <div style={{
            background: '#646cff',
            padding: '2rem',
            borderRadius: '1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                    Ready to get lucky?
                </h2>
                <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '1.5rem',
                    maxWidth: '600px'
                }}>
                    Check out the latest lotteries and competitions or complete tasks to boost your reputation
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button
                        onClick={() => navigate('/lotteries')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'white',
                            color: '#646cff',
                            borderRadius: '0.75rem',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Browse Lotteries
                    </button>
                    <button
                        onClick={() => navigate('/competitions')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '0.75rem',
                            cursor: 'pointer'
                        }}
                    >
                        View Competitions
                    </button>
                    <button
                        onClick={() => navigate('/tasks')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '0.75rem',
                            cursor: 'pointer'
                        }}
                    >
                        Complete Tasks
                    </button>
                </div>
            </div>
        </div>
    );
}
