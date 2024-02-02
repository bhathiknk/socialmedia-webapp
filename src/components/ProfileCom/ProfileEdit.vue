<template>
  <div class="profile-edit">

    <!-- circular buttons -->

    <div class="container-1">
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
    <div class="container-2 profile-info">
      <div class="profile-picture-container">
        <img :src="profilePicture" alt="Profile Picture">
      </div>

      <h3>{{ userName }}</h3>
      <p>{{ email }}</p>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
import CircularButton from "../CircularButton.vue";
import axios from "axios";
import swal from "sweetalert";

export default {
  components: {
    CircularButton,
  },
  data() {
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
    getUserDetails() {
      axios.get(`http://localhost:8080/api/user/${this.token}`)
          .then(response => {
            this.userName = response.data.userName;//pass the username
            this.email = response.data.email;//passs the email
            this.text = response.data.text;//pass the bio
            this.profilePicture = `http://localhost:8080/images/${response.data.profileImage}`;//pass the picture
          })
          .catch(error => {
            console.error(error);
            this.userName = null;
            this.email = null;
            this.text = null;
          });
    },
    // Signout method
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      this.userName = null; // Clear the userName
      this.email = null; // Clear the email
      this.text = null;
      swal({
        text: "Logged you out. Visit again",
        icon: "success",
      });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserDetails(); // Call getUserName when the component is mounted and there's a token
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
</style>
