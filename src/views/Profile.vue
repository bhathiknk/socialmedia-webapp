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
            style="margin-bottom: 10px;  margin-left: 100px"
            to="/EventCalendar.vue"
        />
        <CircularButtonProfile
            @click="navigateToResourceLibrary"
            icon="fa fa-sticky-note"
            label="Short Note"
            style="margin-bottom: 10px; margin-left: 100px"
            to="/ShortNote.vue"
        />
        <CircularButtonProfile
            @click="navigateToGradesTracking"
            icon="fa fa-graduation-cap"
            label="Grades Tracking"
            style="margin-bottom: 10px; margin-left: 100px"
            to="/GradesTracking.vue"
        />
        <CircularButtonProfile
            @click="navigateToGoalSetting"
            icon="fa fa-comments"
            label="Discussion Forum"
            style="margin-bottom: 10px; margin-left: 100px"
            to="/DiscussionForum.vue"
        />
        <CircularButtonProfile
            @click="navigateToDailyJournaling"
            icon="fa fa-book"
            label="Daily Journaling"
            style="margin-bottom: 15px; margin-left: 100px"
            to="/DailyJournaling.vue"
        />
        <CircularButtonProfile
            @click="navigateToProfileEdit"
            icon="fa fa-user"
            label="Profile"
            style="margin-bottom: 10px; margin-left: 100px"
            to="/ProfileEdit.vue"
        />

        <CircularButtonProfile
            @click="signout"
            to="/ProfileEdit"
            v-if="token"
            icon="fa fa-sign-out"
            label="Signout"
            style="margin-bottom: 10px; margin-left: 100px"
        />
      </div>

    </div>


    <!-- Second horizontal grid -->
    <div class="horizontal-grid">
      <!-- Container 1 -->
      <div class="container1">
        <div class="left-container">
          <h3>Your Today Task</h3>
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
      <div class="container">
        <!-- Content for Container 2 -->
        Container 2 Content
      </div>

      <!-- Container 3 -->
      <div class="container">
        <!-- Content for Container 3 -->
        Container 3 Content
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

    // Handle signout by removing token and resetting data
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
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Logged You Out.Visit Again',
      });
    },

  },
};
</script>

<style scoped>
.profile {
  height: 100vh; /* Make profile div full viewport height */
  display: flex;
  flex-direction: column;
}

.horizontal-grid-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%; /* Ensures it takes full width on large screens */
}
.horizontal-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex: 1; /* Fill remaining vertical space */
}

.container {
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  flex: 1; /* Fill remaining vertical space */
}


.container1 {
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  flex: 1; /* Fill remaining vertical space */

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
}

@media only screen and (max-width: 768px) {
  .horizontal-grid {
    flex-direction: column;
  }
}


.todo-show {
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.17);
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
.profile-picture-container img {
  width: 150px; /* Adjust profile picture size */
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: 10px;
}
</style>
