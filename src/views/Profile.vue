<template>
  <div>
    <div class="profile">

      <!-- First horizontal grid -->
      <div class="horizontal-grid">
        <!-- First grid content -->
        <div class="grid-item larger-grid">
          <!-- Content for the first grid -->
          <h1>First Grid (add additional APIs)</h1>
        </div>
      </div>

      <!-- Add space between grids -->
      <div class="grid-space">
      </div> <!-- This will create space between the grids -->

      <!-- Second horizontal grid -->
      <div class="horizontal-grid">
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


export default {
  name: 'ProfileView',
  components: {
    CircularButtonProfile,
    EventCalendar, // Add EventCalendar as a component here
  },
  methods: {
    navigateToGoalSetting() {
      // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
      this.$router.push("/DiscussionForum");
    },
    navigateToDailyJournaling() {
      // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
      this.$router.push("/DailyJournaling");
    },
    navigateToGradesTracking() {
      // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
      this.$router.push("/GradesTracking");
    },
    navigateToResourceLibrary() {
      // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
      this.$router.push("/ShortNote");
    },
    navigateToEventCalendar() {
      // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
      this.$router.push("/calendar");
    },
    navigateToProfileEdit() {
      // Unpm run serve
      // se Vue Router's push method to navigate to the "EventCalendar.vue" route
      this.$router.push("/ProfileEdit");
    },
  },
};
</script>
<style scoped>
.horizontal-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: -60px;
}

.grid-space {
  height: 10px;
}

/*Handling first Grid*/
.larger-grid {
  width: 290px;
  height: 498px;
  margin-top: 60px;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circular-buttons {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap to the next line */
  gap: 10px; /* Adjust space between buttons */
}

/* Styles for CircularButton component can be added here or in its own stylesheet */
.grid-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)


}
</style>