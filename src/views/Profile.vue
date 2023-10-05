<template>
    <div>
        <div class="profile">

            <CircularButton
                @click="navigateToToDo"
                icon="fa fa-check"
                label="ToDo/Calendar"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/ToDo.vue"
            />
            <CircularButton
                @click="navigateToResourceLibrary"
                icon="fa fa-table"
                label="ShortNote"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/ShortNote.vue"
            />
            <CircularButton
                @click="navigateToGradesTracking"
                icon="fa fa-file"
                label="Grades Tracking"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/GradesTracking.vue"
            />
            <CircularButton
                @click="navigateToGoalSetting"
                icon="fa fa-bullseye"
                label="Discussion Forum"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/DiscussionForum.vue"
            />
            <CircularButton
                @click="navigateToDailyJournaling"
                icon="fa fa-book"
                label="Daily Journaling"
                style="margin-bottom: 15px; margin-left: 5px"
                to="/DailyJournaling.vue"
            />
            <CircularButton
                @click="navigateToProfileEdit"
                icon="fa fa-user"
                label="Profile"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/ProfileEdit.vue"
            />

        </div>
    </div>
    <!-- Include the EventCalendar component here -->
    <EventCalendar v-if="$route.path === '/calendar'" />
</template>


<script>
import CircularButton from '../components/CircularButton.vue';
import EventCalendar from '../components/EventCalendar.vue';


export default {
    name: 'ProfileView',
    components: {
        CircularButton,
        EventCalendar, // Add EventCalendar as a component here
    },
    methods: {
        navigateToEventCalendar() {
            // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
            this.$router.push("/calendar");
        },
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
        navigateToToDo() {
            // Use Vue Router's push method to navigate to the "EventCalendar.vue" route
            this.$router.push("/ToDo");
        },
        navigateToProfileEdit() {
            // Unpm run serve
            // se Vue Router's push method to navigate to the "EventCalendar.vue" route
            this.$router.push("/ProfileEdit");
        },
    },
};
</script>
