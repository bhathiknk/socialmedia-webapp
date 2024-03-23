<template>


    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/AddFeed"
          icon="fa fa-plus"
          label="Add Feed"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />

      <CircularButton
          @click="navigateToAddFeed"
          to="/ProfileEdit"
          icon="fa fa-user"
          label="Go To Profile"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
      <CircularButton
          @click="navigateToAddFeed"
          to="/MyPost"
          icon="fa-regular fa-image"
          label="Go To My Posts"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>


  <div class="post-feed">
    <div v-if="posts.length === 0">
      <p>No Post from friends</p>
    </div>
    <div v-else>
    <div class="container">
      <div class="post" v-for="post in posts" :key="post.userId">
        <div class="post-header">
          <img :src="getProfileImageUrl(post.profileImage)" alt="User Profile Image" class="user-profile-image" />

          <h1 class="username">{{ post.username }}</h1>
        </div>
        <img :src="getFullImageUrl(post.postImage)" alt="Post Image" class="post-image" />
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
  components: { CircularButton },
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
    async fetchPosts() {
      const userToken = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:8080/posts/friends-posts", {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        });

        if (response.status === 200) {
          this.posts = [...response.data];
          // Log the received data
          console.log("Received Data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    getFullImageUrl(imageName) {
      return imageName ? `http://localhost:8080/posts/postImages/${imageName}?random=${Math.random()}` : null;
    },

    getProfileImageUrl(fileName) {
      return `http://localhost:8080/image/profile-images/${fileName}?${new Date().getTime()}`;
    },
  },
};
</script>


<style scoped>
.user-profile-image {
  width: 70px; /* Adjust the width and height as needed */
  height: 70px;
  border-radius: 50%;
  object-fit: cover; /* Ensures the image covers the entire container */
  margin-right: 10px; /* Adjust margin as needed */
}
.circular-button-container {

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: #000000; /* Add your desired background color */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);/* Move the circular button to the right */
}
.post-feed {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  height: 100%;
  min-height: 100vh;
}

.container {
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 0 100px rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid;

}
.container h1{
  color: white;
  font-size: 25px;
}

.post {
  margin: 20px 0;
  border: 3px solid #040609;
  border-radius: 10px;
  box-shadow: 0 0 100px rgb(0, 0, 0);

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