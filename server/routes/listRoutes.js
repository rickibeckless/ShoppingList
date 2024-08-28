import express from 'express';
import { cList, rAList, rList, uList, dAList, dList } from '../controllers/listControllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/create", cList); // Create list
router.get("/:userId", rAList); // Read all lists
router.get("/:userId/:listId", rList); // Read one list
router.patch("/:userId/:listId/update", uList); // Update one list
router.delete("/delete-all", dAList); // Delete all lists
router.delete("/:userId/:listId/delete", dList); // Delete one list

export default router;