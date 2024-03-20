<template>
  <div class="profile">


    <!-- Second horizontal grid -->
    <div class="horizontal-grid-button">
      <div class="profile-picture-container">
        <img :src="profilePicture" alt="Profile Picture" class="img-fluid rounded-circle">
      </div>
      <!-- Circular buttons -->
      <div class="circular-buttons  grid-item">
        <!-- CircularButton components -->
        <CircularButtonProfile
            @click="navigateToEventCalendar"
            icon="fa fa-check"
            label="ToDo/Calendar"
            style="margin-bottom: 10px;  margin-left: 100px;color: white"
            to="/EventCalendar.vue"
        />
        <CircularButtonProfile
            @click="navigateToResourceLibrary"
            icon="fa fa-sticky-note"
            label="Short Note"
            style="margin-bottom: 10px; margin-left: 100px;color: white"
            to="/ShortNote.vue"
        />
        <CircularButtonProfile
            @click="navigateToGradesTracking"
            icon="fa fa-graduation-cap"
            label="Grades Tracking"
            style="margin-bottom: 10px; margin-left: 100px;color: white"
            to="/GradesTracking.vue"
        />
        <CircularButtonProfile
            @click="navigateToGoalSetting"
            icon="fa fa-comments"
            label="Discussion Forum"
            style="margin-bottom: 10px; margin-left: 100px;color: white"
            to="/DiscussionForum.vue"
        />
        <CircularButtonProfile
            @click="navigateToDailyJournaling"
            icon="fa fa-book"
            label="Daily Journaling"
            style="margin-bottom: 15px; margin-left: 100px;color: white"
            to="/DailyJournaling.vue"
        />
        <CircularButtonProfile
            @click="navigateToProfileEdit"
            icon="fa fa-user"
            label="Profile"
            style="margin-bottom: 10px; margin-left: 100px;color: white"
            to="/ProfileEdit.vue"
        />

        <CircularButtonProfile
            @click="signout"
            to="/ProfileEdit"
            v-if="token"
            icon="fa fa-sign-out"
            label="Signout"
            style="margin-bottom: 10px; margin-left: 100px;color: white"
        />
      </div>

    </div>


    <!-- Second horizontal grid -->
    <div class="horizontal-grid">
      <!-- Container 1 -->
      <div class="container1">
        <div class="left-container">
          <h3 class="container1-text">Your Today Task</h3>
          <div v-for="todo in todos" :key="todo.id">
            <div class="todo-container">
              <ul class="todo-show" id="todo">
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
        <!-- Content for Container 2 -->
        Container 2 Content
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
      </div>
    </div>
    </div>


  <!-- Include the EventCalendar component here -->
  <EventCalendar v-if="$route.path === '/calendar'" />
</template>

<script>
import CircularButtonProfile from '../components/CircularButtonProfile.vue';
import EventCalendar from '../components/EventCalendar.vue';
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: 'ProfileView',
  components: {
    CircularButtonProfile,
    EventCalendar,
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
      localStorage.removeItem("token");
      this.token = null;
      this.userName = null;
      this.email = null;
      this.text = null;
      this.profilePicture = require('@/assets/profile.jpg');
      this.$router.push('/SignIn');
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
  overflow: hidden;
}
.profile {
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  width: 100%;
  flex: 1;
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);


}
.container1 {
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 5px rgb(28, 17, 17);
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 220px);
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
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 5px rgb(28, 17, 17);
  flex: 1;

}
.container3 {
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 5px rgb(28, 17, 17);
  flex: 1;
}
.circular-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.grid-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(90,115,255,1) 82%);
}
.stopwatch {
  text-align: center;
  max-width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
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
  max-width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgb(28, 17, 17);
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
.profile-picture-container img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: 10px;
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
</style>