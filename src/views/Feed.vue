<template>


    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/AddFeed"
          icon="fa fa-plus"
          label="Add Feed"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>

  <div class="post-feed" >
  <div class="post-feed">
    <div class="container">
      <div class="post" v-for="post in posts" :key="post.userId">
        <div class="post-header">
          <img :src="post.userAvatar" alt="User Avatar" class="user-avatar" />
          <span class="username">{{ post.username }}</span>
        </div>
        <img :src="getFullImageUrl(post.postImage)" alt="Post Image" class="post-image" />
        <div class="post-actions">
          <button @click="likePost(post.id)">
            <i class="fa fa-heart"></i> {{ post.likes }}
          </button>
          <button @click="commentPost(post.id)">
            <i class="fa fa-comment"></i> {{ post.comments }}
          </button>
        </div>
        <div class="post-caption">{{ post.caption }}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import CircularButton from "@/components/CircularButton.vue";
import axios from "axios";

export default {
  name: "PostFeed",
  components: {CircularButton},
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    // Fetch posts from the backend when the component is mounted
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      // Make a GET request to the backend API endpoint to fetch posts
      axios
          .get("http://localhost:8080/connection/friends-posts", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.posts = response.data;
            // Log the received data
            console.log("Received Data:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
    },
    getFullImageUrl(fileName) {
      return `http://localhost:8080/connection/post-images/${fileName}`;
    }


  },
};
</script>

<style scoped>

.circular-button-container {

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: #fff; /* Add your desired background color */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);/* Move the circular button to the right */
}
.post-feed {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f2f2f2;
}

.container {
  max-width: 600px;

}

.post {
  margin: 20px 0;
  border: 3px solid lightslategrey;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.post-header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: 500;
  color: #030202;
}

.post-image {
  width: 100%;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.post-actions button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
}

.post-caption {
  padding: 10px;
}

</style>