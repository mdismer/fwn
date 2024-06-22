import "@mantine/core/styles.css";
import {MantineColorsTuple, MantineProvider, createTheme} from "@mantine/core";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import GraphqlProvider from "./GraphqlProvider.tsx";

const myColor: MantineColorsTuple = [
    '#f6eeff',
    '#e7daf7',
    '#cab1ea',
    '#ad86dd',
    '#9562d2',
    '#854bcb',
    '#7d3ec9',
    '#6b31b2',
    '#5f2aa0',
    '#52228d'
];

const theme = createTheme({
    colors: {
        myColor,
    }
});

function App() {

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <GraphqlProvider>
                <MantineProvider theme={theme}>
                    <RouterProvider router={router}/>
                </MantineProvider>
            </GraphqlProvider>
        </ReactKeycloakProvider>
    );
}

export default App;
