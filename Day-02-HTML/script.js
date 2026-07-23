const form = document.getElementById("blogForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const content = document.getElementById("content").value.trim();

    document.getElementById("titleError").textContent = "";
    document.getElementById("authorError").textContent = "";
    document.getElementById("contentError").textContent = "";

    let isValid = true;

    // Title Validation
    if (title === "") {
        document.getElementById("titleError").textContent = "Blog title is required.";
        isValid = false;
    } else if (title.length < 3) {
        document.getElementById("titleError").textContent = "Title must be at least 3 characters.";
        isValid = false;
    }

    // Author Validation
    if (author === "") {
        document.getElementById("authorError").textContent = "Author name is required.";
        isValid = false;
    }

    // Content Validation
    if (content === "") {
        document.getElementById("contentError").textContent = "Blog content is required.";
        isValid = false;
    } else if (content.length < 20) {
        document.getElementById("contentError").textContent = "Content must be at least 20 characters.";
        isValid = false;
    }

    if (isValid) {
        alert("Blog Added Successfully!");

        form.reset();
    }

});