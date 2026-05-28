interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
    width = '100%',
    height = '1rem',
    borderRadius,
    variant = 'text',
    animation = 'pulse',
}: SkeletonProps) {
    const getVariantStyles = (): React.CSSProperties => {
        switch (variant) {
            case 'circular':
                return {
                    width: typeof width === 'number' ? `${width}px` : width,
                    height: typeof width === 'number' ? `${width}px` : width, // Use width for both to make it circular
                    borderRadius: '50%',
                };
            case 'rectangular':
                return {
                    width: typeof width === 'number' ? `${width}px` : width,
                    height: typeof height === 'number' ? `${height}px` : height,
                    borderRadius: borderRadius || '0.5rem',
                };
            case 'text':
            default:
                return {
                    width: typeof width === 'number' ? `${width}px` : width,
                    height: typeof height === 'number' ? `${height}px` : height,
                    borderRadius: borderRadius || '0.25rem',
                };
        }
    };

    const getAnimationStyles = (): string => {
        switch (animation) {
            case 'pulse':
                return 'skeleton-pulse';
            case 'wave':
                return 'skeleton-wave';
            default:
                return '';
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes skeleton-pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    @keyframes skeleton-wave {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .skeleton-pulse {
                        animation: skeleton-pulse 1.5s ease-in-out infinite;
                    }
                    .skeleton-wave {
                        position: relative;
                        overflow: hidden;
                    }
                    .skeleton-wave::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                        animation: skeleton-wave 1.5s ease-in-out infinite;
                    }
                `}
            </style>
            <div
                className={getAnimationStyles()}
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    ...getVariantStyles(),
                }}
            />
        </>
    );
}

// Convenience components for common patterns
export function SkeletonText({ lines = 3, lastLineWidth = '60%' }: { lines?: number; lastLineWidth?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    width={i === lines - 1 ? lastLineWidth : '100%'}
                    height="1rem"
                />
            ))}
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.7)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Skeleton variant="circular" width={48} />
                <div style={{ flex: 1 }}>
                    <Skeleton width="60%" height="1.25rem" />
                    <div style={{ marginTop: '0.5rem' }}>
                        <Skeleton width="40%" height="0.875rem" />
                    </div>
                </div>
            </div>
            <SkeletonText lines={2} />
        </div>
    );
}
