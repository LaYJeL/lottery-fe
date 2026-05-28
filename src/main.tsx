import ReactDOM from 'react-dom/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import App from './App';
import './index.css';
import './i18n';

// import ErrorBoundary from './components/ErrorBoundary';

const eventLogger = (_event: unknown, _error: unknown) => {
    // TODO: Send to error tracking service in production
};



ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'check-sso', checkLoginIframe: false }}
        onEvent={eventLogger}
    >
        <App />
    </ReactKeycloakProvider>
);