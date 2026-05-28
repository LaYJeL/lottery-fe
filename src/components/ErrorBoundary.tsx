import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
        // TODO: Send to error tracking service (e.g., Sentry)
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    style={{
                        minHeight: '50vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '28rem',
                            width: '100%',
                            background: 'rgba(30, 41, 59, 0.7)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '1rem',
                            padding: '2rem',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        <div
                            style={{
                                width: '4rem',
                                height: '4rem',
                                background: 'rgba(239, 68, 68, 0.15)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }}
                        >
                            <AlertTriangle size={32} color="#ef4444" />
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                            Something went wrong
                        </h2>

                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            An unexpected error occurred. Please try refreshing the page or return to the homepage.
                        </p>

                        {this.state.error && (
                            <div
                                style={{
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    marginBottom: '1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.75rem',
                                    color: '#94a3b8',
                                    fontFamily: 'monospace',
                                    overflow: 'auto',
                                    maxHeight: '6rem',
                                }}
                            >
                                {this.state.error.message}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={this.handleReset}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem',
                                    background: '#6366f1',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                }}
                            >
                                <RefreshCw size={18} />
                                Try Again
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                }}
                            >
                                <Home size={18} />
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
