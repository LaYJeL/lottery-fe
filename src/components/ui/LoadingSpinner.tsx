import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    text?: string;
    fullPage?: boolean;
}

export function LoadingSpinner({
    size = 24,
    color = '#9333ea',
    text,
    fullPage = false,
}: LoadingSpinnerProps) {
    const content = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
        }}>
            <Loader2
                size={size}
                color={color}
                className="animate-spin"
            />
            {text && (
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                    {text}
                </span>
            )}
        </div>
    );

    if (fullPage) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 50,
            }}>
                {content}
            </div>
        );
    }

    return content;
}
