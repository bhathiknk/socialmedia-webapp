<template>
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
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import baseURL from "@/config";

export default {
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
          swal({
            text: "Post created successfully",
            icon: "success",
          });

          // Clear input fields after successful post creation
          this.postDto.caption = "";
          this.postDto.tags = "";
          // Reset the file input field (optional)
          this.$refs.imageInput.value = null;

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
    handleImageChange(event) {
      this.imageFile = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.add-feed-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #007bff;
  border-radius: 5px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
}

button:hover {
  background-color: #0056b3;
}
</style>
