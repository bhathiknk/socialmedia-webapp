<template>
  <div>
    <h2>Create a New Post</h2>
    <form @submit.prevent="submitPost">
      <label for="image">Image:</label>
      <input type="file" ref="imageInput" @change="previewImage" accept="image/*" required />

      <img v-if="previewImageUrl" :src="previewImageUrl" alt="Preview" style="max-width: 100%; margin-top: 10px;" />

      <label for="caption">Caption:</label>
      <textarea v-model="caption" required></textarea>

      <label for="tags">Tags (comma-separated):</label>
      <input type="text" v-model="tags" />

      <button type="submit">Submit Post</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewImageUrl: '',
      caption: '',
      tags: '',
    };
  },
  methods: {
    previewImage() {
      const input = this.$refs.imageInput;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImageUrl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    submitPost() {
      const formData = new FormData();
      formData.append('image', this.$refs.imageInput.files[0]);
      formData.append('caption', this.caption);
      formData.append('tags', this.tags);

      // Assuming you have a backend endpoint for creating posts
      this.$axios.post('/api/posts', formData)
          .then(response => {
            console.log('Post created successfully:', response.data);
            // Optionally, redirect the user to the feed page or do something else
          })
          .catch(error => {
            console.error('Error creating post:', error);
            // Handle errors (show a message to the user, etc.)
          });
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

form {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: #555;
}

input[type="file"] {
  margin-top: 5px;
}

textarea {
  margin-top: 5px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
}

button:hover {
  background-color: #45a049;
}

img {
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  max-width: 100%;
}
</style>

