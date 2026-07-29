"use strict";

// ==========================
// Elements
// ==========================

const form = document.getElementById("blogForm");
const message = document.getElementById("message");

// ==========================
// Load Blogs
// ==========================

async function loadBlogs() {

    const blogContainer = document.getElementById("blogContainer");

    if (!blogContainer) return;

    try {

        const response = await fetch("/blogs");
        const data = await response.json();

        blogContainer.innerHTML = "";

        if (!data.success || data.blogs.length === 0) {

            blogContainer.innerHTML =
                "<h3 class='fade-in'>No Blogs Available</h3>";

            return;
        }

        data.blogs.forEach((blog, index) => {

            const card = document.createElement("div");

            card.className = "blog-card fade-in";
            card.style.animationDelay = `${index * 0.15}s`;

            card.innerHTML = `
                <h2>${blog.title}</h2>

                <p>
                    <strong>Author:</strong> ${blog.author}
                </p>

                <p>${blog.content}</p>

                <button
                    class="edit-btn"
                    title="Edit Blog"
                    onclick="editBlog(${blog.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    title="Delete Blog"
                    onclick="deleteBlog(${blog.id})">
                    Delete
                </button>
            `;

            blogContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Load Error:", error);

    }

}

// ==========================
// Add Blog
// ==========================

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const content = document.getElementById("content").value.trim();

        document.getElementById("titleError").textContent = "";
        document.getElementById("authorError").textContent = "";
        document.getElementById("contentError").textContent = "";

        let valid = true;

        if (!title) {
            document.getElementById("titleError").textContent = "Title is required";
            valid = false;
        }

        if (!author) {
            document.getElementById("authorError").textContent = "Author is required";
            valid = false;
        }

        if (!content) {
            document.getElementById("contentError").textContent = "Content is required";
            valid = false;
        }

        if (!valid) return;

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

            if (data.success) {

                if (message) {
                    message.style.color = "green";
                    message.textContent = data.message;
                }

                alert(data.message);

                form.reset();

                setTimeout(() => {
                    window.location.href = "/";
                }, 800);

            } else {

                if (message) {
                    message.style.color = "red";
                    message.textContent = data.message;
                }

            }

        } catch (error) {

            console.error("Add Blog Error:", error);

            if (message) {
                message.style.color = "red";
                message.textContent = "Server Error!";
            }

        }

    });

}

// ==========================
// Edit Blog
// ==========================

async function editBlog(id) {

    try {

        const response = await fetch("/blogs");
        const data = await response.json();

        const blog = data.blogs.find(b => b.id === id);

        if (!blog) return;

        const title = prompt("Edit Title", blog.title);
        if (title === null) return;

        const author = prompt("Edit Author", blog.author);
        if (author === null) return;

        const content = prompt("Edit Content", blog.content);
        if (content === null) return;

        const update = await fetch(`/update-blog/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                author,
                content
            })

        });

        const result = await update.json();

        alert(result.message);

        loadBlogs();

    } catch (error) {

        console.error("Update Error:", error);

    }

}

// ==========================
// Delete Blog
// ==========================

async function deleteBlog(id) {

    if (!confirm("Delete this blog?")) return;

    try {

        const response = await fetch(`/delete-blog/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadBlogs();

    } catch (error) {

        console.error("Delete Error:", error);

    }

}

// ==========================
// Initial Load
// ==========================

loadBlogs();