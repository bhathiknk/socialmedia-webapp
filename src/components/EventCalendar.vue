<template>
    <div>
        <v-calendar v-model="selectedDate" is-double-click="true">
            <v-date-picker
                    v-model="selectedDate"
                    :attributes="events"
                    @day-click="handleDayClick"
            ></v-date-picker>
        </v-calendar>
        <div v-if="selectedDate">
            <h3>Selected Date: {{ selectedDate }}</h3>
            <!-- Add your task creator form here -->
        </div>
    </div>

</template>
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

