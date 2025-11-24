import express from "express";
import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from "../controllers/listingsController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", getAllListings);
router.get("/:id", getListingById);
router.post("/", isAuthenticated, createListing);
router.put("/:id", isAuthenticated, updateListing);
router.delete("/:id", isAuthenticated, deleteListing);

export default router;
