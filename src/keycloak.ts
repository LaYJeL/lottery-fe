import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
    realm: import.meta.env.VITE_KEYCLOAK_REALM || 'lottery',
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'lottery-frontend',
});

export default keycloak;