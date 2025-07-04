document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  const searchInput = document.getElementById("search");
  const scrollBtn = document.getElementById("scrollTop");

  function renderPosts(posts) {
    blogContainer.innerHTML = "";
    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "blog-post";
      div.innerHTML = `<h2>${post.title}</h2><img src="${post.image}" loading="lazy"><p>${post.content}</p>`;
      blogContainer.appendChild(div);
    });
  }

  if (blogContainer) {
    const defaultPosts = [
      { title: "Post 1", content: "This is the first blog post.", image: "images/post1.jpg" },
      { title: "Post 2", content: "Another interesting article.", image: "images/post2.jpg" },
      { title: "Tips for Web Dev", content: "Use lazy loading and minified assets!", image: "images/post1.jpg" },
      { title: "Responsive Design", content: "Make it mobile-first.", image: "images/post2.jpg" }
    ];
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const allPosts = [...storedPosts, ...defaultPosts];
    renderPosts(allPosts);

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = allPosts.filter(p => p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query));
        renderPosts(filtered);
      });
    }
  }

  // Scroll to top
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
  }

  // Dark mode toggle
  const toggle = document.getElementById("darkToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
    }
  }
});
