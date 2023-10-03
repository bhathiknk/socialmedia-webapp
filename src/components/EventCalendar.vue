<template>
  <div class="container">
    <h1>Calender</h1>
  </div>
  <div id="Calender-frame">
    <div class="calendar-container">
      <v-calendar v-model="selectedDate" is-double-click="true" class="full-width-calendar" :attributes="attrs">
        <v-date-picker @day-click="handleDayClick"></v-date-picker>
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
  </div>
  <!--/* After Coding is completed Delete This */-->
  <div id="Edit-details" class="modal-dialog-scrollable">
    <div class="alert alert-dismissible alert-warning">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <h4 class="alert-heading">Warning!</h4>
      <p class="mb-0">Developer Purpose only</p>
    </div>

    <div class="container">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <b>Template & Style (HTML & CSS) Changes</b>
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
              <strong>1.</strong> Add a Calender Frame and Styles<code> #Calender-frame</code>, Dev: Vilochana Rajapaksaha.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <b>Script Changes</b>
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>1.</strong> Add a Live Date <code>:attributes="attrs"</code> Dev: Vilochana Rajapaksaha.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <b>Additional Notes</b>
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>1.</strong> Still Develping Calander body <code>Event saveing & Displaying ETC.. </code>, Dev: Vilochana Rajapaksaha.
            </div>
          </div>
        </div>
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
  /* height: 100vh;
  margin-top: -200px;
  margin-right: 500px;
  margin-left: 500px; */
}

/* Set the calendar itself to fill the available width */
.full-width-calendar {
  width: 100%;
}

#Calender-frame {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* After Coding is completed Delete This */
#Edit-details{
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>

<script>
import { ref } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';

export default {
  components: {
    'v-calendar': Calendar,
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

    const attrs = ref([
      {
        key: 'today',
        highlight: true,
        dates: new Date(),
      },
    ]);

    return {
      selectedDate,
      events,
      newEvent,
      editingEvent,
      handleDayClick,
      startEditing,
      saveEvent,
      attrs,
    };
  },
};
</script>