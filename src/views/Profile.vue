<template>
    <div>
        <h2>Learning Chart</h2>
        <div class="profile">
            <CircularButton to="/Profile.vue" icon="fa fa-check" label="ToDo" style="margin-bottom: 10px; margin-left: 5px" />
            <CircularButton
                @click="navigateToEventCalendar"
                icon="fa fa-calendar"
                label="Calendar"
                style="margin-bottom: 10px; margin-left: 5px"
                to="/EventCalendar.vue"
            />

            <CircularButton to="/Profile.vue" icon="fa fa-bullseye" label="Goal Setting" style="margin-bottom: 10px; margin-left: 5px" />
            <CircularButton to="/Profile.vue" icon="fa fa-book" label="Daily Journaling" style="margin-bottom: 10px; margin-left: 5px" />
            <CircularButton to="/Profile.vue" icon="fa fa-file" label="Study Timetable" style="margin-bottom: 10px; margin-left: 5px" />
            <CircularButton to="/Profile.vue" icon="fa fa-table" label="Reflective Journal" style="margin-bottom: 10px; margin-left: 5px" />

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
    },
};
</script>
