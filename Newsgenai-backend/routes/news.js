// routes/news.js
module.exports = (newsConnection) => {
  const express = require("express");
  const router = express.Router();

  // Define News model on the passed connection
  const NewsSchema = new newsConnection.Schema({
    title: String,
    url: String,
    content: String,
    source: String,
    published_at: Date,
    processed: Boolean,
    category: String,
  }, { collection: "news_articles" });

  const News = newsConnection.model("News", NewsSchema);

  router.get("/", async (req, res) => {
    try {
      const newsList = await News.find({}).sort({ published_at: -1 });
      res.status(200).json(newsList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  return router;
};
