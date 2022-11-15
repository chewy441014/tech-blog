const commentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#text').value.trim();
    const postId = document.querySelector('#postid').value.trim();
    if (text) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text: text, postId: postId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment.');
        }
    }
};

document.querySelector('#createComment').addEventListener('submit', commentHandler);
