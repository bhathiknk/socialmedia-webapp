<template>
  <div class="profile-edit">

    <!-- circular buttons -->

    <div class="container-1 fixed-left">
      <!-- Circular buttons for navigation -->
      <div class="circular-button-container">
        <CircularButton
            @click="navigateToSignUp"
            to="/SignUp"
            v-if="!token"
            icon="fa fa-arrow-right"
            label="LogIn"
            style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
        />
      </div>
      <div class="circular-button-container">
        <CircularButton
            @click="navigateToUserDetailEdit"
            to="/UserDetailEdit"
            v-if="token"
            icon="fa fa-gear"
            label="Settings"
            style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
        />
      </div>
      <div class="circular-button-container">
        <CircularButton
            @click="signout"
            to="/ProfileEdit"
            v-if="token"
            icon="fa fa-sign-out"
            label="Signout"
            style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
        />
      </div>
    </div>

    <!-- container for profile picture, bio message, username, and email -->
    <div class="container">
    <div class="profile-info-container fixed-middle">
      <div class="profile-info">
        <div class="profile-picture-container">
          <!-- Profile picture with responsive classes -->
          <img :src="profilePicture" alt="Profile Picture" class="img-fluid rounded-circle">
        </div>
        <h3>{{ userName }}</h3>
        <p>{{ email }}</p>
        <p>{{ text }}</p>
      </div>
    </div>
    </div>

    <!-- User's posts container with scrollable content -->
    <div class="container-user-post">
    <div class="user-posts-container">
      <div v-if="userPosts.length > 0" class="user-posts">
        <h4>My Posts:</h4>
        <div class="post-grid">
          <div v-for="post in userPosts" :key="post.id" class="post-container">
            <img :src="getPostImageUrl(post.postImage)" alt="Post Image" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
// Import necessary dependencies
import CircularButton from "../CircularButton.vue";
import axios from "axios";
import swal from "sweetalert";

export default {
  components: {
    CircularButton,
  },
  data() {
    // Initial data setup
    return {
      token: '',
      userName: null,
      email: null,
      text: null,
      profilePicture: require('@/assets/profile.jpg'), // Set a default profile picture
      id: null,
      userPosts: [],
    };
  },
  methods: {
    // Fetch user details using Axios
    getUserDetails() {
      axios.get(`http://localhost:8080/api/user/${this.token}`)
          .then(response => {
            console.log('User details response:', response.data);
            this.id = response.data.id; // Assuming id is present in the response
            this.userName = response.data.userName;
            this.email = response.data.email;
            this.text = response.data.text;
            // Use default profile image if no custom image is available
            this.profilePicture = response.data.profileImage
                ? this.getProfilePictureUrl(response.data.profileImage)
                : require('@/assets/profile.jpg')

            // Check if this.id is not null before making the API call
            if (this.id !== null) {
              // Make the API call to get user posts
              this.getUserPosts();
            } else {
              console.error('Invalid user ID:', this.id);
            }
          })
          .catch(error => {
            console.error(error);
            this.userName = null;
            this.email = null;
            this.text = null;
            this.profilePicture = require('@/assets/profile.jpg');
          });
    },

    // Fetch user's posts using Axios
    getUserPosts() {
      axios.get(`http://localhost:8080/posts/user/posts`, {
        headers: {
          Authorization: this.token
        }
      })

          .then(response => {
            this.userPosts = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },


    // Get full URL for the post image
    getPostImageUrl(imageName) {
      return imageName ? `http://localhost:8080/posts/${imageName}?random=${Math.random()}` : null;
    },
    // Get full URL for the profile picture
    getProfilePictureUrl(imageName) {
      return imageName ? `http://localhost:8080/api/images/${imageName}?random=${Math.random()}` : null;
    },
    // Handle signout by removing token and resetting data
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      this.userName = null;
      this.email = null;
      this.text = null;
      this.profilePicture = require('@/assets/profile.jpg');
      this.$router.push('/SignIn');
      // Display a success message using SweetAlert
      swal({
        text: "Logged you out. Visit again",
        icon: "success",
      });
    },
  },
  mounted() {
    // On component mount, check for token and fetch user details if available
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserDetails();
      this.getUserPosts();
    }
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255); /* Add your desired background color */
}

.container {
  max-width: 1200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.04); /* Container background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Add margin to the top container */
  margin-top: 20px;
}

.container-user-post {
  max-width: 1200px;
  width: 100%;
  background-color: #fff; /* Container background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Center the container */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-info-container,
.user-posts-container {
  text-align: center;
}

.profile-picture-container img {
  width: 200px; /* Adjust profile picture size */
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.user-posts {
  margin-top: 20px;
}

.post-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.post-container {
  width: calc(30.30% - 10px); /* 33.33% width for each post with some margin */
  margin-bottom: 20px;
}

.post-container img {
  width: 100%;
  height: 100%; /* Make post images fill the container */
  object-fit: cover;
  border-radius: 8px;
}

/* Add any additional styling as needed */

</style>

