<template>
  <div class="resourceLibrary">
    <!-- First container -->
    <div class="container1">
      <button class="addModuleButton" @click="redirectToAddShortNote">Add Module</button> <!-- Button added here -->
      <div v-for="(name, index) in moduleNames" :key="index" class="card">
        <p class="moduleName">{{ name }}</p>
      </div>
    </div>

    <!-- Second container -->
    <div class="container2">
      <!-- Content for container 2 -->
    </div>

    <!-- Third container -->
    <div class="container3">
      <!-- Content for container 3 -->
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      moduleNames: []
    };
  },
  mounted() {
    this.fetchModuleNames();
  },
  methods: {
    async fetchModuleNames() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(
            "http://localhost:8080/modules",
            {
              headers: {
                Authorization: token,
              },
            }
        );

        if (response.status === 200) {
          this.moduleNames = response.data.map(module => module.moduleName) || [];
        } else {
          console.error("Failed to fetch module names:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error fetching module names:", error);
      }
    },
    redirectToAddShortNote() {
      this.$router.push('/AddShortNote'); // Redirect to AddShortNote route
    }
  }
};
</script>

<style scoped>
/* Add your CSS styling for the component here */
.resourceLibrary {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
}

.container1 {
  flex: 0.5;
  display: flex;
  flex-direction: column; /* Display module names vertically */
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  margin: 10px; /* Add margin between containers */
  background-color: #eeeeee;
  position: relative; /* Position relative for button positioning */
}

.addModuleButton {
  position: absolute; /* Position the button absolutely within the container */
  top: 10px; /* Adjust top position */
  right: 10px; /* Adjust right position */
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.container2 {
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  margin: 10px; /* Add margin between containers */
  background-color: #ffffff;
}

.container3 {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  margin: 10px; /* Add margin between containers */
  background-color: #eeeeee;
}

.card {
  width: 300px; /* Set the width of the card */
  height: 70px; /* Set the height of the card */
  background-color: #eeeeee; /* Set background color */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px; /* Add margin between cards */
}
/* Style for module names */
.moduleName {
  font-size: 0.5em; /* Adjust font size */
}
</style>
