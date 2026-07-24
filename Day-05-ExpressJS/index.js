const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET Route
app.get("/", (req, res) => {
    res.send("Welcome to the Simple Blog API");
});

// POST Route
app.post("/add-blog", (req, res) => {

    const { title, author, content } = req.body;

    res.status(201).json({
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