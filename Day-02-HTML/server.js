const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// ================= Middleware =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

console.log("✅ Server Started Successfully");

// ================= Blog Data =================
let blogs = [
  {
    id: 1,
    title: "Welcome to My Blog",
    author: "Aliza",
    content:
      "This is my first blog post created during the CodeMax Full Stack Development Internship."
  },
  {
    id: 2,
    title: "Learning Express.js",
    author: "Aliza",
    content:
      "Express.js makes backend development simple and powerful."
  }
];

// ================= Routes =================

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
    blogs
  });
});

// Add Blog
app.post("/add-blog", (req, res) => {

  const { title, author, content } = req.body;

  if (!title || !author || !content) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields."
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
    message: "Blog Added Successfully!",
    blog: newBlog
  });

});

// Update Blog
app.put("/update-blog/:id", (req, res) => {

  const id = Number(req.params.id);

  const blog = blogs.find(item => item.id === id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found."
    });
  }

  const { title, author, content } = req.body;

  blog.title = title;
  blog.author = author;
  blog.content = content;

  res.status(200).json({
    success: true,
    message: "Blog Updated Successfully!",
    blog
  });

});

// Delete Blog
app.delete("/delete-blog/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = blogs.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Blog not found."
    });
  }

  blogs.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully!"
  });

});

// Test Route
app.get("/test", (req, res) => {
  res.send("✅ Server Working Perfectly");
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});