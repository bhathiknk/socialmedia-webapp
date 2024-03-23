<template>
  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/DiscussionForum"
          icon="fa fa-arrow-left"
          label="Back to Discussion"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
  </div>
  <div class="question-form-body">
    <h2>Add Question</h2>
    <form @submit.prevent="saveQuestion" class="question-form">
      <div class="form-group">
        <label for="content">Question Content:</label>
        <textarea id="content" v-model="questionContent" class="question-textarea" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import CircularButton from "@/components/CircularButton.vue"; // Import SweetAlert

export default {
  components: {CircularButton},
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
        this.questionContent= '';
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
.circular-button-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background: rgb(24, 15, 15);

}
.question-form-body {
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.question-form-body h2{
  color: white;
}
.question-form-body label {
  color: black;
}
.question-form {
  width: 150%;
  max-width: 700px; /* Adjust as needed */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  border-radius: 10px;

}

.question-textarea {
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
}

h2 {
  color: #333;
}

form {
  margin-top: 20px;
}

label {
  font-weight: bold;
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

button:hover{
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
</style>
