const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
  
    if (title && text) {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title: title, text: text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to post new post.');
      }
    }
  };
  
  document.querySelector('#newPost').addEventListener('submit', newPostHandler);