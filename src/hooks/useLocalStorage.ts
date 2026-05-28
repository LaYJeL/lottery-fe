import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    // Get initial value from localStorage or use provided initial value
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    // Update localStorage when value changes
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            // Handle localStorage errors (quota exceeded, etc.)
        }
    }, [key, storedValue]);

    // Setter function that handles both direct values and updater functions
    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        setStoredValue(prev => {
            const newValue = value instanceof Function ? value(prev) : value;
            return newValue;
        });
    }, []);

    // Remove item from localStorage
    const removeValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            // Handle errors
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
}
