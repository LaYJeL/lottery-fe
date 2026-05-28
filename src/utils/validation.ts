export type ValidationResult = string | null;
export type Validator<T = string> = (value: T) => ValidationResult;

// Basic validators
export const validators = {
    required: (value: string): ValidationResult =>
        !value || value.trim() === '' ? 'This field is required' : null,

    email: (value: string): ValidationResult => {
        if (!value) return null; // Use required validator for empty check
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : null;
    },

    phone: (value: string): ValidationResult => {
        if (!value) return null;
        return !/^\+?[\d\s-]{10,}$/.test(value) ? 'Please enter a valid phone number' : null;
    },

    minLength: (min: number): Validator =>
        (value: string) => {
            if (!value) return null;
            return value.length < min ? `Must be at least ${min} characters` : null;
        },

    maxLength: (max: number): Validator =>
        (value: string) => {
            if (!value) return null;
            return value.length > max ? `Must be no more than ${max} characters` : null;
        },

    minValue: (min: number): Validator<number> =>
        (value: number) => value < min ? `Must be at least ${min}` : null,

    maxValue: (max: number): Validator<number> =>
        (value: number) => value > max ? `Must be no more than ${max}` : null,

    pattern: (regex: RegExp, message: string): Validator =>
        (value: string) => {
            if (!value) return null;
            return !regex.test(value) ? message : null;
        },

    match: (fieldName: string, getValue: () => string): Validator =>
        (value: string) => value !== getValue() ? `Must match ${fieldName}` : null,

    url: (value: string): ValidationResult => {
        if (!value) return null;
        try {
            new URL(value);
            return null;
        } catch {
            return 'Please enter a valid URL';
        }
    },

    positiveNumber: (value: number): ValidationResult =>
        value <= 0 ? 'Must be a positive number' : null,

    integer: (value: number): ValidationResult =>
        !Number.isInteger(value) ? 'Must be a whole number' : null,
};

// Compose multiple validators
export function composeValidators<T>(...validators: Validator<T>[]): Validator<T> {
    return (value: T) => {
        for (const validator of validators) {
            const error = validator(value);
            if (error) return error;
        }
        return null;
    };
}

// Validate a single field with multiple rules
export function validateField<T>(value: T, rules: Validator<T>[]): ValidationResult {
    for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
    }
    return null;
}

// Validate an entire form
export type FormRules<T> = {
    [K in keyof T]?: Validator<T[K]>[];
};

export type FormErrors<T> = {
    [K in keyof T]?: string;
};

export function validateForm<T extends Record<string, unknown>>(
    values: T,
    rules: FormRules<T>
): FormErrors<T> {
    const errors: FormErrors<T> = {};

    for (const field of Object.keys(rules) as (keyof T)[]) {
        const fieldRules = rules[field];
        if (fieldRules) {
            const value = values[field];
            for (const rule of fieldRules) {
                const error = (rule as Validator<typeof value>)(value);
                if (error) {
                    errors[field] = error;
                    break;
                }
            }
        }
    }

    return errors;
}

// Check if form has any errors
export function hasErrors<T>(errors: FormErrors<T>): boolean {
    return Object.values(errors).some(error => error !== undefined && error !== null);
}

// Format currency for display
export function formatCurrency(amount: number, currency = '$'): string {
    return `${currency}${amount.toFixed(2)}`;
}

// Format date for display
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString();
}

// Format date with time
export function formatDateTime(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
