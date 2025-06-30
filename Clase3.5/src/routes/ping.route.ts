import { Router } from "express";
import { errLex, ping } from "../controller/ping.controller";

const pingRouter = Router();

pingRouter.get('/', ping);
pingRouter.get('/errors', errLex);

export default pingRouter;