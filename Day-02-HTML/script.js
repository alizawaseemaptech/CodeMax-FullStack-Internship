console.log("script.js loaded");

const form = document.getElementById("blogForm");

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

        if (data.blogs.length === 0) {
            blogContainer.innerHTML = "<h3>No Blogs Available</h3>";
            return;
        }

        data.blogs.forEach((blog) => {

            const card = document.createElement("div");
            card.className = "blog-card";

            card.innerHTML = `
                <h2>${blog.title}</h2>
                <p><strong>Author:</strong> ${blog.author}</p>
                <p>${blog.content}</p>

                <button onclick="editBlog(${blog.id})" class="edit-btn">
                    Edit
                </button>
            `;

            blogContainer.appendChild(card);

        });

    } catch (error) {
        console.log(error);
    }

}

// ==========================
// Edit Blog
// ==========================
async function editBlog(id) {

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

    const updateResponse = await fetch(`/update-blog/${id}`, {

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

    const result = await updateResponse.json();

    alert(result.message);

    loadBlogs();

}

// ==========================
// Add Blog
// ==========================
if (form) {

    form.addEventListener("submit", async function (e) {

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

        } catch (error) {

            console.log(error);

        }

    });

}

// ==========================
// Initial Load
// ==========================
loadBlogs();