<template>


  <div class="circular-button-container">
    <CircularButton
        @click="navigateToAddFeed"
        to="/Feed"
        icon="fa fa-arrow-left"
        label="Back to Feed"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
    />
  </div>


  <div class="background">
    <div class="post-feed">
      <div class="container">
        <div class="post" v-for="post in myPosts" :key="post.id">
          <div class="post-header">
            <img :src="getProfileImageUrl(post.profileImage)" alt="User Profile Image" class="user-profile-image" />
            <h1 class="username">{{ post.username }}</h1>
            <button @click="deletePost(post.id)" class="delete-post-btn">Delete</button>
          </div>
          <img :src="getFullImageUrl(post.postImage)" alt="Post Image" class="post-image" />
          <div class="post-caption">{{ post.caption }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CircularButton from "@/components/CircularButton.vue";
import Swal from "sweetalert2";

export default {
  name: "MyPosts",
  components: {CircularButton},
  data() {
    return {
      myPosts: [],
      token: '',
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.fetchMyPosts();
    }
  },
  methods: {
    async fetchMyPosts() {
      try {
        const response = await axios.get("http://localhost:8080/posts/user/my-posts", {
          headers: {
            Authorization: this.token
          }
        });

        if (response.status === 200) {
          // Map the response data to include postId along with other post details
          this.myPosts = response.data.map(post => ({
            id: post.id,
            userId: post.userId,
            username: post.username,
            profileImage: post.profileImage,
            caption: post.caption,
            postImage: post.postImage
          }));

        }
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    },



    async deletePost(postId) {
      // Check if postId is null or undefined
      if (!postId) {
        console.error("Invalid postId:", postId);
        return;
      }

      try {
        const response = await axios.delete(`http://localhost:8080/posts/${postId}`, {
          headers: {
            Authorization: this.token
          }
        });

        if (response.status === 200) {
          // Remove the deleted post from the array
          this.myPosts = this.myPosts.filter(post => post.id !== postId);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Post deleted successfully',
          });
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },


    getFullImageUrl(imageName) {
      return imageName ? `http://localhost:8080/posts/postImages/${imageName}` : null;
    },
    getProfileImageUrl(fileName) {
      return `http://localhost:8080/image/profile-images/${fileName}?${new Date().getTime()}`;
    },
  },
};
</script>


<style scoped>
.background {
  background: radial-gradient(circle, rgba(158, 158, 158, 1) 0%, rgba(0, 0, 0, 1) 100%);
  min-height: 100vh;
}
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
.delete-post-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

</style>