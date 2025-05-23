// models/News.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  url: String,
  content: String,
  source: String,
  published_at: Date,
  processed: Boolean,
  category: String,
}, { collection: "news_articles" }); // Explicitly bind to the correct collection

module.exports = mongoose.model("News", newsSchema);
