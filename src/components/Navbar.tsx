import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
    const { keycloak } = useKeycloak();

    const navStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(31, 27, 61, 0.6)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky' as const,
        top: 0,
        zIndex: 100
    };

    const linkStyle = {
        marginRight: '20px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'var(--color-primary)',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px'
    };

    const btnStyle = {
        padding: '8px 20px',
        borderRadius: '50px',
        fontWeight: 'bold',
        background: 'var(--color-primary)',
        color: '#000',
        boxShadow: 'var(--shadow-neon)',
        transition: '0.3s'
    };

    return (
        <nav style={navStyle}>
            <div style={{ marginRight: 'auto', fontSize: '1.5rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>LOTTERY</span>
                <span style={{ color: '#fff' }}>GAME</span>
            </div>

            <Link to="/" style={linkStyle}>Home</Link>
            {keycloak.authenticated && (
                <>
                    <Link to="/lotteries" style={linkStyle}>Lotteries</Link>
                    <Link to="/competitions" style={linkStyle}>Competitions</Link>
                    <Link to="/tasks" style={linkStyle}>Tasks</Link>
                    <Link to="/wallet" style={linkStyle}>Wallet</Link>

                    <Link to="/profile" style={linkStyle}>Profile</Link>
                </>
            )}

            {!keycloak.authenticated ? (
                <button style={btnStyle} onClick={() => keycloak.login()}>LOGIN</button>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <LanguageSwitcher style={{ position: 'relative', top: 'auto', right: 'auto', zIndex: 10 }} />
                    <button style={{ ...btnStyle, background: 'transparent', color: '#fff', border: '1px solid var(--color-primary)' }} onClick={() => keycloak.logout({ redirectUri: window.location.origin + '/login' })}>LOGOUT</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
