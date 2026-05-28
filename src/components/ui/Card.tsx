import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'gradient';
    gradient?: string;
    noPadding?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
    variant = 'default',
    gradient,
    noPadding = false,
    style,
    children,
    ...props
}, ref) => {
    const baseStyle: React.CSSProperties = {
        background: variant === 'gradient' && gradient
            ? gradient
            : 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(24px)',
        border: variant === 'gradient' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        padding: noPadding ? 0 : '1.5rem',
        color: 'white',
        ...style,
    };

    return (
        <div ref={ref} style={baseStyle} {...props}>
            {children}
        </div>
    );
});

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, style, ...props }: CardHeaderProps) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
                ...style,
            }}
            {...props}
        >
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: subtitle ? '0.25rem' : 0 }}>
                    {title}
                </h3>
                {subtitle && (
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{subtitle}</p>
                )}
            </div>
            {action}
        </div>
    );
}
