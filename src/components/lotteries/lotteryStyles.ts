export const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    color: 'white',
    fontFamily: 'Inter, sans-serif'
};

export const cardStyle = {
    background: 'rgba(30,41,59,0.7)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'transform 0.2s',
};

export const labelStyle = {
    fontSize: '0.875rem',
    color: '#94a3b8'
};

export const modalOverlayStyle = {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 50
};

export const modalContentStyle = {
    background: '#1e293b',
    borderRadius: '1rem',
    maxWidth: '28rem',
    width: '100%',
    padding: '1.5rem',
    border: '1px solid rgba(255,255,255,0.1)'
};

export const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    outline: 'none'
};

// Default gradients for lottery types
export const lotteryGradients: Record<string, string> = {
    DAILY: 'linear-gradient(to right, #3b82f6, #06b6d4)',
    WEEKLY: 'linear-gradient(to right, #6366f1, #a855f7)',
    MONTHLY: 'linear-gradient(to right, #a855f7, #ec4899)',
    INSTANT: 'linear-gradient(to right, #22c55e, #10b981)',
};
