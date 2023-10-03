<template>
    <div class="calendar-container">
        <v-calendar v-model="selectedDate" is-double-click="true" class="full-width-calendar">
            <v-date-picker v-model="selectedDate" :attributes="events" @day-click="handleDayClick"></v-date-picker>
        </v-calendar>
        <div v-if="selectedDate">
            <h3>Selected Date: {{ selectedDate }}</h3>
            <div>
                <button @click="startEditing">Add Event/Task</button>
            </div>
            <div v-if="editingEvent">
                <input v-model="newEvent" type="text" placeholder="Enter your Event or Task" />
                <button @click="saveEvent">Save</button>
            </div>
            <div v-if="events[selectedDate]">
                <h4>Events/Tasks:</h4>
                <ul>
                    <li v-for="(event, index) in events[selectedDate]" :key="index">{{ event }}</li>
                </ul>
            </div>
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
    margin-top: -200px;
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
        const events = {};
        const newEvent = ref('');
        const editingEvent = ref(false);

        const handleDayClick = ({ date }) => {
            selectedDate.value = date;
            editingEvent.value = false; // Ensure the input field is hidden initially
        };

        const startEditing = () => {
            editingEvent.value = true;
        };

        const saveEvent = () => {
            const date = selectedDate.value;
            if (!events[date]) {
                events[date] = [];
            }
            events[date].push(newEvent.value);
            newEvent.value = '';
            editingEvent.value = false;
        };

        return {
            selectedDate,
            events,
            newEvent,
            editingEvent,
            handleDayClick,
            startEditing,
            saveEvent,
        };
    },
};
</script>
