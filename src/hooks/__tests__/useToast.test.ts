import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '../useToast';

describe('useToast', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should start with empty toasts array', () => {
        const { result } = renderHook(() => useToast());
        expect(result.current.toasts).toEqual([]);
    });

    it('should add a success toast', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.success('Success message');
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].message).toBe('Success message');
        expect(result.current.toasts[0].type).toBe('success');
    });

    it('should add an error toast', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.error('Error message');
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].message).toBe('Error message');
        expect(result.current.toasts[0].type).toBe('error');
    });

    it('should add a warning toast', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.warning('Warning message');
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].type).toBe('warning');
    });

    it('should add an info toast', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.info('Info message');
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].type).toBe('info');
    });

    it('should remove toast manually', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.success('Test message');
        });

        const toastId = result.current.toasts[0].id;

        act(() => {
            result.current.removeToast(toastId);
        });

        expect(result.current.toasts).toHaveLength(0);
    });

    it('should auto-remove toast after timeout', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.success('Test message');
        });

        expect(result.current.toasts).toHaveLength(1);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(result.current.toasts).toHaveLength(0);
    });

    it('should support multiple toasts', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.success('First');
            result.current.error('Second');
            result.current.info('Third');
        });

        expect(result.current.toasts).toHaveLength(3);
    });
});
