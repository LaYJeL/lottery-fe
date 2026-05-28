export function ReputationBenefits() {
    return (
        <div style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)', padding: '2rem', borderRadius: '1rem', color: 'white' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Reputation Benefits</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                    <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>⚡</div>
                    <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Priority Support</div>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>Get faster response times for your queries</p>
                </div>
                <div>
                    <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>🎁</div>
                    <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Exclusive Rewards</div>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>Access special competitions and bonuses</p>
                </div>
                <div>
                    <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>💰</div>
                    <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Higher Limits</div>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>Increased deposit and withdrawal limits</p>
                </div>
            </div>
        </div>
    );
}
