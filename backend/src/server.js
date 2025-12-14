import express from "express";
import cors from "cors";
import { SweetService } from "./services/sweetService.js";
import authRoutes from './routes/authRoutes.js';
import { protect, admin } from './middleware/authMiddleware.js';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174","https://YOUR_FRONTEND_URL.vercel.app"] }));
app.use(express.json());

const sweetService = new SweetService();

// --- Routes ---

// Authentication routes (public)
app.use('/api/auth', authRoutes);

// --- Public Sweet Routes ---

// Get all sweets
app.get("/api/sweets", async (req, res) => {
  try {
    const sweets = await sweetService.getAllSweets();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
});

// Get a single sweet by ID
app.get("/api/sweets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sweet = await sweetService.getSweetById(id);
    if (sweet) {
      res.json(sweet);
    } else {
      res.status(404).json({ error: "Sweet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sweet" });
  }
});

// Search for sweets
app.get("/api/sweets/search", async (req, res) => {
    try {
        const results = await sweetService.searchSweets(req.query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to search for sweets" });
    }
});


// --- Protected Sweet & Inventory Routes ---

// Create a new sweet
app.post("/api/sweets", protect, async (req, res) => {
  try {
    const sweet = await sweetService.addSweet(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ error: "Failed to create sweet: " + error.message });
  }
});

// Update a sweet
app.put("/api/sweets/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedSweet = await sweetService.updateSweet(id, req.body);
    if (updatedSweet) {
      res.json(updatedSweet);
    } else {
      res.status(404).json({ error: "Sweet not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update sweet: " + error.message });
  }
});

// Delete a sweet
app.delete("/api/sweets/:id", [protect, admin], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await sweetService.deleteSweet(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Sweet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sweet" });
  }
});

// Purchase a sweet
app.post("/api/sweets/:id/purchase", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }
    const sweet = await sweetService.purchaseSweet(id, quantity);
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Restock a sweet
app.post("/api/sweets/:id/restock", [protect, admin], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }
    const sweet = await sweetService.restockSweet(id, quantity);
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ error: "Failed to restock: " + error.message });
  }
});


// --- Server Listener ---

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
