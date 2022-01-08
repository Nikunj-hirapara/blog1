const express = require("express");
const cors = require("cors");
const multer = require("multer");
var slugify = require("slugify");

const Blog = require("./models/blog");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
// for parsing application/json
// app.use(bodyParser.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded

app.use(express.static("./server/uploads/"));

const storage = multer.diskStorage({
  destination: "./server/uploads/",
  filename: function (req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const mongoose = require("mongoose");
(async () => {
  await mongoose.connect(
    "mongodb+srv://admin123S:admin123S@cluster0.fnm20.mongodb.net/blog?retryWrites=true&w=majority"
  );
})();

app.get("/api/blog", async (req, res) => {
  res.json(await Blog.find());
});

app.get("/api/blog/:slug", async (req, res) => {
  res.json(await Blog.findOne({ slug: req.params.slug }));
});

app.post("/api/blog", upload.single("image"), async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    slug: slugify(req.body.title),
    image: req.file?.originalname,
  });
  try {
    await blog.save();
  } catch (err) {
    console.log(err);
  }
  res.json(blog.toJSON());
});

app.post("/api/blog/:id", upload.single("image"), async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.title = req.body.title;
  blog.slug = slugify(req.body.title);
  blog.description = req.body.description;
  if (req.file) {
    blog.image = req.file.originalname;
  }
  try {
    await blog.save();
  } catch (err) {
    console.log(err);
  }
  res.json(blog.toJSON());
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
