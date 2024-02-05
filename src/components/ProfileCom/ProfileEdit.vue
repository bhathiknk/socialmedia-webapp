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
    <div class="container-2 profile-info fixed-middle container-md"> <!-- Added Bootstrap class container-md for responsiveness -->
      <div class="profile-picture-container">
        <!-- Profile picture with responsive classes -->
        <img :src="profilePicture" alt="Profile Picture" class="img-fluid rounded-circle">
      </div>

      <h3>{{ userName }}</h3>
      <p>{{ email }}</p>
      <p>{{ text }}</p>
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
    };
  },
  methods: {
    // Fetch user details using Axios
    getUserDetails() {
      axios.get(`http://localhost:8080/api/user/${this.token}`)
          .then(response => {
            this.userName = response.data.userName;
            this.email = response.data.email;
            this.text = response.data.text;
            // Use default profile image if no custom image is available
            this.profilePicture = response.data.profileImage ?
                this.getProfilePictureUrl(response.data.profileImage) :
                require('@/assets/profile.jpg');
          })
          .catch(error => {
            console.error(error);
            this.userName = null;
            this.email = null;
            this.text = null;
            this.profilePicture = require('@/assets/profile.jpg');
          });
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
    }
  },
};
</script>

<style scoped>
/* Your existing CSS styles */

.container-2.profile-info {
  margin: 20px auto;
  max-width: 80%;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.profile-picture-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  border: 3px solid #1c1111;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.profile-picture-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-info h3 {
  font-size: 28px;
  margin-top: 10px;
  color: #333;
  margin-bottom: 20px;
}

.profile-info p {
  color: #666;
  margin-bottom: 15px;
}

.fixed-left {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: #fff; /* Add your desired background color */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.fixed-middle {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  padding: 20px;
  text-align: center;
  width: 60%;
}

@media (max-width: 768px) {
  .fixed-middle {
    top: 50%;
    width: 80%;
  }
}
</style>
