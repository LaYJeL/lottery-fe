import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';
import { Trophy, Ticket, ListChecks, Star, Shield, TrendingUp } from 'lucide-react';
import LanguageSwitcher from "../components/LanguageSwitcher";

const WelcomePage = () => {
    const { keycloak } = useKeycloak();
    const { t } = useTranslation();

    const containerStyle = {
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, #1e293b, #0f172a)',
        color: 'white',
        fontFamily: 'var(--font-main)',
        position: 'relative' as const
    };

    const heroSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        width: '100%'
    };

    const cardStyle = {
        background: 'rgba(30,41,59,0.7)',
        backdropFilter: 'blur(24px)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease'
    };

    const buttonStyle = {
        padding: '1rem 2rem',
        background: '#646cff',
        color: 'white',
        borderRadius: '0.75rem',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(100, 108, 255, 0.3)',
        transition: 'transform 0.1s'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '4rem'
    };

    const iconBoxStyle = {
        width: '3rem',
        height: '3rem',
        background: 'rgba(100, 108, 255, 0.2)',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        color: '#646cff'
    };

    return (
        <div style={containerStyle}>
            <LanguageSwitcher />

            {/* Hero Section */}
            <div style={heroSectionStyle}>
                <div style={{ maxWidth: '80rem', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '5rem',
                            height: '5rem',
                            background: '#646cff',
                            borderRadius: '1rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 10px 15px -3px rgba(100, 108, 255, 0.5)'
                        }}>
                            <Trophy style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
                        </div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                            {t('welcome.title')}
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '2rem', maxWidth: '42rem', marginInline: 'auto' }}>
                            {t('welcome.subtitle')}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => keycloak.login()} style={buttonStyle}>
                                {t('welcome.cta')}
                            </button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div style={gridStyle}>
                        <div style={cardStyle}>
                            <div style={iconBoxStyle}><Ticket /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('welcome.features.lottery.title')}</h3>
                            <p style={{ color: '#94a3b8' }}>{t('welcome.features.lottery.description')}</p>
                        </div>
                        <div style={cardStyle}>
                            <div style={iconBoxStyle}><Trophy /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('welcome.features.competitions.title')}</h3>
                            <p style={{ color: '#94a3b8' }}>{t('welcome.features.competitions.description')}</p>
                        </div>
                        <div style={cardStyle}>
                            <div style={iconBoxStyle}><ListChecks /></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('welcome.features.reputation.title')}</h3>
                            <p style={{ color: '#94a3b8' }}>{t('welcome.features.reputation.description')}</p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.875rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 'bold' }}>{t('welcome.whyChooseUs.title')}</h2>
                        <div style={gridStyle}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ ...iconBoxStyle, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', marginInline: 'auto', width: '4rem', height: '4rem' }}>
                                    <Shield style={{ width: '2rem', height: '2rem' }} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('welcome.whyChooseUs.secure.title')}</h3>
                                <p style={{ color: '#94a3b8' }}>{t('welcome.whyChooseUs.secure.description')}</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ ...iconBoxStyle, background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', marginInline: 'auto', width: '4rem', height: '4rem' }}>
                                    <Star style={{ width: '2rem', height: '2rem' }} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('welcome.whyChooseUs.reputationSystem.title')}</h3>
                                <p style={{ color: '#94a3b8' }}>{t('welcome.whyChooseUs.reputationSystem.description')}</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ ...iconBoxStyle, background: 'rgba(6, 182, 212, 0.2)', color: '#22d3ee', marginInline: 'auto', width: '4rem', height: '4rem' }}>
                                    <TrendingUp style={{ width: '2rem', height: '2rem' }} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{t('welcome.whyChooseUs.payments.title')}</h3>
                                <p style={{ color: '#94a3b8' }}>{t('welcome.whyChooseUs.payments.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
