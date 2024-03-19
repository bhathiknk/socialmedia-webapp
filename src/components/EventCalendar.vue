<template>
  <div class="container">
    <div class="left-container">
      <h2>Left Container</h2>
      <!-- Content for the left container -->
    </div>
    <div class="right-container">
      <div>
        <label for="date">Select Date:</label>
        <input type="date" id="date" v-model="selectedDate">
      </div>
      <div>
        <label for="time">Select Time:</label>
        <input type="time" id="time" v-model="selectedTime">
      </div>
      <div>
        <label for="todo">Add Todo:</label>
        <input type="text" id="todo" v-model="newTodo">
      </div>
      <button @click="saveTodo">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalContainers', // Component name
  data() {
    return {
      selectedDate: '', // Data property to store selected date
      selectedTime: '', // Data property to store selected time
      newTodo: '', // Data property to store new todo input
    }
  },
  methods: {
    saveTodo() {
      // Implement logic to save todo
      console.log('Todo saved:', {
        date: this.selectedDate,
        time: this.selectedTime,
        todo: this.newTodo
      });
      // Clear input fields after saving
      this.selectedDate = '';
      this.selectedTime = '';
      this.newTodo = '';
    }
  }
}
</script>

<style scoped>
.container {
  display: flex; /* Use Flexbox to arrange items horizontally */
  height: 100vh; /* Set container height to 100% of viewport height */
}

.left-container, .right-container {
  flex: 1; /* Make both containers flexible, taking up equal space */
  padding: 10px; /* Add padding for spacing */
  border: 1px solid #ccc; /* Optional: Add borders for visualization */
  box-shadow: 5px 10px 10px black;
  height: 100%; /* Set container height to 100% of parent container height */
  display: flex; /* Use Flexbox to align items vertically */
  flex-direction: column; /* Align items vertically */
  justify-content: center; /* Center items vertically */
  align-items: center; /* Center items horizontally */
  margin:10px 10px;
  ;
}

input[type="date"],
input[type="time"],
input[type="text"],
button {
  margin-bottom: 10px; /* Add margin between input fields and button */
  padding: 8px; /* Add padding to input fields and button */
  border: 1px solid #ccc; /* Add border to input fields and button */
  border-radius: 5px; /* Add border radius to input fields and button */
}

button {
  background-color: #007bff; /* Set background color for button */
  color: #fff; /* Set text color for button */
  cursor: pointer; /* Set cursor to pointer for button */
}

button:hover {
  background-color: #0056b3; /* Change background color on hover */
}
</style>
