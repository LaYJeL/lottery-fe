import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    options,
    placeholder,
    helperText,
    id,
    style,
    ...props
}, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const selectStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem 1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${error ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '1rem',
        paddingRight: '2.5rem',
        ...style,
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && (
                <label
                    htmlFor={selectId}
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
            <select
                ref={ref}
                id={selectId}
                style={selectStyle}
                aria-invalid={!!error}
                aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p
                    id={`${selectId}-error`}
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
                    id={`${selectId}-helper`}
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

Select.displayName = 'Select';
