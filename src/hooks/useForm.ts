import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { validateForm, hasErrors } from '../utils/validation';
import type { FormRules, FormErrors } from '../utils/validation';

export interface UseFormOptions<T> {
    initialValues: T;
    rules?: FormRules<T>;
    onSubmit?: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
    values: T;
    errors: FormErrors<T>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    isValid: boolean;
    handleChange: (field: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleBlur: (field: keyof T) => () => void;
    setValue: (field: keyof T, value: T[keyof T]) => void;
    setValues: (values: Partial<T>) => void;
    setError: (field: keyof T, error: string | undefined) => void;
    validate: () => boolean;
    handleSubmit: (e?: React.FormEvent) => Promise<void>;
    reset: (values?: T) => void;
}

export function useForm<T extends Record<string, unknown>>({
    initialValues,
    rules = {},
    onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
    const [values, setValuesState] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = useCallback((): boolean => {
        const newErrors = validateForm(values, rules);
        setErrors(newErrors);
        return !hasErrors(newErrors);
    }, [values, rules]);

    const validateField = useCallback((field: keyof T) => {
        const fieldRules = rules[field];
        if (fieldRules) {
            const value = values[field];
            for (const rule of fieldRules) {
                const error = (rule as (v: typeof value) => string | null)(value);
                if (error) {
                    setErrors(prev => ({ ...prev, [field]: error }));
                    return;
                }
            }
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [values, rules]);

    const handleChange = useCallback((field: keyof T) => {
        return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const value = e.target.type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : e.target.value;
            setValuesState(prev => ({ ...prev, [field]: value }));
            // Clear error on change
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        };
    }, [errors]);

    const handleBlur = useCallback((field: keyof T) => {
        return () => {
            setTouched(prev => ({ ...prev, [field]: true }));
            validateField(field);
        };
    }, [validateField]);

    const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
        setValuesState(prev => ({ ...prev, [field]: value }));
    }, []);

    const setValues = useCallback((newValues: Partial<T>) => {
        setValuesState(prev => ({ ...prev, ...newValues }));
    }, []);

    const setError = useCallback((field: keyof T, error: string | undefined) => {
        setErrors(prev => ({ ...prev, [field]: error }));
    }, []);

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {} as Partial<Record<keyof T, boolean>>
        );
        setTouched(allTouched);

        const isValid = validate();
        if (!isValid || !onSubmit) return;

        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    }, [values, validate, onSubmit]);

    const reset = useCallback((newValues?: T) => {
        setValuesState(newValues ?? initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    const isValid = !hasErrors(errors);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        handleChange,
        handleBlur,
        setValue,
        setValues,
        setError,
        validate,
        handleSubmit,
        reset,
    };
}
