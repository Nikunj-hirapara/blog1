const express = require("express");
const Blog = require('./models/blog')

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require('mongoose');
(async () => {
await mongoose.connect('mongodb+srv://admin123S:admin123S@cluster0.fnm20.mongodb.net/blog?retryWrites=true&w=majority'); 
})();


const products = [
    {
        "id": "1",
        "title": "A Book",
        "description" : "This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!This is sample description of the book!",
        "image":"https://pngimg.com/uploads/book/book_PNG2111.png"
    },
    {
        "id": "2",
        "title": "A Pen",
        "description" : "This is sample description of the Pen!",
        "image":"data:image/jpeg;base64,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"
    },
]
app.get("/api", async (req, res) => {
  res.json(await Blog.find());
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});