export const containerStyle = {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    color: 'white',
    fontFamily: 'Inter, sans-serif'
};

export const cardStyle = {
    background: 'rgba(30,41,59,0.7)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem'
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
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    outline: 'none'
};

export const selectStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    color: 'white',
    outline: 'none'
};

export const buttonPrimary = {
    flex: 1,
    padding: '0.75rem',
    background: 'linear-gradient(to right, #4f46e5, #9333ea)',
    border: 'none',
    color: 'white',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontWeight: 600
};

export const buttonSecondary = {
    flex: 1,
    padding: '0.75rem',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    borderRadius: '0.75rem',
    cursor: 'pointer'
};
