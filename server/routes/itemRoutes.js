import express from 'express';
import { cItem, rAItem, uItem } from '../controllers/itemControllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/create", cItem); // Create item
router.get("/:userId/:listId", rAItem); // Read all items
router.put("/:itemId/update", uItem); // Update one item

export default router;