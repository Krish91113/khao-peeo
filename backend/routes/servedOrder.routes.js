import express from "express";
import { getServedOrders, getServedOrderById, getServedOrderBill } from "../controllers/servedOrder.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

// All routes require authentication and admin/owner role
router.get("/", protect, requireRole("owner", "admin", "superadmin"), getServedOrders);
router.get("/:id", protect, requireRole("owner", "admin", "superadmin"), getServedOrderById);
router.get("/:id/bill", protect, requireRole("owner", "admin", "superadmin"), getServedOrderBill);

export default router;
