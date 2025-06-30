import { Router } from "express";
import { analyze } from "../controller/analyzer.controller";

const analyzeRouter = Router();

analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;