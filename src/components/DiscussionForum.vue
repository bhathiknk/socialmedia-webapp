<template>
  <div class="container">
    <div class="header">
      <h1>discussion-forum</h1>
    </div>

    <div class="main">
      <div class="post-list">
        <div class="post" v-for="(post, index) in posts" :key="index">
          <div class="post-header">
            <div class="post-avatar"><img :src="post.avatar" alt="avatar"></div>
            <div class="post-info">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-meta">Posted by {{ post.author }} on {{ formatDate(post.date) }}</p>
            </div>
          </div>
          <div class="post-body">
            <p>{{ post.content }}</p>
          </div>
          <div class="post-footer">
            <div class="post-actions">
              <button class="post-like" @click="likePost(post)"><i class="fa fa-thumbs-up"></i> {{ post.likes }}</button>
              <button class="post-comment" @click="commentPost(post)"><i class="fa fa-comment"></i> {{ post.comments }}</button>
            </div>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="post-form">
        <h2>Create a new post</h2>
        <form @submit.prevent="submitPost">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="newPost.title" required>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" v-model="newPost.content" required></textarea>
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <input type="text" id="tags" v-model="newPost.tags" placeholder="Separate by commas">
          </div>
          <div class="form-group">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      newPost: {
        title: "",
        content: "",
        tags: ""
      },
      newCommentContent: "", // Add this line to store the content of the new comment
      user: {
        name: "Charlie",
        avatar: "charlie.jpg"
      }
    };
  },
  methods: {
    submitPost() {
      // validate the form inputs
      if (this.newPost.title && this.newPost.content) {
        // create a new post object
        const post = {
          id: this.posts.length + 1,
          title: this.newPost.title,
          content: this.newPost.content,
          author: this.user.name,
          avatar: this.user.avatar,
          date: new Date().toISOString(),
          likes: 0,
          comments: [],
          tags: this.newPost.tags.split(",")
        };
        // add the new post to the posts array
        this.posts.unshift(post);
        // reset the form inputs
        this.newPost.title = "";
        this.newPost.content = "";
        this.newPost.tags = "";
      } else {
        // alert the user to fill the required fields
        alert("Please enter the title and content of your post.");
      }
    },
    likePost(post) {
      // increment the likes of the post
      post.likes++;
    },
    commentPost(post) {
      // increment the comments of the post
      const newComment = {
        author: this.user.name,
        avatar: this.user.avatar,
        content: this.newCommentContent,
        date: new Date().toISOString()
      };
      post.comments.push(newComment);
      this.newCommentContent = ""; // Clear the input field after commenting
    },
    formatDate(date) {
      // format the date to a readable string
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    }
  },
  computed: {
    filteredPosts() {
      // get the query parameter from the URL
      const query = new URLSearchParams(window.location.search).get("q");
      // if there is a query, filter the posts by tags
      if (query) {
        return this.posts.filter(post => post.tags.includes(query));
      } else {
        // otherwise, return all the posts
        return this.posts;
      }
    }
  }
};
</script>

<style>
/* Reset default margin and padding */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #333;
  color: white;
  padding: 10px;
  border-bottom: 1px solid #222;
}

.nav {
  display: flex;
  list-style: none;
  float: right;
}

.nav li {
  margin: 0 10px;
}

.nav a {
  color: white;
  text-decoration: none;
}

.main {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
}

.post {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 5px;
  padding: 20px;
}

.post-header {
  display: flex;
  align-items: center;
}

.post-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.post-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-title {
  font-size: 20px;
  margin: 0;
}

.post-meta {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.post-body {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 10px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
}

.post-tags span {
  margin: 5px;
  padding: 5px 10px;
  background-color: #eee;
  border-radius: 5px;
  color: #333;
}

.post-actions button {
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  margin-right: 10px;
}

.post-actions button:hover {
  color: #666;
}

.post-form {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #999;
}

.form-group button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #444;
}

.footer {
  background-color: #333;
  color: white;
  padding: 10px;
  border-top: 1px solid #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer p {
  margin: 0;
}

.footer-links {
  display: flex;
  list-style: none;
}

.footer-links li {
  margin: 0 10px;
}

.footer-links a {
  color: white;
  text-decoration: none;
}

</style>
