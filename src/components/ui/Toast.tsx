import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { Toast as ToastType } from '../../hooks/useToast';

interface ToastContainerProps {
    toasts: ToastType[];
    onRemove: (id: string) => void;
}

const toastStyles = {
    success: {
        background: 'rgba(34, 197, 94, 0.15)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        iconColor: '#22c55e',
    },
    error: {
        background: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        iconColor: '#ef4444',
    },
    warning: {
        background: 'rgba(234, 179, 8, 0.15)',
        border: '1px solid rgba(234, 179, 8, 0.3)',
        iconColor: '#eab308',
    },
    info: {
        background: 'rgba(99, 102, 241, 0.15)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        iconColor: '#6366f1',
    },
};

const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '24rem',
            }}
        >
            {toasts.map(toast => {
                const style = toastStyles[toast.type];
                const Icon = icons[toast.type];

                return (
                    <div
                        key={toast.id}
                        role="alert"
                        aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            background: style.background,
                            border: style.border,
                            backdropFilter: 'blur(12px)',
                            color: 'white',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            animation: 'slideIn 0.3s ease-out',
                        }}
                    >
                        <Icon size={20} color={style.iconColor} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                        <span style={{ flex: 1, fontSize: '0.875rem', lineHeight: 1.5 }}>{toast.message}</span>
                        <button
                            onClick={() => onRemove(toast.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#94a3b8',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            aria-label="Dismiss notification"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
}
