import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface LanguageSwitcherProps {
    style?: React.CSSProperties;
}

const LanguageSwitcher = ({ style }: LanguageSwitcherProps) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const currentLang = i18n.language; // 'en', 'de', 'uk' (mapped to ru for demo if needed, but Keycloak uses uk/en)

    // Mapping based on Keycloak template logic
    const getFlag = (code: string) => {
        if (code === 'ua' || code.startsWith('uk') || code.startsWith('ru')) return '🇺🇦 UA';
        return '🇺🇸 EN';
    };

    const defaultStyle: React.CSSProperties = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000
    };

    const pickerStyle = { ...defaultStyle, ...style };

    const dropdownStyle = {
        position: 'relative' as 'relative',
        display: 'inline-block'
    };

    const btnStyle = {
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        color: 'white',
        padding: '8px 16px',
        fontSize: '14px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: '0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    };

    const contentStyle = {
        display: isOpen ? 'block' : 'none',
        position: 'absolute' as 'absolute',
        right: 0,
        backgroundColor: '#1e293b',
        minWidth: '160px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1,
        overflow: 'hidden',
        marginTop: '4px'
    };

    const itemStyle = {
        color: '#f8fafc',
        padding: '10px 16px',
        textDecoration: 'none',
        display: 'block',
        fontSize: '14px',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        width: '100%',
        textAlign: 'left' as 'left'
    };

    return (
        <div style={pickerStyle} className="language-picker">
            <div
                style={dropdownStyle}
                className="dropdown"
            >
                <button
                    style={btnStyle}
                    className="dropbtn"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {getFlag(currentLang)}
                </button>
                <div style={contentStyle} className="dropdown-content">
                    <button
                        style={{ ...itemStyle, background: currentLang.startsWith('en') ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                        onClick={() => changeLanguage('en')}
                    >
                        🇺🇸 EN (English)
                    </button>
                    <button
                        style={{ ...itemStyle, background: (currentLang === 'ua' || currentLang.startsWith('uk')) ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                        onClick={() => changeLanguage('ua')}
                    >
                        🇺🇦 UA (Українська)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
