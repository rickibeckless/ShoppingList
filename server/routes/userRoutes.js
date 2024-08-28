import express from 'express';
import { cUser, loginUser, rUser, rAUser, uUser, dAUser, dUser } from '../controllers/userControllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/signup", cUser); // Create user
router.post("/login", loginUser); // Login user
router.get("/:userId", rUser); // Read one user
router.get("/admin/users", rAUser); // Read all users
router.patch("/:userId/update", uUser); // Update one user
router.delete("/admin/users/delete", dAUser); // Delete all users
router.delete("/:userId/delete", dUser); // Delete one user

export default router;