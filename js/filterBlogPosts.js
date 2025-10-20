function filterBlogPosts() {
  const input = document.getElementById('blog-search');
  const filter = input.value.toLowerCase();
  const posts = document.querySelectorAll('.blog-posts .card');
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    if (text.includes(filter)) {
      post.style.display = '';
    } else {
      post.style.display = 'none';
    }
  });
}
