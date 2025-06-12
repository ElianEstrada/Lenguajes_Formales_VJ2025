import { Router } from "express";
import { hello } from "../controllers/application.controller";

const appRouter = Router();

appRouter.get('/', hello);

export default appRouter;