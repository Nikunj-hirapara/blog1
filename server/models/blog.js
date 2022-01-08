const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
  slug: mongoose.Schema.Types.String,
  image: mongoose.Schema.Types.String,
});
const Blog = mongoose.model("blogs", schema);

module.exports = Blog;
