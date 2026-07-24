const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Simple Blog Management System API");
});

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});