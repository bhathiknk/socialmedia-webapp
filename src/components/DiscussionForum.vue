<template>
  <div class="goalSettings">
    <h1>discussion-forum</h1>

    <main>
      <!-- Form to submit a new post -->
      <form id="postForm" @submit.prevent="submitPost">
        <label for="postTitle">Title:</label><br>
        <input type="text" id="postTitle" v-model="newPostTitle" required><br>
        <label for="postContent">Content:</label><br>
        <textarea id="postContent" v-model="newPostContent" rows="4" required></textarea><br>
        <button type="submit">Post</button>
      </form>

      <!-- Display all posts -->
      <div id="posts">
        <!-- Posts will be dynamically added here -->
        <div v-for="(post, index) in posts" :key="index" class="post">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>

          <!-- Form to submit a new comment -->
          <form @submit.prevent="submitComment(index)">
            <label for="commentContent">Your Comment:</label><br>
            <textarea v-model="newCommentContent[index]" rows="2"></textarea><br>
            <button type="submit">Comment</button>
          </form>

          <!-- Display comments for this post -->
          <div v-if="post.comments.length > 0">
            <h3>Comments:</h3>
            <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="comment">
              <p>{{ comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>&copy; 2024 Discussion Forum</p>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const posts = ref([]);
    const newPostTitle = ref('');
    const newPostContent = ref('');
    const newCommentContent = ref([]);

    const submitPost = () => {
      if (newPostTitle.value.trim() !== '' && newPostContent.value.trim() !== '') {
        const newPost = {
          title: newPostTitle.value,
          content: newPostContent.value,
          comments: []
        };
        posts.value.push(newPost);
        newPostTitle.value = '';
        newPostContent.value = '';
        newCommentContent.value.push('');
      } else {
        alert('Please enter both title and content for the post.');
      }
    };

    const submitComment = (postIndex) => {
      const content = newCommentContent.value[postIndex].trim();
      if (content !== '') {
        posts.value[postIndex].comments.push(content);
        newCommentContent.value[postIndex] = '';
      } else {
        alert('Please enter a comment.');
      }
    };

    return {
      posts,
      newPostTitle,
      newPostContent,
      newCommentContent,
      submitPost,
      submitComment
    };
  }
}
</script>

<style>
/* Reset default margin and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Basic styling */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

main {
  padding: 1rem;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* Form styling */
form {
  margin-bottom: 1rem;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

button[type="submit"] {
  background-color: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #555;
}

/* Post styling */
.post {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}

.post h2 {
  margin-bottom: 0.5rem;
}

.post p {
  margin-bottom: 0.5rem;
}

/* Comment styling */
.comment {
  border: 1px solid #ddd;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
</style>
