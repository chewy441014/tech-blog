const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
    const postId = document.querySelector('#postid').value.trim();
  
    if (title && text && postId) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title, text: text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post.');
      }
    }
  };
  
  document.querySelector('#editPost').addEventListener('submit', editPostHandler);