import KeycloakConnect from "keycloak-connect";

const config: KeycloakConnect.KeycloakConfig = {
  realm: process.env.KEYCLOAK_REALM ?? "",
  "auth-server-url": `${process.env.KEYCLOAK_URL}`,
  "ssl-required": "external",
  resource: process.env.KEYCLOAK_CLIENT ?? "",
  "bearer-only": true,
  "confidential-port": 8080,
};

const keycloak = new KeycloakConnect({}, config);


export default keycloak

