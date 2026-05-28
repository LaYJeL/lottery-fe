// Color palette
export const colors = {
    primary: '#4f46e5',      // indigo-600
    primaryHover: '#4338ca', // indigo-700
    secondary: '#9333ea',    // purple-600
    secondaryHover: '#7c3aed', // purple-700
    background: '#1e293b',   // slate-800
    cardBg: 'rgba(30, 41, 59, 0.7)',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8', // slate-400
    success: '#22c55e',      // green-500
    successBg: 'rgba(34, 197, 94, 0.2)',
    error: '#ef4444',        // red-500
    errorBg: 'rgba(239, 68, 68, 0.2)',
    warning: '#eab308',      // yellow-500
    warningBg: 'rgba(234, 179, 8, 0.2)',
    info: '#3b82f6',         // blue-500
    infoBg: 'rgba(59, 130, 246, 0.2)',
    border: 'rgba(255, 255, 255, 0.1)',
};

// Button style objects for inline styles
export const buttonStyles = {
    primary: {
        padding: '0.5rem 1rem',
        background: 'linear-gradient(to right, #4f46e5, #9333ea)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'opacity 0.2s',
    },
    secondary: {
        padding: '0.5rem 1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'background 0.2s',
    },
    danger: {
        padding: '0.5rem 1rem',
        background: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'opacity 0.2s',
    },
    ghost: {
        padding: '0.5rem 1rem',
        background: 'transparent',
        color: '#94a3b8',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'color 0.2s, background 0.2s',
    },
};

// Card styles
export const cardStyles = {
    base: {
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        padding: '1.5rem',
    },
    noPadding: {
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        overflow: 'hidden',
    },
};

// Input styles
export const inputStyles = {
    base: {
        width: '100%',
        padding: '0.75rem 1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
    },
    withIcon: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 2.5rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
    },
    error: {
        borderColor: '#ef4444',
    },
};

// Label styles
export const labelStyles = {
    base: {
        display: 'block',
        fontSize: '0.875rem',
        color: '#94a3b8',
        marginBottom: '0.5rem',
    },
};

// Modal styles
export const modalStyles = {
    overlay: {
        position: 'fixed' as const,
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 100,
    },
    content: {
        background: '#1e293b',
        borderRadius: '1rem',
        maxWidth: '28rem',
        width: '100%',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxHeight: '90vh',
        overflowY: 'auto' as const,
    },
};

// Container styles
export const containerStyles = {
    page: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
    },
    narrow: {
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
    },
};

// Badge styles
export const badgeStyles = {
    success: {
        display: 'inline-flex',
        padding: '0.25rem 0.75rem',
        background: 'rgba(34, 197, 94, 0.2)',
        color: '#22c55e',
        borderRadius: '999px',
        fontSize: '0.875rem',
        alignItems: 'center',
        gap: '0.25rem',
    },
    warning: {
        display: 'inline-flex',
        padding: '0.25rem 0.75rem',
        background: 'rgba(234, 179, 8, 0.2)',
        color: '#eab308',
        borderRadius: '999px',
        fontSize: '0.875rem',
        alignItems: 'center',
        gap: '0.25rem',
    },
    error: {
        display: 'inline-flex',
        padding: '0.25rem 0.75rem',
        background: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        borderRadius: '999px',
        fontSize: '0.875rem',
        alignItems: 'center',
        gap: '0.25rem',
    },
    info: {
        display: 'inline-flex',
        padding: '0.25rem 0.75rem',
        background: 'rgba(99, 102, 241, 0.1)',
        color: '#818cf8',
        borderRadius: '999px',
        fontSize: '0.875rem',
        alignItems: 'center',
        gap: '0.25rem',
    },
};

// Gradient backgrounds
export const gradients = {
    primary: 'linear-gradient(to right, #4f46e5, #9333ea)',
    secondary: 'linear-gradient(to right, #9333ea, #db2777)',
    gold: 'linear-gradient(to right, #eab308, #f97316)',
    success: 'linear-gradient(to right, #22c55e, #10b981)',
};
