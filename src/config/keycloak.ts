import Keycloak from "keycloak-js";


// const keycloak_realm: any = process.env.REACT_APP_KEYCLOAK_REALM;
// const keycloak_clientId: any = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;

const keycloak: any = new Keycloak({
  url: "keycloak_url",
  realm: "keycloak_realm",
  clientId: "keycloak_clientId",
});

export default keycloak;
