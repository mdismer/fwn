import { Button, Container, Table, Title } from "@mantine/core";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import client from "~/server/client";


export default function Screen() {

    return (
        <Container>
           <Outlet />
        </Container>
    )
}
