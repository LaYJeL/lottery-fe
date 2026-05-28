import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    success: {
        background: 'rgba(34, 197, 94, 0.2)',
        color: '#22c55e',
    },
    warning: {
        background: 'rgba(234, 179, 8, 0.2)',
        color: '#eab308',
    },
    error: {
        background: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
    },
    info: {
        background: 'rgba(99, 102, 241, 0.1)',
        color: '#818cf8',
    },
    default: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#94a3b8',
    },
};

const sizeStyles: Record<'sm' | 'md', React.CSSProperties> = {
    sm: {
        padding: '0.125rem 0.5rem',
        fontSize: '0.75rem',
    },
    md: {
        padding: '0.25rem 0.75rem',
        fontSize: '0.875rem',
    },
};

export function Badge({
    variant = 'default',
    size = 'md',
    icon,
    children,
    style,
    ...props
}: BadgeProps) {
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                borderRadius: '999px',
                fontWeight: 500,
                ...variantStyles[variant],
                ...sizeStyles[size],
                ...style,
            }}
            {...props}
        >
            {icon}
            {children}
        </span>
    );
}
