import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import CompetitionDetailsPage from "./pages/CompetitionDetailsPage";
import LotteriesPage from "./pages/LotteriesPage";
import TasksPage from "./pages/TasksPage";
import WalletPage from "./pages/WalletPage";

import ProfilePage from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";
import MaintenancePage from "./pages/MaintenancePage";
import { maintenanceEvent } from "./utils/maintenanceEvent";
import { useState } from "react";



function App() {
    const { keycloak, initialized } = useKeycloak();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (initialized && keycloak.tokenParsed?.locale) {
            const kcLocale = keycloak.tokenParsed.locale;
            // Map 'uk' (standard) to 'ua' (our custom code) if needed, or just use as is
            const targetLang = kcLocale === 'uk' ? 'ua' : kcLocale;

            if (i18n.language !== targetLang) {
                i18n.changeLanguage(targetLang);
            }
        }
    }, [initialized, keycloak.tokenParsed, i18n]);

    const [isMaintenance, setIsMaintenance] = useState(false);

    useEffect(() => {
        const unsubscribe = maintenanceEvent.subscribe(() => {
            setIsMaintenance(true);
        });

        // Initial health check
        // We use a simple fetch to a known endpoint to check connectivity
        // Using a non-authenticated endpoint if possible, or just checking if server is reachable
        const checkHealth = async () => {
            try {
                // If we are authenticated, we can rely on other components to fetch
                // But if we are NOT authenticated (Welcome Page), no fetches happen.
                // So we force a check here.
                // const BASE_URL = 'http://localhost:6969'; // Invalid port to ensure failure
                const BASE_URL = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${BASE_URL}/api/v1/health`);
                // Ensure we hit the API, not the frontend serving HTML (SPA fallback)
                const contentType = response.headers.get("content-type");

                // Triggers maintenance only if:
                // 1. Status is 503 (Service Unavailable)
                // 2. Status is 500, 502, 504 (Proxy errors when Backend is down or critical failure)
                // 3. We received HTML (which means we hit the frontend fallback, so BE is likely unreachable at this URL)
                if ([500, 502, 503, 504].includes(response.status) || (contentType && contentType.includes("text/html"))) {
                    maintenanceEvent.trigger();
                    return;
                }
            } catch (e) {
                // Determine if it's a network error
                if (e instanceof TypeError && e.message === "Failed to fetch") {
                    maintenanceEvent.trigger();
                }
            }
        };

        checkHealth();

        return () => {
            unsubscribe();
        };
    }, []);

    if (isMaintenance) {
        return <MaintenancePage />;
    }

    if (!initialized) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            <div>
                {keycloak.authenticated && <Navbar />}
                <Routes>
                    <Route path="/" element={keycloak.authenticated ? <ErrorBoundary><DashboardPage /></ErrorBoundary> : <WelcomePage />} />
                    <Route path="/status" element={keycloak.authenticated ? <ErrorBoundary><HomePage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/lotteries" element={keycloak.authenticated ? <ErrorBoundary><LotteriesPage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/competitions" element={keycloak.authenticated ? <ErrorBoundary><CompetitionsPage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/competitions/:id" element={keycloak.authenticated ? <ErrorBoundary><CompetitionDetailsPage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/tasks" element={keycloak.authenticated ? <ErrorBoundary><TasksPage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/wallet" element={keycloak.authenticated ? <ErrorBoundary><WalletPage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/profile" element={keycloak.authenticated ? <ErrorBoundary><ProfilePage /></ErrorBoundary> : <Navigate to="/" />} />
                    <Route path="/login" element={<LoginRedirect />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

const LoginRedirect = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    useEffect(() => {
        if (!initialized) return;

        if (keycloak.authenticated) {
            navigate('/');
        } else {
            keycloak.login();
        }
    }, [initialized, keycloak, navigate]);

    return <div>Redirecting to login...</div>;
};

export default App;