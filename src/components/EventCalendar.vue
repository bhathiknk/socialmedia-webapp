<template>

  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/"
          icon="fa fa-arrow-left"
          label="Back to Home"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
  </div>
  <div class="main-container">
  <div class="container">
    <!-- Left container -->
    <div class="left-container">
      <div v-for="todo in todos" :key="todo.id">
        <div class="todo-container">
          <ul class="todo-show" id="todo">
            <h3>{{ todo.todo }}</h3>
            <p>Date: {{ todo.date }}</p>
            <p>Time: {{ todo.time }}</p>
            <!-- Delete icon -->
            <i class="fa fa-trash-o" @click="deleteTodo(todo.id)" style="cursor: pointer;"></i>
          </ul>
        </div>
      </div>
    </div>

    <!-- Right container -->
    <div class="right-container">
      <div class="input-group">
        <label for="date">Select Date:</label>
        <input type="date" id="date" v-model="selectedDate">
      </div>
      <div class="input-group">
        <label for="time">Select Time:</label>
        <input type="time" id="time" v-model="selectedTime">
      </div>
      <div class="input-group">
        <label for="todo">Add Todo:</label>
        <textarea id="todo" v-model="newTodo" placeholder="Add Todo"></textarea>
      </div>
      <button @click="saveTodo">Save</button>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import CircularButton from "@/components/CircularButton.vue";

export default {
  name: 'HorizontalContainers',
  components: {CircularButton},
  data() {
    return {
      selectedDate: '',
      selectedTime: '',
      newTodo: '',
      todos: []
    }
  },
  mounted() {
    // Set the selectedDate to the current date when the component is mounted
    this.selectedDate = new Date().toISOString().substr(0, 10);

    // Fetch todos when the component is mounted
    this.fetchTodos();
  },
  methods: {
    async saveTodo() {
      try {
        const todoData = {
          date: this.selectedDate,
          time: this.selectedTime,
          todo: this.newTodo
        };

        // Get the user's token from local storage
        const token = localStorage.getItem('token');

        // Send POST request to the backend API endpoint
        await axios.post('http://localhost:8080/api/todos/save', todoData, {
          headers: {
            Authorization: token,
          },
        });

        this.fetchTodos();
        // Clear input fields after saving
        this.selectedDate = '';
        this.selectedTime = '';
        this.newTodo = '';

        this.showSuccessMessage();
      } catch (error) {
        this.showErrorMessage();
      }
    },

    async fetchTodos() {
      try {
        const token = localStorage.getItem('token');

        // Fetch todos using the token
        const response = await axios.get('http://localhost:8080/api/todos/fetch', {
          headers: {
            Authorization: token,
          },
        });

        // Update todos array with fetched data
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },

    async deleteTodo(todoId) {
      try {
        // Send DELETE request to the backend API endpoint
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/todos/${todoId}`, {
          headers: {
            Authorization: token,
          },
        });


        this.todos = this.todos.filter(todo => todo.id !== todoId);

        this.showDeleteSuccessMessage();
      } catch (error) {
        this.showDeleteErrorMessage();
      }
    },

    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Todo saved successfully',
      });
    },

    showErrorMessage() {
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error saving todo. Please Try Again.',
      });
    },

    showDeleteSuccessMessage() {
      // Show delete success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Todo deleted successfully',
      });
    },

    showDeleteErrorMessage() {
      // Show delete error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error deleting todo. Please Try Again.',
      });
    },
  }
}
</script>

<style scoped>
.circular-button-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background: rgb(24, 15, 15);
}
.main-container{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
}
.container {
  display: flex;
  height: 100vh;


}

.left-container {
  flex: 1;
  padding: 10px;
  margin: 10px;
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  border-radius: 10px;
}

/* Styling the scrollbar */
.left-container::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar */
}

.left-container::-webkit-scrollbar-track {
  background: #f1f1f1; /* Track color */
}

.left-container::-webkit-scrollbar-thumb {
  background: #888; /* Thumb color */
}

.left-container::-webkit-scrollbar-thumb:hover {
  background: #555; /* Thumb color on hover */
}

.todo-show {
  max-width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgb(0, 0, 0);

}



.todo-container {
  width: 600px;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 30px;
}

.fa {
  font-size: 25px;
  color: red; /* Change color as needed */
}

.right-container {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.04);
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px; /* Add margin to separate each input field */
}

.input-group label {
  margin-bottom: 7px; /* Add margin between label and input */
}

.input-group input[type="date"],
.input-group input[type="time"],
.input-group input[type="text"],
.input-group textarea {
  width: 99%; /* Set width to 100% */
  padding: 8px 15px;
  border: 2px solid #000000;
  border-radius: 10px;
  box-sizing: border-box;
  color:white ;
}

.right-container button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 5px;
}
.right-container label{
  color: white; /* Set text color to white */
}

.right-container button:hover {
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
</style>
