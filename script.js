
        const users = [];
        let currentUser = null;
        const posts = [];

        function signUp() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                users.push({ username, password });
                alert('User registered successfully!');
            } else {
                alert('Please enter a username and password.');
            }
        }

        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                currentUser = user;
                document.getElementById('auth-form').style.display = 'none';
                document.getElementById('blog-form').style.display = 'block';
                alert('Login successful!');
            } else {
                alert('Invalid credentials.');
            }
        }

        function createPost() {
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            if (title && content && currentUser) {
                const post = { title, content, author: currentUser.username, comments: [] };
                posts.push(post);
                renderPosts();
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
            } else {
                alert('Please fill out the title and content.');
            }
        }

        function renderPosts() {
            const blogPostsDiv = document.getElementById('blog-posts');
            blogPostsDiv.innerHTML = '<h2>Blog Posts</h2>';

            posts.forEach((post, index) => {
                const postDiv = document.createElement('div');
                postDiv.className = 'blog-post';
                postDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <small>Author: ${post.author}</small>
                    <button onclick="deletePost(${index})">Delete Post</button>
                    <button onclick="editPost(${index})">Edit Post</button>
                    <div class="comment-section">
                        <h3>Comments</h3>
                        <input type="text" id="comment-${index}" placeholder="Add a comment">
                        <button onclick="addComment(${index})">Add Comment</button>
                        <div id="comments-${index}">
                            ${post.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
                        </div>
                    </div>
                `;
                blogPostsDiv.appendChild(postDiv);
            });
        }

        function deletePost(index) {
            posts.splice(index, 1);
            renderPosts();
        }

        function editPost(index) {
            const post = posts[index];
            const newTitle = prompt('Edit Title:', post.title);
            const newContent = prompt('Edit Content:', post.content);

            if (newTitle !== null && newContent !== null) {
                posts[index].title = newTitle;
                posts[index].content = newContent;
                renderPosts();
            }
        }

        function addComment(postIndex) {
            const commentInput = document.getElementById(`comment-${postIndex}`);
            const comment = commentInput.value;

            if (comment) {
                posts[postIndex].comments.push(comment);
                renderPosts();
            }
        }
    