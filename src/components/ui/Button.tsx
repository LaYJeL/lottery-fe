import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
        background: 'linear-gradient(to right, #4f46e5, #9333ea)',
        color: 'white',
        border: 'none',
    },
    secondary: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    danger: {
        background: '#ef4444',
        color: 'white',
        border: 'none',
    },
    ghost: {
        background: 'transparent',
        color: '#94a3b8',
        border: 'none',
    },
    success: {
        background: '#22c55e',
        color: 'white',
        border: 'none',
    },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
        padding: '0.375rem 0.75rem',
        fontSize: '0.875rem',
    },
    md: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
    },
    lg: {
        padding: '0.75rem 1.5rem',
        fontSize: '1.125rem',
    },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    style,
    ...props
}, ref) => {
    const baseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        borderRadius: '0.5rem',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.7 : 1,
        transition: 'opacity 0.2s, background 0.2s',
        width: fullWidth ? '100%' : 'auto',
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
    };

    return (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            style={baseStyle}
            {...props}
        >
            {isLoading ? (
                <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin" />
            ) : leftIcon}
            {children}
            {!isLoading && rightIcon}
        </button>
    );
});

Button.displayName = 'Button';
