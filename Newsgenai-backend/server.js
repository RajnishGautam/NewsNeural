const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const News = require("./models/News"); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:8080", // React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/newsgenai", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// ✅ Route: Get latest 10 news articles
app.get("/api/news", async (req, res) => {
  try {
    const latestNews = await News.find().sort({ published_at: -1 }).limit(10);
    res.json(latestNews);
  } catch (error) {
    console.error("❌ Error fetching latest news:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route: Get all news
app.get("/api/news/all", async (req, res) => {
  try {
    const allNews = await News.find().sort({ published_at: -1 });
    res.json(allNews);
  } catch (error) {
    console.error("❌ Error fetching all news:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route: Get news by category
app.get("/api/news/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const newsByCategory = await News.find({
      category: category.toLowerCase(),
    }).sort({ published_at: -1 });
    res.json(newsByCategory);
  } catch (error) {
    console.error("❌ Error fetching category news:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("NewsGenAI backend is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
