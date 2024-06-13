import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8080",
 realm: "fwn",
 clientId: "fwn-web",
});

export default keycloak;