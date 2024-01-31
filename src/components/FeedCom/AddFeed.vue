<template>
  <div class="create-feed-form">
    <h2>Create Feed</h2>
    <form @submit.prevent="createFeed">
      <div class="form-group">
        <label for="imageInput">Select Image:</label>
        <input type="file" id="imageInput" @change="handleImageChange" accept="image/*" />
        <img v-if="imageData" :src="imageData" alt="Image Preview" style="max-width: 100%; max-height: 200px; margin-top: 10px;" />
      </div>
      <div class="form-group">
        <label for="caption">Caption:</label>
        <textarea id="caption" v-model="caption" required></textarea>
      </div>
      <button type="submit">Create Feed</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import baseURL from "@/config";

export default {
  data() {
    return {
      id: "",
      token: "",
      userId: null,
      imageFile: null, // Updated to store the image file
      caption: "",
    };
  },
  methods: {
    createFeed() {
      if (!this.userId) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("imageData", this.imageFile); // Append the actual file data
      formData.append("caption", this.caption);

      axios
          .post(`${baseURL}api/feed/create?id=${this.userId}`, formData)
          .then(() => {
            swal({
              text: "Feed created successfully",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error("Error creating feed", err);
          });
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file; // Update to store the actual file
        this.imageData = URL.createObjectURL(file); // For displaying a preview if needed
      }
    },

    getUserToken() {
      axios
          .get(`http://localhost:8080/api/user/${this.token}`)
          .then((response) => {
            this.userId = response.data.id;
            this.id = response.data.id;
          })
          .catch((error) => {
            console.error(error);
            this.userId = null;
            this.id = null;
          });
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserToken();
    }
  },
};
</script>

<style scoped>
/* Styles remain the same */
</style>




<style scoped>
.add-feed {
    max-width: 600px;
    margin: 90px auto;
    padding: 20px;
    border: 1px solid #007bff; /* Change border color to match the button */
    border-radius: 5px;
    background-color: #f8f8f8; /* Add a background color */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"] {
    width: 50%;
    padding: 4px; /* Increase input padding */
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none; /* Remove input outline */
}

textarea {
    width: 50%;
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
    margin-bottom: 15px;
}

button:hover {
    background-color: darkslategrey;
}
</style>
