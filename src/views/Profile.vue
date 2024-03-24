<template>
  <div class="profile">
    <!-- Second horizontal grid -->
    <div class="horizontal-grid-button">
      <div class="profile-picture-container">
        <img :src="profilePicture" alt="Profile Picture" class="img-fluid rounded-circle">
      </div>
      <!-- Circular buttons -->
      <div class="circular-buttons grid-item">
        <!-- CircularButton components -->
        <CircularButtonProfile
            @click="navigateToEventCalendar"
            icon="fa fa-check"
            label="ToDo"
            style="color: white"
            to="/EventCalendar.vue"
        />
        <CircularButtonProfile
            @click="navigateToResourceLibrary"
            icon="fa fa-sticky-note"
            label="Short Note"
            style="color: white"
            to="/ShortNote.vue"
        />
        <CircularButtonProfile
            @click="navigateToGradesTracking"
            icon="fa fa-graduation-cap"
            label="Grades Tracking"
            style="color: white"
            to="/GradesTracking.vue"
        />
        <CircularButtonProfile
            @click="navigateToGoalSetting"
            icon="fa fa-comments"
            label="Discussion Forum"
            style="color: white"
            to="/DiscussionForum.vue"
        />
        <CircularButtonProfile
            @click="navigateToDailyJournaling"
            icon="fa fa-book"
            label="Daily Journaling"
            style="color: white"
            to="/DailyJournaling.vue"
        />
        <CircularButtonProfile
            @click="navigateToProfileEdit"
            icon="fa fa-user"
            label="Profile"
            style="color: white"
            to="/ProfileEdit.vue"
        />

        <CircularButtonProfile
            @click="signout"
            to="/"
            v-if="token"
            icon="fa fa-sign-out"
            label="Signout"
            style="color: white"
        />
      </div>
    </div>

    <!-- Main content grid -->
    <div class="horizontal-grid">
      <!-- Container 1 -->
      <div class="container1">
        <div class="left-container">
          <h3 class="container1-text">Your Today Task</h3>
          <div v-if="todos.length === 0" style="color: white">
            <p>No Todos Added</p>
          </div>
          <div v-else>
          <div v-for="todo in todos" :key="todo.id" class="todo-container">
            <ul class="todo-show">
              <h3>{{ todo.todo }}</h3>
              <p>Date: {{ todo.date }}</p>
              <p>Time: {{ todo.time }}</p>
            </ul>
          </div>
          </div>
        </div>
      </div>

      <!-- Container 2 -->
      <div class="container2">
        <h2>Google Books Library</h2>
        <input type="text" v-model="searchQuery" placeholder="Search books">
        <div class="books">
          <div v-for="book in books" :key="book.id" class="book">
            <h3>{{ book.volumeInfo.title }}</h3>
            <p v-if="book.volumeInfo.authors">Authors: {{ book.volumeInfo.authors.join(', ') }}</p>
            <p v-if="book.volumeInfo.publisher">Publisher: {{ book.volumeInfo.publisher }}</p>
            <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail" alt="Book Cover">
            <p v-if="book.volumeInfo.description">{{ book.volumeInfo.description }}</p>
            <a v-if="book.volumeInfo.previewLink" :href="book.volumeInfo.previewLink" target="_blank">Preview</a>
          </div>
        </div>
      </div>


      <!-- Container 3 -->
      <div class="container3">
        <!-- Content for Container 3 -->
        <div class="stopwatch">
          <h3>Stopwatch</h3>
          <div class="stopwatch-timer">{{ formattedTime }}</div>
          <div class="stopwatch-buttons">
            <button id="stopwatch-buttons" @click="toggleTimer">{{ timerRunning ? 'Stop' : 'Start' }}</button>
            <button id="stopwatch-buttons" @click="resetTimer">Reset</button>
          </div>
        </div>
        <div class="card-item">
        <div class="card">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="card-inner">
            <div class="quote">
              <p>{{ quoteContent }}</p>
              <h1>- {{ quoteAuthor }}</h1>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircularButtonProfile from '../components/CircularButtonProfile.vue';
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: 'ProfileView',
  components: {
    CircularButtonProfile,
  },
  data() {
    return {
      selectedDate: '',
      selectedTime: '',
      newTodo: '',
      todos: [],
      profilePicture: require('@/assets/profile.jpg'),
      token: '',
      id: null,
      timerRunning: false,
      elapsedTime: 0,
      timerInterval: null,
      searchQuery: '',
      books: [],
      quoteContent:'',
      quoteAuthor:''
    }
  },
  watch: {
    searchQuery: function(newQuery) {
      if (newQuery.length >= 3) {
        this.searchBooks(newQuery);
      }
    }
  },
  computed: {
    formattedTime() {
      // Convert elapsed time (in seconds) to HH:mm:ss format
      const hours = Math.floor(this.elapsedTime / 3600);
      const minutes = Math.floor((this.elapsedTime % 3600) / 60);
      const seconds = this.elapsedTime % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {

    // Fetch todos when the component is mounted
    this.fetchTodos();
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserDetails();
      this.getquote();
    }
  },
  methods: {
    navigateToGoalSetting() {
      this.$router.push("/DiscussionForum");
    },
    navigateToDailyJournaling() {
      this.$router.push("/DailyJournaling");
    },
    navigateToGradesTracking() {
      this.$router.push("/GradesTracking");
    },
    navigateToResourceLibrary() {
      this.$router.push("/ShortNote");
    },
    navigateToEventCalendar() {
      this.$router.push("/calendar");
    },
    navigateToProfileEdit() {
      this.$router.push("/ProfileEdit");
    },


    getquote(){
    axios.get('https://api.quotable.io/random')
        .then(response => {
          // Update the quote content in the component data
          this.quoteContent = response.data.content;
          this.quoteAuthor = response.data.author;
        })
        .catch(error => {
          console.error('Error fetching quote:', error);
        });
  },
    async searchBooks(query) {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        this.books = response.data.items;
      } catch (error) {
        console.error('Error searching books:', error);
      }
    },
    async fetchTodos() {
      try {
        const token = localStorage.getItem('token');
        // Fetch todos using the token
        const response = await axios.get('http://localhost:8080/api/todos/fetch', {
          headers: {
            Authorization: token,
          },
        });
        // Update todos array with fetched data
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    getUserDetails() {
      axios.get(`http://localhost:8080/api/user/${this.token}`)
          .then(response => {
            this.profilePicture = response.data.profileImage
                ? this.getProfilePictureUrl(response.data.profileImage)
                : require('@/assets/profile.jpg')
            // Check if this.id is not null before making the API call
            if (this.id !== null) {
              // Make the API call to get user posts
              this.getUserPosts();
            } else {
              console.error('Invalid user ID:', this.id);
            }
          })
          .catch(error => {
            console.error(error);
            this.profilePicture = require('@/assets/profile.jpg');
          });
    },
    getProfilePictureUrl(imageName) {
      return imageName ? `http://localhost:8080/api/images/${imageName}?random=${Math.random()}` : null;
    },

    signout() {
      // Clear user details and token from localStorage
      localStorage.removeItem("token");
      this.token = null;
      this.profilePicture = require('@/assets/profile.jpg');
      // Clear other user-related data
      this.selectedDate = '';
      this.selectedTime = '';
      this.newTodo = '';
      this.todos = [];
      this.books = [];
      this.quoteContent = '';
      this.quoteAuthor = '';
      this.elapsedTime = 0;
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      // Redirect to sign-in page
      this.$router.push('/');
      // Display a success message using SweetAlert
      this.showSuccessMessage();
    },

    showSuccessMessage() {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Logged You Out.Visit Again',
      });
    },
    toggleTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerInterval);
      } else {
        this.timerInterval = setInterval(() => {
          this.elapsedTime++;
        }, 1000);
      }
      this.timerRunning = !this.timerRunning;
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      this.elapsedTime = 0;
      this.timerRunning = false;
    },
  },
};
</script>

<style scoped>
body {
  overflow: hidden; /* Disable scrolling for the entire page */
}
.profile {
  height: 110vh;
  display: flex;
  flex-direction: column;

}
.profile-picture-container {
  position: absolute; /* Position the container absolutely */
  padding-left: 50px;
  right: 83%; /* Position it in the center horizontally */
  transform: translateX(-50%); /* Center the container horizontally */
  z-index: 1; /* Ensure the profile picture container is above other content */
  top: 0px;

}

.profile-picture-container img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;

}

.horizontal-grid-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 91%);
}

.horizontal-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  overflow: hidden;
  height: 100vh;

}

.container1 {
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  flex: 1;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.01);
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
}

/* Styling the scrollbar */
.container1::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar */
}

.container1::-webkit-scrollbar-track {
  background: #f1f1f1; /* Track color */
}

.container1::-webkit-scrollbar-thumb {
  background: #888; /* Thumb color */
}

.container1::-webkit-scrollbar-thumb:hover {
  background: #555; /* Thumb color on hover */
}
.container2 {
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  flex: 1;
  background-color: rgba(255, 255, 255, 0.2);
  overflow-y: auto; /* Enable vertical scrolling for Container 2 */
  max-height: calc(100vh - 100px);
}

/* Adjustments for smaller screens */
@media screen and (max-width: 14in) {
  /* Media queries for smaller screens */
}
.container3 {
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  flex: 1;
  background-color: rgba(255, 255, 255, 0.01);
}
.circular-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding: 20px;
}


.grid-item {
  flex: 1;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 50px rgb(28, 17, 17);
  background: rgb(0,0,0);
  background: radial-gradient(circle, rgba(0,0,0,1) 46%, rgba(2,60,246,1) 100%);
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  margin-left: 80px;
}

.grid-item:before{
  content: '';
  width: 155px;
  height: 155px;
  background: #f1f1f1;
  position: absolute;
  top: 0px;
  left: -50%;

  border-radius: 100%;

}
.stopwatch {
  text-align: center;
  max-width: 90%;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 10px;
  margin: 0px auto;
  box-shadow: 0 0 5px rgb(28, 17, 17);

}

.stopwatch-timer {
  font-size: 24px;
  margin-bottom: 10px;
}

.stopwatch-buttons button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.todo-show {
  max-width: 70%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px rgb(28, 17, 17);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 10px;
}

.todo-container {
  width: 600px;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 30px;
}

.container1-text {
  color: white; /* Change the font color to white */
}


#stopwatch-buttons {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 5px;
}


#stopwatch-buttons:hover{
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}

/* Adjustments for smaller screens */
@media screen and (max-width: 14in) {
  .profile {
    height: auto;
  }

  .horizontal-grid-button {
    flex-direction: column;
    align-items: center;
  }

  .horizontal-grid {
    flex-direction: column;
  }

  .container1,
  .container2,
  .container3 {
    width: 100%;
    margin: 10px 0;
  }

  .circular-buttons {
    padding: 10px;
  }

  .stopwatch {
    max-width: 100%;
  }

  .profile-picture-container img {
    width: 100px;
    height: 100px;
  }

  .stopwatch-buttons button {
    font-size: 14px;
  }

  .todo-container {
    width: 100%;
  }
}

.books h3,
.books p{
  color: white;
}
.container2 h2{
  color: black;
}

.card {
  width: 250px;
  height: 300px;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  margin: 20px auto;
}
.card-item{
  padding: 10px;
}

.card-inner {
  width: inherit;
  height: inherit;
  background: rgba(255,255,255,.05);
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

.card:hover {
  transform: scale(1.04) rotate(1deg);
}

.circle {
  width: 100px;
  height: 100px;
  background: rgb(7,0,154);
  background: radial-gradient(circle, rgba(7,0,154,1) 0%, rgba(0,211,255,1) 100%);
  border-radius: 50%;
  position: absolute;
  animation: move-up6 2s ease-in infinite alternate-reverse;
}

.circle:nth-child(1) {
  top: -25px;
  left: -25px;
}

.circle:nth-child(2) {
  bottom: -25px;
  right: -25px;
  animation-name: move-down1;
}

@keyframes move-up6 {
  to {
    transform: translateY(-10px);
  }
}

@keyframes move-down1 {
  to {
    transform: translateY(10px);
  }
}
.quote{
  padding: 50px;
}
.quote h1{
  font-weight: bold;
  font-size: 20px;
}
.quote p{
  font-size: 17px;
}
</style>