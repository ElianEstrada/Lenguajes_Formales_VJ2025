import { Router } from "express"
import { analyze, home, pensum } from "../controllers/app.controller";

const router = Router();

router.get('/', home);
router.post('/analyze', analyze);
router.get('/pensum/:id', pensum);

export default router;