const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Home Route (GET)
app.get("/", (req, res) => {
    res.send("Welcome to Simple Blog Management System API");
});

// GET All Blogs Route
app.get("/blogs", (req, res) => {
    res.json({
        success: true,
        message: "Blogs fetched successfully",
        blogs: []
    });
});

// POST Add Blog Route
app.post("/add-blog", (req, res) => {
    const { title, author, content } = req.body;

    res.json({
        success: true,
        message: "Blog Added Successfully!",
        blog: {
            title,
            author,
            content
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});