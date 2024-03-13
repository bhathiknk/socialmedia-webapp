<template>
  <div>
    <h2>Add Question</h2>
    <form @submit.prevent="saveQuestion">
      <div class="form-group">
        <label for="content">Question Content:</label>
        <textarea id="content" v-model="questionContent" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

export default {
  data() {
    return {
      questionContent: '',
    };
  },
  methods: {
    async saveQuestion() {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.post(
            'http://localhost:8080/create',
            { content: this.questionContent },
            {
              headers: {
                Authorization: token, // Use the retrieved token directly
                'Content-Type': 'application/json',
              },
            }
        );

        console.log(response.data);
        this.showSuccessMessage(); // Call function to show success message
      } catch (error) {
        console.error('Error saving question:', error.response ? error.response.data : error);
        alert('Failed to save question. Please try again.');
      }
    },
    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Question saved successfully',
      });
    },
  },
};
</script>

<style scoped>
/* Add your component's styling here */
h2 {
  color: #333;
}

form {
  margin-top: 20px;
}

label {
  font-weight: bold;
}

textarea {
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
