<template>
  <div class="app">
    <div class="container">
      <h2>Todo List</h2>
      <ul class="todo-list">
        <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
      </ul>
    </div>
    <div class="container">
      <h2>Calendar</h2>
      <div class="calendar">
        <!-- Calendar component goes here -->
        <p>Current Date: {{ currentDate }}</p>
      </div>
      <input type="text" v-model="newTodo" placeholder="Enter new todo">
      <button @click="addTodo">Add Todo</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      currentDate: new Date().toLocaleDateString()
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push(this.newTodo);
        this.newTodo = '';
      }
    }
  }
};
</script>

<style>
.container {
  display: inline-block;
  width: 45%;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.calendar {
  /* Calendar styles go here */
}

input[type="text"] {
  width: calc(100% - 80px);
  padding: 5px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
