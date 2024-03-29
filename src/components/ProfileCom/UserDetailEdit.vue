<template>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/ProfileEdit"
          icon="fa fa-arrow-left"
          label="Back to Profile"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
  <!-- User Detail Edit Component -->
  <div class="user-detail-edit-container">
  <div class="user-detail-edit container mt-4">
    <h2 class="mb-4">Edit User Details</h2>
    <form @submit.prevent="updateUserDetails">
      <!-- Image Upload Section -->
      <div class="form-group">
        <label for="imageInput">Select Image:</label>
        <input type="file" id="imageInput" @change="handleImageChange" accept="image/*" class="form-control-file">
        <img v-if="selectedImage" :src="imagePreview" alt="Image Preview" class="img-fluid mt-2" />
      </div>

      <!-- User Name Input -->
      <div class="form-group">
        <label for="userName">User Name:</label>
        <input type="text" id="userName" v-model="userName" class="form-control">
      </div>

      <!-- Email Input -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control">
      </div>

      <!-- Bio Textarea -->
      <div class="form-group">
        <label for="text">Bio:</label>
        <textarea id="text" v-model="text" class="form-control" rows="4"></textarea>
      </div>

      <!-- Save Changes Button -->
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
  </div>
</template>

<script>
// Import necessary libraries
import axios from "axios";
import Swal from "sweetalert2";
import CircularButton from "@/components/CircularButton.vue";

export default {
  components: {CircularButton},
  data() {
    return {
      id: '',
      token: '',
      userId: '',
      userName: null,
      email: null,
      text: null,
      profileImage: null,
      selectedImage: null,
      imagePreview: null,
    };
  },
  methods: {
    // Handle image change
    handleImageChange(event) {
      this.selectedImage = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.selectedImage);
    },

    // Update user details
    updateUserDetails() {
      const formData = new FormData();
      formData.append("image", this.selectedImage);
      formData.append("userName", this.userName);
      formData.append("email", this.email);
      formData.append("text", this.text);

      axios.post(`http://localhost:8080/api/update/${this.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
          .then((response) => {
            this.showSuccessMessage();

            // Navigate to the ProfileEdit page
            this.$router.push('/ProfileEdit');

            // Optionally, you can emit an event to notify the parent component to update the profile image
            this.$emit("updateProfileImage", response.data.profileImage);
          })
          .catch((error) => {
            console.error(error);

            this.showErrorMessage();
          });
    },

    // Get user details
    getUserDetails() {
      axios.get(`http://localhost:8080/api/user/${this.token}`)
          .then(response => {
            this.id = response.data.id;
            this.userName = response.data.userName;
            this.email = response.data.email;
            this.text = response.data.text;
          })
          .catch(error => {
            console.error(error);
            this.id = null;
            this.profileImage = null;
            this.userName = null;
            this.email = null;
            this.text = null;
          });
    },

    showErrorMessage() {
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error updating user details.',
      });
    },
    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile Details Updated successfully',
      });
    },
  },
  // Component lifecycle hooks
  beforeUnmount() {
    console.log('Component is about to be destroyed');
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
  },
  mounted() {
    // Fetch user details on component mount
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserDetails();
    }
  },
};
</script>

<style scoped>
/* Scoped styles for the User Detail Edit component */
.user-detail-edit {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 50px rgb(0, 0, 0);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.01);
  max-height: calc(100vh - 100px);
}

.user-detail-edit-container{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
}
.form-group {
  margin-bottom: 15px;
}

/* Additional styling for the form controls */
label {
  display: block;
  font-weight: bold;
  border-radius: 10px;
  color: black;
}

input[type="file"] {
  width: 100%;
  padding: 8px;
  box-shadow: 0 0 50px rgb(28, 17, 17);
  border-radius: 10px;
  color: black;
}

img {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 0 50px rgb(0, 0, 0);
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 5px;
}

/* Optional: Style the Save Changes button on hover */
button:hover {
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}

</style>
