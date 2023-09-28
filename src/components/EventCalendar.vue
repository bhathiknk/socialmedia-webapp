<template>
    <div class="calendar-container">
        <v-calendar v-model="selectedDate" is-double-click="true" class="full-width-calendar">
            <v-date-picker v-model="selectedDate" :attributes="events" @day-click="handleDayClick"></v-date-picker>
        </v-calendar>
        <div v-if="selectedDate">
            <h3>Selected Date: {{ selectedDate }}</h3>
            <!-- Add your task creator form here -->
        </div>
    </div>
</template>

<style>
/* Apply styles to the calendar container */
.calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the calendar horizontally */
    justify-content: center; /* Center the calendar vertically */
    height: 100vh;
    margin-top:-200px;
}

/* Set the calendar itself to fill the available width */
.full-width-calendar {
    width: 100%;
}

/* Optionally, you can add styles for the selected date display here */
</style>

<script>
import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

export default {
    components: {
        'v-calendar': Calendar,
        'v-date-picker': DatePicker,
    },
    setup() {
        const selectedDate = ref(null);
        const events = [];

        const handleDayClick = ({ date }) => {
            // Handle day click event here, you can add the selected date to your events array
            selectedDate.value = date;
        };

        return {
            selectedDate,
            events,
            handleDayClick,
        };
    },
};
</script>
