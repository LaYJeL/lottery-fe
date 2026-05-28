import { useState, useCallback } from 'react';

export interface AsyncState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export interface UseAsyncReturn<T> extends AsyncState<T> {
    execute: (promise: Promise<T>) => Promise<T | null>;
    setData: (data: T | null) => void;
    reset: () => void;
}

export function useAsync<T>(initialData: T | null = null): UseAsyncReturn<T> {
    const [state, setState] = useState<AsyncState<T>>({
        data: initialData,
        isLoading: false,
        error: null,
    });

    const execute = useCallback(async (promise: Promise<T>): Promise<T | null> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const data = await promise;
            setState({ data, isLoading: false, error: null });
            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
            return null;
        }
    }, []);

    const setData = useCallback((data: T | null) => {
        setState(prev => ({ ...prev, data }));
    }, []);

    const reset = useCallback(() => {
        setState({ data: initialData, isLoading: false, error: null });
    }, [initialData]);

    return {
        ...state,
        execute,
        setData,
        reset,
    };
}
