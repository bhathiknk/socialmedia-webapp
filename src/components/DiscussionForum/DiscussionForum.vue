<template>
  <div>
    <h2>Friend Questions</h2>
    <div v-if="questions.length === 0">
      <p>No questions from friends</p>
    </div>
    <div v-else>
      <div v-for="question in questions" :key="question.id" class="question-container">
        <div class="user-info">
          <!-- Profile Image -->
          <img :src="getProfileImageUrl(question.user.profileImage)" alt="User Profile Image" class="user-profile-image" />

          <!-- Username -->
          <p class="username">{{ question.user.userName }}</p>
        </div>

        <!-- Question Content -->
        <div class="question-content">
          <p>{{ question.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      questions: [],
    };
  },
  mounted() {
    this.fetchFriendQuestions();
  },
  methods: {
    async fetchFriendQuestions() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(`http://localhost:8080/questions/friends`, config);
        console.log("Response from backend:", response);

        // Check if the response data is a string
        if (typeof response.data === 'string') {
          // Parse the string data into an array of objects
          this.questions = JSON.parse(response.data);
        } else {
          // Use the response data directly
          this.questions = response.data;
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.showUnauthorizedMessage();
        } else {
          console.error("Error fetching friend questions:", error);
          this.showErrorMessage();
        }
      }
    },
    showUnauthorizedMessage() {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not authorized to access this resource",
      });
    },
    showErrorMessage() {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while fetching friend questions",
      });
    },

    getProfileImageUrl(fileName) {
      return `http://localhost:8080/image/profile-images/${fileName}?${new Date().getTime()}`;
    },
  },
};
</script>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  width: 500px; /* Fixed width */
  height: 300px; /* Fixed height */
  padding: 20px;
  margin: 20px auto; /* Center the container horizontally */
  background-color: #f2f2f2;
}

.user-info {
  display: flex;
  align-items: flex-start; /* Align items at the start (top) */
  margin-bottom: 10px; /* Adjust margin as needed */
}

.user-profile-image {
  width: 70px; /* Adjust the width and height as needed */
  height: 70px;
  border-radius: 50%;
  object-fit: cover; /* Ensures the image covers the entire container */
  margin-right: 10px; /* Adjust margin as needed */
}

.username {
  font-weight: 500;
  color: #030202;
  margin: 10px; /* Remove default margin */
}
</style>