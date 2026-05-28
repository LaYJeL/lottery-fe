import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    leftIcon,
    rightIcon,
    helperText,
    id,
    style,
    ...props
}, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: leftIcon ? '0.75rem 1rem 0.75rem 2.5rem' : '0.75rem 1rem',
        paddingRight: rightIcon ? '2.5rem' : '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${error ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        ...style,
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && (
                <label
                    htmlFor={inputId}
                    style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginBottom: '0.5rem',
                    }}
                >
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                {leftIcon && (
                    <div style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    style={inputStyle}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                    {...props}
                />
                {rightIcon && (
                    <div style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p
                    id={`${inputId}-error`}
                    role="alert"
                    style={{
                        fontSize: '0.875rem',
                        color: '#ef4444',
                        marginTop: '0.25rem',
                    }}
                >
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p
                    id={`${inputId}-helper`}
                    style={{
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        marginTop: '0.25rem',
                    }}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
