<template>
  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/Feed"
          icon="fa fa-arrow-left"
          label="Back to Feed"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
  </div>
  <div class="add-feed-form-container">
  <div class="add-feed-form">
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
      <div class="form-group">
        <label for="caption">Caption:</label>
        <input type="text" id="caption" v-model="postDto.caption" required />
      </div>
      <div class="form-group">
        <label for="tags">Tags:</label>
        <input type="text" id="tags" v-model="postDto.tags" />
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" ref="imageInput" @change="handleImageChange" accept="image/*" required />
      </div>
      <button type="submit">Create Post</button>
    </form>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import baseURL from "@/config";
import Swal from "sweetalert2";
import CircularButton from "@/components/CircularButton.vue";

export default {
  components: {CircularButton},
  data() {
    return {
      postDto: {
        caption: "",
        tags: "",
      },
      imageFile: null,
    };
  },
  methods: {
    async createPost() {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", this.imageFile);
      formData.append("caption", this.postDto.caption);
      formData.append("tags", this.postDto.tags);

      try {
        const response = await axios.post(`${baseURL}posts/create`, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          console.log("Post created successfully");
          this.showSuccessMessage();

          // Clear input fields after successful post creation
          this.clearInputFields();

          // Redirect to the Feed page
          this.$router.push('/Feed');
        }
      } catch (error) {
        console.error("Error creating post:", error.message);
        swal({
          text: "Error creating post. Please try again.",
          icon: "error",
        });
      }
    },
    clearInputFields() {
      this.postDto.caption = "";
      this.postDto.tags = "";
      // Reset the file input field (optional)
      this.$refs.imageInput.value = null;
    },
    handleImageChange(event) {
      this.imageFile = event.target.files[0];
    },

    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Post created successfully',
      });
    },
  },
};
</script>


<style scoped>
.add-feed-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 50px rgb(0, 0, 0);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.01);
  max-height: calc(100vh - 100px);
}
.add-feed-form-container{
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

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
}
.add-feed-form  h2{
  color: white;
  margin: 40px;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  box-shadow: 0 0 50px rgb(28, 17, 17);
  border-radius: 10px;
  color: black;
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

button:hover {
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
</style>
