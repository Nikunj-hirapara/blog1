const mongoose = require('mongoose');


const schema = new mongoose.Schema({ id: mongoose.Schema.Types.ObjectId, name: mongoose.Schema.Types.String, description: mongoose.Schema.Types.String, slug: mongoose.Schema.Types.String });
const Blog = mongoose.model('blogs', schema);

module.export = Blog;
