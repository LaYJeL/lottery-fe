import { describe, it, expect } from 'vitest';
import {
    validators,
    composeValidators,
    validateField,
    validateForm,
    hasErrors,
    formatCurrency,
    formatDate,
} from '../validation';

describe('validators', () => {
    describe('required', () => {
        it('should return error for empty string', () => {
            expect(validators.required('')).toBe('This field is required');
        });

        it('should return error for whitespace only', () => {
            expect(validators.required('   ')).toBe('This field is required');
        });

        it('should return null for valid string', () => {
            expect(validators.required('hello')).toBeNull();
        });
    });

    describe('email', () => {
        it('should return null for empty string', () => {
            expect(validators.email('')).toBeNull();
        });

        it('should return error for invalid email', () => {
            expect(validators.email('invalid')).toBe('Please enter a valid email address');
            expect(validators.email('invalid@')).toBe('Please enter a valid email address');
            expect(validators.email('@test.com')).toBe('Please enter a valid email address');
        });

        it('should return null for valid email', () => {
            expect(validators.email('test@example.com')).toBeNull();
            expect(validators.email('user.name@domain.co.uk')).toBeNull();
        });
    });

    describe('phone', () => {
        it('should return null for empty string', () => {
            expect(validators.phone('')).toBeNull();
        });

        it('should return error for invalid phone', () => {
            expect(validators.phone('123')).toBe('Please enter a valid phone number');
        });

        it('should return null for valid phone', () => {
            expect(validators.phone('+1 234 567 8900')).toBeNull();
            expect(validators.phone('1234567890')).toBeNull();
        });
    });

    describe('minLength', () => {
        it('should return error when string is too short', () => {
            const validator = validators.minLength(5);
            expect(validator('abc')).toBe('Must be at least 5 characters');
        });

        it('should return null when string meets minimum', () => {
            const validator = validators.minLength(5);
            expect(validator('abcde')).toBeNull();
            expect(validator('abcdef')).toBeNull();
        });
    });

    describe('minValue', () => {
        it('should return error when value is below minimum', () => {
            const validator = validators.minValue(10);
            expect(validator(5)).toBe('Must be at least 10');
        });

        it('should return null when value meets minimum', () => {
            const validator = validators.minValue(10);
            expect(validator(10)).toBeNull();
            expect(validator(15)).toBeNull();
        });
    });
});

describe('composeValidators', () => {
    it('should run validators in order and return first error', () => {
        const validator = composeValidators(
            validators.required,
            validators.email
        );
        expect(validator('')).toBe('This field is required');
    });

    it('should return null if all validators pass', () => {
        const validator = composeValidators(
            validators.required,
            validators.email
        );
        expect(validator('test@example.com')).toBeNull();
    });
});

describe('validateField', () => {
    it('should validate field with multiple rules', () => {
        const rules = [validators.required, validators.email];
        expect(validateField('', rules)).toBe('This field is required');
        expect(validateField('invalid', rules)).toBe('Please enter a valid email address');
        expect(validateField('test@example.com', rules)).toBeNull();
    });
});

describe('validateForm', () => {
    it('should validate entire form and return errors', () => {
        const values = { email: '', name: 'John' };
        const rules = {
            email: [validators.required, validators.email],
            name: [validators.required],
        };
        const errors = validateForm(values, rules);
        expect(errors.email).toBe('This field is required');
        expect(errors.name).toBeUndefined();
    });
});

describe('hasErrors', () => {
    it('should return true if errors exist', () => {
        expect(hasErrors({ email: 'Invalid email' })).toBe(true);
    });

    it('should return false if no errors', () => {
        expect(hasErrors({})).toBe(false);
        expect(hasErrors({ email: undefined })).toBe(false);
    });
});

describe('formatCurrency', () => {
    it('should format number as currency', () => {
        expect(formatCurrency(100)).toBe('$100.00');
        expect(formatCurrency(100.5)).toBe('$100.50');
        expect(formatCurrency(1234.56, '€')).toBe('€1234.56');
    });
});

describe('formatDate', () => {
    it('should format date string', () => {
        const date = '2024-01-15';
        const result = formatDate(date);
        expect(result).toContain('2024');
    });
});
