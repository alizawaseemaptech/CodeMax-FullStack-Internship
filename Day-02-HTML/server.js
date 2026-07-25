const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// JavaScript Array to Store Blogs
let blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Blog Management API");
});

// Get All Blogs
app.get("/blogs", (req, res) => {
    res.json({
        success: true,
        blogs: blogs
    });
});

// Add Blog
app.post("/add-blog", (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        author,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        success: true,
        message: "Blog added successfully",
        blog: newBlog
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});