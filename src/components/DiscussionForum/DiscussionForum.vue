<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <div class="circular-button-container">

    <CircularButton
        @click="navigateToAddFeed"
        to="/AddDiscussion"
        icon="fa fa-plus"
        label="Add Question"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
    />

    <CircularButton
        @click="navigateToAddFeed"
        to="/MyQuestions"
        icon="fa fa-question"
        label="My Question"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
    />
  </div>
  <div  class="question-background">
    <h1>Friend Questions</h1>
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

        <!-- Eye Icon for Viewing Comments -->
        <div class="view-comments-icon">
          <i class="fa fa-eye" @click="showCommentsModal(question.comments)"></i>
          <span>{{ question.comments.length }}</span> <!-- Display comment count -->
        </div>

        <!-- Comment Section -->
        <div class="comment-section">
          <i class="fas fa-comment comment-icon" @click="toggleCommentField(question.id)"></i> <!-- Comment icon -->
          <div v-if="showCommentField === question.id" class="comment-field">
            <input type="text" v-model="commentText" placeholder="Enter your comment" />
            <button @click="sendComment(question.id)" class="send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Modal -->
    <div v-if="showCommentsModalFlag" class="comments-modal">
      <div class="comments-modal-content">

        <span class="close" @click="closeCommentsModal">&times;</span>
        <h3>Comments</h3>
        <div class="comments">
          <div v-for="comment in currentComments" :key="comment.id" class="comment">

            <img :src="getProfileImageUrl(comment.user.profileImage)" alt="User Profile Image" class="user-profile-image" />
            <p><strong>{{ comment.user.userName }}:</strong> {{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import CircularButton from "@/components/CircularButton.vue";
/* eslint-disable */

export default {
  components: {CircularButton},
  data() {
    return {
      questions: [],
      showCommentField: null,
      commentText: "",
      showCommentsModalFlag: false,
      currentComments: [],
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

        this.questions = response.data.map(question => ({
          ...question,
          comments: [] // Initialize comments array for each question
        }));

        // Fetch comments for each question
        this.fetchCommentsForQuestions();
      } catch (error) {
        // Error handling
      }
    },
    async fetchCommentsForQuestions() {
      try {
        const token = localStorage.getItem("token");
        for (const question of this.questions) {
          const response = await axios.get(`http://localhost:8080/comments/${question.id}`, {
            headers: {
              Authorization: token,
            },
          });
          // Update comments array for each question
          question.comments = response.data;
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        this.showErrorMessage();
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
        text: "An error occurred while fetching data",
      });
    },
    getProfileImageUrl(fileName) {
      return `http://localhost:8080/image/profile-images/${fileName}?${new Date().getTime()}`;
    },
    toggleCommentField(questionId) {
      // Toggle the comment field visibility
      this.showCommentField = this.showCommentField === questionId ? null : questionId;
      this.commentText = ""; // Reset comment text when toggling

      // Fetch comments only when the comment field is shown
      if (this.showCommentField === questionId) {
        this.fetchCommentsForQuestion(questionId);
      }
    },

    sendComment(questionId) {
      // Prepare the comment data
      const commentData = {
        questionId: questionId,
        content: this.commentText
      };

      // Get the token from local storage
      const token = localStorage.getItem("token");

      // Make a POST request to the backend endpoint to save the comment
      axios.post(`http://localhost:8080/comments`, commentData, {
        headers: {
          Authorization: token
        }
      })
          .then(response => {
            // Handle success response
            this.showcommentSuccessMessage()
            // Reset comment field after sending
            this.showCommentField = null;
            this.commentText = "";
            // Fetch comments for the updated question
            this.fetchCommentsForQuestion(questionId);
          })
          .catch(error => {
            // Handle error response
            this.showcommentErrorMessage()
            if (error.response && error.response.status === 401) {
              this.showUnauthorizedMessage();
            } else {
              this.showErrorMessage();
            }
          });
    },
    fetchCommentsForQuestion(questionId) {
      try {
        const token = localStorage.getItem("token");
        const question = this.questions.find(q => q.id === questionId);
        if (!question) return;

        axios.get(`http://localhost:8080/comments/${question.id}`, {
          headers: {
            Authorization: token,
          },
        })
            .then(response => {
              // Update comments array for the question
              question.comments = response.data;
            })
            .catch(error => {
              console.error("Error fetching comments for question:", error);
              this.showErrorMessage();
            });
      } catch (error) {
        console.error("Error fetching comments for question:", error);
        this.showErrorMessage();
      }
    },
    showcommentSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Comment saved successfully',
      });
    },
    showcommentErrorMessage() {
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error saving comment.',
      });
    },
    showCommentsModal(comments) {
      this.currentComments = comments;
      this.showCommentsModalFlag = true;
    },
    closeCommentsModal() {
      this.showCommentsModalFlag = false;
      this.currentComments = [];
    },
  },
};
</script>

<style scoped>
.question-background{
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  margin-bottom: 50px;
}
.question-container {
  display: flex;
  flex-direction: column;
  width: 500px; /* Fixed width */
  padding: 20px;
  margin: 20px auto; /* Center the container horizontally */
  background-color: #f2f2f2;
  border-radius: 5px;
}
.circular-button-container {

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background: rgb(24, 15, 15);
  box-shadow: rgb(0, 8, 49);
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

.comment-section {
  margin-top: 10px;
}

.comment-button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.comment-button:hover {
  background-color: #0056b3;
}

.comment-field {
  margin-top: 10px;
}

.send-button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.send-button:hover {
  background-color: #0056b3;
}

.comments {
  margin-top: 10px;
}

.comment {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 5px;
}

.comment-icon {
  margin-right: 5px;
  cursor: pointer;
}

.view-comments-icon {
  cursor: pointer;
}

.view-comments-icon i {
  cursor: pointer;
}

.view-comments-icon span {
  margin-left: 5px;
}

.comments-modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.comments-modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-height: 70vh; /* Adjust as needed */
  overflow-y: auto; /* Add scrollbar when content exceeds max-height */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.question-background h1{
  color: white;
  margin-top: 5px;
}
</style>
