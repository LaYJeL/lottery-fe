// Shared styles for profile components

export const cardStyle = {
    background: 'rgba(30,41,59,0.7)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '1.5rem',
    borderRadius: '1rem',
    marginBottom: '1.5rem'
};

export const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '0.75rem',
    marginBottom: '1rem'
};

export const iconBoxStyle = (color = '#94a3b8') => ({
    padding: '0.5rem',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    color: color
});

export const labelStyle = { fontSize: '0.875rem', color: '#94a3b8' };
export const valueStyle = { color: 'white' };

export const modalOverlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
};

export const modalContentStyle = {
    background: '#1e293b',
    padding: '2rem',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid rgba(255,255,255,0.1)',
    maxHeight: '90vh',
    overflowY: 'auto' as const
};

export const inputGroupStyle = {
    marginBottom: '1rem'
};

export const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    marginTop: '0.5rem'
};

export const buttonPrimaryStyle = {
    padding: '0.75rem 1.5rem',
    background: '#4f46e5',
    color: 'white',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};

export const formatDate = (timestamp?: number | string) => {
    if (!timestamp) return 'Not set';
    return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    });
};
