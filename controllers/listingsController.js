import * as Listings from "../models/listingsModel.js";

export async function getAllListings(req, res, next) {
  try {
    const listings = await Listings.getAll();
    res.json(listings);
  } catch (err) {
    next(err);
  }
}

export async function getListingById(req, res, next) {
  try {
    const listing = await Listings.getById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    next(err);
  }
}

export async function createListing(req, res, next) {
  try {
    const data = { ...req.body, owner_id: req.user.id };
    const listing = await Listings.create(data);
    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
}

export async function updateListing(req, res, next) {
  try {
    const listing = await Listings.update(req.params.id, req.user.id, req.body);
    res.json(listing);
  } catch (err) {
    next(err);
  }
}

export async function deleteListing(req, res, next) {
  try {
    await Listings.remove(req.params.id, req.user.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
