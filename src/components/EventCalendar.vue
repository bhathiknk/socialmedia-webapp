<template>
  <div>
    <div class="event-panel">
      <div class="add-event-panel">
        <textarea
          v-model="newEventTitle"
          placeholder="add event"
          rows="3"
        ></textarea>
        <button @click="addEvent">Add</button>
      </div>
      <div class="remove-event-panel">
        <div v-for="event in events" :key="event.id" class="event">
          {{ event.title }}
          <button @click.stop="removeEvent(event)">Remove</button>
        </div>
      </div>
    </div>
    <div class="calendar-container">
      <div class="calendar">
        <div class="header">
          <button @click="prevMonth">&lt;</button>
          <h2>{{ currentMonth }}</h2>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days">
          <div v-for="day in days" :key="day" class="day">{{ day }}</div>
        </div>
        <div class="dates">
          <div
            v-for="date in dates"
            :key="date.id"
            class="date"
            :class="{ 'today': isToday(date), 'selected': isSelected(date) }"
            @click="selectDate(date)"
          >
            {{ date.day }}
            <div v-if="isSelected(date)">
              <div v-for="event in getEvents(date)" :key="event.id" class="event">
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      events: [], // Array to store events
      newEventTitle: '' // Title of the new event
    };
  },
  computed: {
    currentMonth() {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = this.currentDate.getMonth();
      const year = this.currentDate.getFullYear();
      return `${monthNames[monthIndex]} ${year}`;
    },
    days() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    },
    dates() {
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      const datesArray = [];

      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
        datesArray.push({ id: i, day: i, date });
      }

      return datesArray;
    }
  },
  methods: {
    prevMonth() {
    
      const newMonth = this.currentDate.getMonth() - 1;
      if (newMonth < 0) {
        this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
        this.currentDate.setMonth(11);
      } else {
        this.currentDate.setMonth(newMonth);
      }
    },
    nextMonth() {
  
      const newMonth = this.currentDate.getMonth() + 1;
      if (newMonth > 11) {
        this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        this.currentDate.setMonth(0);
      } else {
        this.currentDate.setMonth(newMonth);
      }
    },
    isToday(date) {
      const today = new Date();
      return date.date.toDateString() === today.toDateString();
    },
    isSelected(date) {
      return this.selectedDate && date.date.toDateString() === this.selectedDate.toDateString();
    },
    selectDate(date) {
  if (this.selectedDate && date.date.toDateString() === this.selectedDate.toDateString()) {
    this.selectedDate = null; // Clear selectedDate if the same date is clicked again
  } else {
    this.selectedDate = new Date(date.date);
    const selectedEvents = this.events.filter(event => event.date.toDateString() === this.selectedDate.toDateString());
    this.events = [...selectedEvents]; // Update events array with events for the selected date
  }
},


    getEvents() {
      if (!this.selectedDate) return []; // If no date is selected, return an empty array
      return this.events.filter(event => event.date.toDateString() === this.selectedDate.toDateString());
    },
    addEvent() {
      if (this.selectedDate && this.newEventTitle.trim() !== '') {
        const eventDate = new Date(this.selectedDate);
        this.events.push({ id: this.events.length + 1, title: this.newEventTitle, date: eventDate });
        this.newEventTitle = ''; // Clear the input field after adding event
      }
    },
    removeEvent(event) {
      this.events = this.events.filter(e => e.id !== event.id);
    }
  }
};
</script>


<style scoped>
/* Styles for the calendar component */

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  background-color: #f5f5f5; /* Optional background color */
  box-sizing: border-box; /* Include padding and border in the width calculation */
}

.calendar {
  width: 100%;
  max-width: 800px; /* Max width for the calendar */
  height: 100%;
  padding: 20px; /* Add padding for spacing */
  border: 2px solid black; /* Add black border */
  border-radius: 8px; /* Add border radius */
  background-color: #ffffff; /* White background */
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  border-radius: 8px 8px 0 0;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 5px;
}

.day {
  text-align: center;
  font-weight: bold;
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 10px;
}

.date {
  text-align: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 

}

.date:hover {
  background-color: #f0f0f0;
}

.today {
  background-color: #f0f0f0;
}

.selected {
  background-color: #66bb6a;
  color: #fff;
}

.event {
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.event-panel {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 40%;
  right: 100px;
  transform: translateY(-50%);
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-event-panel {
  margin-bottom: 10px;
}

.add-event-panel textarea {
  width: 100%;
  margin-bottom: 10px;
}

.add-event-panel button {
  display: block;
  width: 100%;
}

.remove-event-panel {
  display: flex;
  flex-direction: column;
}

.remove-event-panel .event {
  margin-bottom: 5px;
}

.remove-event-panel button {
  margin-left: 5px;
}
</style>
