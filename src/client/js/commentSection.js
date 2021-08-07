const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete-btns");

const handleDelete = async (event) => {
    const {
        parentNode: li,
        parentNode: { parentNode: ul },
        parentNode: { dataset: { id } }
    } = event.target;
    const response = await fetch(`/api/comments/${id}/delete`, {
        method: "DELETE",
    })
    if (response.status === 200) {
        ul.removeChild(li);
    }
}

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    span2.addEventListener("click", handleDelete);
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }),
    });
    textarea.value = "";
    if (response.status === 201) {
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit)
}

// Delete Btn Event 

if (deleteBtns.length !== 0) {
    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener("click", handleDelete));
}