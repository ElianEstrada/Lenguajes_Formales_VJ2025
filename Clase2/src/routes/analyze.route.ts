import { Router } from "express";
import { analyze, ping } from "../controllers/analyze.controller";

const analyzeRouter = Router();

analyzeRouter.get('/', ping);
analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;