import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import keycloak from "./middleware/keycloak";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const errorHandler = (error: any, req: Request, res: Response, next: any) => {
  const status = error.status || 422;
  res.status(status).send(error.message);
}

app.use(errorHandler);
app.use(keycloak.middleware());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


