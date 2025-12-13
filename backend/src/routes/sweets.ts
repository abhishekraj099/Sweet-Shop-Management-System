import { Router } from "express";
import { Sweet } from "../models/Sweet";
import { authMiddleware, requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/sweets  (admin) - add new sweet
router.post("/", authMiddleware, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();

    return res.status(201).json(sweet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/sweets  - list all sweets
router.get("/", authMiddleware, async (_req, res) => {
  try {
    const sweets = await Sweet.find();
    return res.json(sweets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/sweets/search?name=&category=&minPrice=&maxPrice=
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter: any = {};

    if (name) {
      filter.name = { $regex: String(name), $options: "i" };
    }

    if (category) {
      filter.category = String(category);
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    return res.json(sweets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/sweets/:id  (admin) - update sweet
router.put("/:id", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    return res.json(sweet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/sweets/:id  (admin) - delete sweet
router.delete("/:id", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    return res.json({ message: "Sweet deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/sweets/:id/purchase  - decrease quantity
router.post("/:id/purchase", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity || 1);

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    sweet.quantity -= qty;
    await sweet.save();

    return res.json(sweet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/sweets/:id/restock  (admin) - increase quantity
router.post("/:id/restock", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity || 1);

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += qty;
    await sweet.save();

    return res.json(sweet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
