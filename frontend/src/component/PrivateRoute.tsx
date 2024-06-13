import { useKeycloak } from "@react-keycloak/web";
import { PropsWithChildren } from "react";

const PrivateRoute = ({ children }: PropsWithChildren) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default PrivateRoute;