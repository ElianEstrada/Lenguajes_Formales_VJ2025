import { Router } from "express";
import { analyze, home } from "../controllers/analyze.controller";

const analyzeRouter = Router();

analyzeRouter.get('/', home);
analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;