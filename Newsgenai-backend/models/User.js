const mongoose = require("mongoose");

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: { type: String, default: "" },
  joinedDate: String,
  avatarUrl: { type: String, default: "" },
  savedArticles: [String],
  readingHistory: [String],
  preferences: [String],
});

// Export model using the default connection
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
