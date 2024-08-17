import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useMemo } from "react";
import { Campaigns } from "~/api/Campaigns";

export default function useCampaignAPI() {
    const {initialized, keycloak} = useKeycloak()

    const api = useMemo(() => new Campaigns({
        securityWorker: (token) => ({headers: { 'Authorization': "Bearer " + keycloak.token}}),
        baseUrl: '/api'
    }),[keycloak.token])

    useEffect(() => {
        if (initialized) {
         api.setSecurityData(keycloak.token);
        }
    },[keycloak.token, initialized])

    return api
}