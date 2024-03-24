<template>
  <div class="circular-button-container">
    <!-- Circular buttons for navigation -->
    <CircularButton
        @click="navigateToSignUp"
        to="/SignUp"
        v-if="!token"
        icon="fa fa-arrow-right"
        label="LogIn"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
    />

    <CircularButton
        @click="navigateToUserDetailEdit"
        to="/UserDetailEdit"
        v-if="token"
        icon="fa fa-gear"
        label="Settings"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
    />

    <CircularButton
        @click="signout"
        to="/ProfileEdit"
        v-if="token"
        icon="fa fa-sign-out"
        label="Signout"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
    />
  </div>


  <!-- container for profile picture, bio message, username, and email -->
  <div class="profile-edit">
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

          <div class="post-container" v-for="post in myPosts" :key="post.id">
            <img :src="getFullImageUrl(post.postImage)" alt="Post Image" class="post-image" />
          </div>
        </div>
      </div>



</template>

<script>
// Import necessary dependencies
import CircularButton from "../CircularButton.vue";
import axios from "axios";
import Swal from "sweetalert2";

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
      myPosts: [],
    };
  },
  methods: {
    // Fetch user details using Axios
    getUserDetails() {
      axios.get(`http://localhost:8080/api/user/${this.token}`)
          .then(response => {
            this.id = response.data.id; // Assuming id is present in the response
            this.userName = response.data.userName;
            this.email = response.data.email;
            this.text = response.data.text;
            // Use default profile image if no custom image is available
            this.profilePicture = response.data.profileImage
                ? this.getProfilePictureUrl(response.data.profileImage)
                : require('@/assets/profile.jpg')

          })
          .catch(error => {
            console.error(error);
            this.userName = null;
            this.email = null;
            this.text = null;
            this.profilePicture = require('@/assets/profile.jpg');
          });
    },

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



    getFullImageUrl(imageName) {
      return imageName ? `http://localhost:8080/posts/postImages/${imageName}` : null;
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
      this.$router.push('/');
      // Display a success message using SweetAlert
      this.showSuccessMessage();
    },

    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Logged You Out.Visit Again',
      });
    },
  },
  mounted() {
    // On component mount, check for token and fetch user details if available
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserDetails();
      this.fetchMyPosts();
    }
  },
};
</script>

<style scoped>

.profile-edit{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  height: 100%;
  min-height: 100vh;

}

.container {
  max-width: 1200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.04); /* Container background color */
  border-radius: 10px;
  border: 1px solid;
  padding: 20px;
  box-shadow: 0 0 100px rgb(0, 0, 0);
  height: auto;

}

.container-user-post {
  max-width: 1200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  margin: 10px auto; /* Center the container */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 0 100px rgb(0, 0, 0);
  height: auto;


}

.container p{
  color: white;
  font-size: 17px;
}
.container h3{
  color: white;
  font-size: 30px;
}

.container-user-post h4{
  color: white;
}

.profile-info-container
{
  text-align: center;
  margin-top: 10px;

}

.user-posts-container {
  text-align: center;

}

.profile-picture-container img {
  width: 200px; /* Adjust profile picture size */
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}


.post-container {
  width: 30.30%; /* Each post takes up 33.33% of the container */
  height: 400px; /* Set the height of each post */
  margin-bottom: 20px;
  display: inline-block; /* Ensure posts are displayed in a row */
  padding: 10px;
}

.post-container img {
  width: 100%; /* Make post images fill the post container */
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}


/* Add any additional styling as needed */

</style>