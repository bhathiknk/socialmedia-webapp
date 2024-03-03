<template>

  <div class="circular-button-container">
    <CircularButton
        @click="navigateToAddFeed"
        to="/AddJournal"
        icon="fa fa-plus"
        label="Add Feed"
        style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
    />
  </div>


  <div>
    <div>
      <h2>Journal Entries</h2>
      <ul>
        <li v-for="(entry, index) in entries" :key="index">
          <span>{{ entry.date }}</span>
          <span>{{ entry.content }}</span>
          <span>{{ entry.mood }}</span>
          <span>{{ entry.goals }}</span>
          <button @click="editEntry(index)">Edit</button>
          <button @click="deleteEntry(index)">Delete</button>
        </li>
      </ul>
    </div>

    <div>
      <h2>Calendar</h2>
      <input type="month" v-model="selectedMonth" @change="updateCalendar" />
      <div class="calendar">
        <div v-for="(day, index) in calendar" :key="index" @click="selectDate(day)">
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircularButton from "@/components/CircularButton.vue";

export default {
  components: {CircularButton},
  data() {
    return {
      entry: {
        date: "",
        content: "",
        mood: "",
        goals: "",
      },
      entries: [],
      editing: false,
      selectedMonth: "",
      calendar: [],
    };
  },
  methods: {
    saveEntry() {
      if (this.editing) {
        // Update existing entry
        this.entries[this.editingIndex] = { ...this.entry };
      } else {
        // Save new entry
        this.entries.push({ ...this.entry });
      }

      this.clearForm();
    },
    editEntry(index) {
      this.editing = true;
      this.editingIndex = index;
      this.entry = { ...this.entries[index] };
    },
    deleteEntry(index) {
      this.entries.splice(index, 1);
    },
    selectDate(day) {
      this.entry.date = `${this.selectedMonth}-${day}`;
    },
    updateCalendar() {
      const daysInMonth = new Date(this.selectedMonth + "-01").getDaysInMonth();
      this.calendar = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    clearForm() {
      this.entry = { date: "", content: "", mood: "", goals: "" };
      this.editing = false;
      this.editingIndex = null;
    },
  },
};
</script>

<style scoped>
.circular-button-container {

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: #fff; /* Add your desired background color */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);/* Move the circular button to the right */
}
form {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar div {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}
</style>
