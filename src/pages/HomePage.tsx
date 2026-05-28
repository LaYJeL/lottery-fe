import { useKeycloak } from '@react-keycloak/web';
import { Dices } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authenticatedFetch } from '../api/client';

const HomePage = () => {
    const { keycloak } = useKeycloak();
    const [dbStatus, setDbStatus] = useState("Checking system...");

    useEffect(() => {
        if (keycloak.authenticated) {
            authenticatedFetch('/api/v1/health')
                .then(res => res.text())
                .then(data => setDbStatus(data))
                .catch((error) => setDbStatus(`Error: ${error.message}`));
        } else {
            setDbStatus("PLEASE LOGIN TO PLAY");
        }
    }, [keycloak.authenticated]);

    const systemStatus = {
        status: dbStatus.includes('Error') ? "DOWN" : "UP",
        message: dbStatus
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 4rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div style={{ maxWidth: '56rem', width: '100%', textAlign: 'center' }}>
                {/* Main Heading */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                        <span style={{ color: '#eab308' }}>BIG WIN</span>{' '}
                        <span style={{ color: 'white' }}>LOTTERY</span>{' '}
                        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            <Dices size={48} color="#eab308" />
                        </span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
                        Test your luck and win big prizes today!
                    </p>
                </div>

                {/* System Status Box */}
                <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-block', width: '100%', maxWidth: '600px' }}>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>SYSTEM STATUS</div>
                        <div style={{
                            background: 'rgba(15,23,42,0.8)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            fontFamily: 'monospace',
                            textAlign: 'left'
                        }}>
                            <pre style={{
                                color: dbStatus.includes('Error') ? '#ef4444' : '#22c55e',
                                fontSize: '0.875rem',
                                whiteSpace: 'pre-wrap',
                                margin: 0
                            }}>
                                {JSON.stringify(systemStatus, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Welcome Message */}
                <div style={{ marginTop: '2rem' }}>
                    <p style={{ color: '#94a3b8' }}>
                        Welcome back, <span style={{ color: '#eab308' }}>{keycloak.tokenParsed?.preferred_username}</span>!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
