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
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
};

export const headerGradient = {
    background: 'linear-gradient(to right, #9333ea, #db2777)',
    color: 'white'
};

export const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    color: 'white',
    width: '100%',
    marginBottom: '1rem'
};

export const labelStyle = {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
    display: 'block'
};

export const adminButtonStyle = {
    padding: '0.5rem 1rem',
    color: 'white',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};
