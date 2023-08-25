const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;
let isLoading = false;
//fetch posts from api
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}
//show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  //console.log(posts);
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>

            </div>
    `;
    postContainer.appendChild(postEl);
  });
}
//show loader and fetch more posts
function showLoading() {
  if (isLoading) return;

  page++;
  isLoading = true;
  loading.classList.add("show");

  setTimeout(() => {
    showPosts();
    loading.classList.remove("show");
    isLoading = false;
  }, 500);
}
//filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      //if its bigger than -1 there is a matching letters
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});
filter.addEventListener("input", filterPosts);

showPosts();
