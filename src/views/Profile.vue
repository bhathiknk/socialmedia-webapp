<template>
    <div>
        <div class="profile">

            <CircularButton
                @click="navigateToToDo"
                icon="fa fa-check"
                label="ToDo"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/ToDo.vue"
            />
            <CircularButton
                @click="navigateToEventCalendar"
                icon="fa fa-calendar"
                label="Calendar"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/EventCalendar.vue"
            />
            <CircularButton
                @click="navigateToGoalSetting"
                icon="fa fa-bullseye"
                label="Goal Setting"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/GoalSetting.vue"
            />
            <CircularButton
                @click="navigateToDailyJournaling"
                icon="fa fa-book"
                label="Daily Journaling"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/DailyJournaling.vue"
            />
            <CircularButton
                @click="navigateToGradesTracking"
                icon="fa fa-file"
                label="Grades Tracking"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/GradesTracking.vue"
            />
            <CircularButton
                @click="navigateToResourceLibrary"
                icon="fa fa-table"
                label="Resource Library"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/ResourceLibrary.vue"
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
            this.$router.push("/goal");
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
            this.$router.push("/ResourceLibrary");
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
