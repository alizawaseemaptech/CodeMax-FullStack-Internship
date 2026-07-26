console.log("script.js loaded");

const form = document.getElementById("blogForm");

// Load Blogs on Home Page
async function loadBlogs() {
    const blogContainer = document.getElementById("blogContainer");

    if (!blogContainer) {
        console.log("blogContainer not found");
        return;
    }

    try {
        const response = await fetch("/blogs");
        const data = await response.json();

        console.log("API Response:", data);

        blogContainer.innerHTML = "";

        if (!data.blogs || data.blogs.length === 0) {
            blogContainer.innerHTML = "<h3>No blog posts available.</h3>";
            return;
        }

        data.blogs.forEach(blog => {
            const card = document.createElement("div");
            card.className = "blog-card";

            card.innerHTML = `
                <h2>${blog.title}</h2>
                <p><strong>Author:</strong> ${blog.author}</p>
                <p>${blog.content}</p>
            `;

            blogContainer.appendChild(card);
        });

    } catch (err) {
        console.error(err);
    }
}

// Add Blog
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const content = document.getElementById("content").value.trim();

        if (!title || !author || !content) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const response = await fetch("/add-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    author,
                    content
                })
            });

            const data = await response.json();

            alert(data.message);

            form.reset();

            window.location.href = "/";

        } catch (err) {
            console.error(err);
        }
    });
}

loadBlogs();