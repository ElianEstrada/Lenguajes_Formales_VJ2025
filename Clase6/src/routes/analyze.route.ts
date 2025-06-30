import { Router } from "express";
import { analyze } from "../controllers/analyze.controller";

const analyzeRouter = Router();

analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;