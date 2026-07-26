const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// JavaScript Array to Store Blogs
let blogs = [
    {
        id: 1,
        title: "Welcome to My Blog",
        author: "Aliza",
        content: "This is my first blog post created during the CodeMax Full Stack Internship."
    },
    {
        id: 2,
        title: "Learning Express.js",
        author: "Aliza",
        content: "Express.js makes it easy to build REST APIs and backend applications using Node.js."
    }
];

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Add Blog Page
app.get("/add-blog.html", (req, res) => {
    res.sendFile(path.join(__dirname, "add-blog.html"));
});

// Get All Blogs
app.get("/blogs", (req, res) => {
    res.status(200).json({
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

// 404 Page
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});