<template>
  <div class="user-detail-edit">
    <h2>Edit User Details</h2>
    <form >
      <div class="form-group">
        <label for="imageInput">Select Image:</label>
        <input type="file" id="imageInput" @change="handleImageChange" accept="image/*" />
        <img v-if="profileImage" :src="profileImage" alt="Image Preview" style="max-width: 100%; max-height: 200px; margin-top: 10px;" />
      </div>
      <div class="form-group">
        <label for="user-name">User Name:</label>
        <input type="text" id="userName" v-model="userName" />
      </div>
      <div class="form-group">
        <label for="user-email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="bio">Bio:</label>
        <textarea type="text" id="text" v-model="text"></textarea>
      </div>
      <button type="submit" @click.prevent="updateUserDetails">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      id:'',
      token: '',
      userId:'',
      userName: null,
      email: null,
      text:null,
      profileImage:null

    };
  },
  methods: {

    getUserDetails() {
      // Perform an API request to get the user's details
      axios.get(`http://localhost:8080/api/user/${this.token}`) //API endpoint
          .then(response => {
            this.id=response.data.id;
            this.profileImage=response.data.profileImage;
            this.userName = response.data.userName;
            this.email = response.data.email;
            this.text=response.data.text;
            // parameter for API response
          })
          .catch(error => {
            console.error(error);
            this.id=null;
            this.profileImage=null;
            this.userName = null;
            this.email = null;
            this.text=null;
          });
    },
    updateUserDetails() {
      const formData = new FormData();
      formData.append("image", this.imageFile); // Add image file to FormData
      formData.append("userName", this.userName);
      formData.append("email", this.email);
      formData.append("text", this.text);

      axios.post(`http://localhost:8080/api/update/${this.id}`, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      })
          .then((response) => {
            console.log(response.data);
            swal({
              text: "User Detail has been updated successfully",
              icon: "success",
            });
            // You may want to update the user details after successful update
            this.getUserDetails();
          })
          .catch((error) => {
            console.error(error);
            swal({
              text: "User Details Not Updated",
              icon: "error",
            });
          });
    },


    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file; // Update to store the actual file
        this.profileImage = URL.createObjectURL(file); // For displaying a preview if needed
      }
    },

  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserDetails();
    }
  }
};
</script>


<style scoped>
.user-detail-edit {
  max-width: 400px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #007bff; /* Change border color to match the button */
  border-radius: 5px;
  background-color: #f8f8f8; /* Add a background color */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  overflow-y: auto;
}

.form-group {
  margin-bottom: 5px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="file"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.profile-picture-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 4px; /* Increase input padding */
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none; /* Remove input outline */
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px; /* Add space above the button */
}
.plus-button {
  background-color: #007bff;
  color: #fff;
  padding: 1px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  margin-right: 200%;
  width: 30px;
  height: 30px;
}

/* Style the "plus" button on hover */
.plus-button:hover {
  background-color: #0056b3;
}
</style>
