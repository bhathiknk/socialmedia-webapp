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
              <button class="post-comment" @click="commentPost(post)"><i class="fa fa-comment"></i> {{ post.comments.length }}</button>
            </div>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
            </div>
            <!-- Add input field for adding comments -->
            <div class="comment-form">
              <input type="text" v-model="newCommentContent" placeholder="Add a comment">
              <button @click="commentPost(post)">Add</button>
            </div>
            <!-- Display comments -->
            <div class="comments">
              <div class="comment" v-for="(comment, cIndex) in post.comments" :key="cIndex">
                <div class="comment-avatar"><img :src="comment.avatar" alt="avatar"></div>
                <div class="comment-content">
                  <p><strong>{{ comment.author }}</strong>: {{ comment.content }}</p>
                  <p class="comment-meta">Commented on {{ formatDate(comment.date) }}</p>
                </div>
              </div>
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
      newCommentContent: "", // Store the content of the new comment
      user: {
        name: "Ranindu",
        avatar: "Ranindu.jpg"
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
      // validate if comment content is not empty
      if (this.newCommentContent.trim() !== "") {
        // create a new comment object
        const newComment = {
          author: this.user.name,
          avatar: this.user.avatar,
          content: this.newCommentContent,
          date: new Date().toISOString()
        };
        // add the new comment to the post's comments array
        post.comments.push(newComment);
        // Clear the input field after commenting
        this.newCommentContent = "";
      } else {
        // alert the user if the comment is empty
        alert("Please enter your comment.");
      }
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
  margin-bottom: 20px;
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

.comment-form input[type="text"] {
  width: calc(100% - 60px); /* Adjusting input width */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
}

.comment-form button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #444;
}

.comments {
  margin-top: 10px;
}

.comment {
  display: flex;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-content p {
  margin: 5px 0;
}

.comment-meta {
  font-size: 12px;
  color: #666;
}

</style>
