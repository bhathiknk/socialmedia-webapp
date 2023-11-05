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
  <div class="todo-list-container">
    <h1>To-Do List</h1>
        <input type="text" v-model="todoText" placeholder="Enter" class="todo-input">
        <button @click="addTodo" class="todo-button add-button">Add</button>
        <button @click="closeTodoPopup" class="todo-button close-button">Close</button>
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
.todo-list-container {
  width: 50%;
  float: left;
  padding: 20px;
}

input {
  width: 100%;
}
.todo-popup {
  position: absolute;
  top: 50px;
  left: 50px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 300px;
}


h3 {
  font-size: 1.5rem;
  margin: 0 0 10px 0;
}

.todo-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.todo-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.add-button {
  background-color: #007bff;
  margin-right: 10px;
}

.close-button {
  background-color: #dc3545;
}


</style>

<script>
import { ref } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';

export default {
  data() {
    return {
      showTodoPopup: false,
      todoText: "",
      todoList: [],
    };
  },
  methods: {
    addTodo() {
      if (this.todoText.trim() !== "") {
        this.todoList.push(this.todoText);
        this.todoText = "";
      }
    },
    closeTodoPopup() {
      this.showTodoPopup = false;
    },
  },
  
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