<template>
  <div class="resourceLibrary">
    <!-- First container -->
    <div class="container1">
      <div class="container-content">
        <button class="addModuleButton" @click="redirectToAddShortNote">Add Module</button> <!-- Button added here -->
        <div v-for="(name, index) in moduleNames" :key="index" class="card" @click="selectModule(index)" :class="{ 'selected': selectedIndex === index }">
          <p class="moduleName">{{ name }}</p>
        </div>
      </div>
    </div>

    <!-- Second container -->
    <div class="container2">
      <!-- Bio Textarea -->
      <div class="form-group">
        <label for="text1">Question:</label>
        <textarea id="Question" v-model="Question" class="form-control" rows="4"></textarea>
      </div>

      <!-- Bio Textarea -->
      <div class="form-group">
        <label for="text2">Answer:</label>
        <textarea id="Answer" v-model="Answer" class="form-control" rows="4"></textarea>
      </div>

      <!-- Save Changes Button -->
      <button @click="saveQuection" class="btn btn-primary">Save</button>
    </div>

    <!-- Third container -->
    <div class="container3">
      <div v-for="(record, index) in moduleRecords" :key="index" class="record">
        <p class="questionName">{{ index + 1 }}. {{ record.moduleQuestion }}</p>
        <p class="answer">★ {{ record.moduleAnswer }}</p>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";


export default {
  data() {
    return {
      moduleNames: [],
      selectedIndex: null, // Added variable to store the index of the selected module
      Question: '',
      Answer: '',
      moduleRecords: [] // Added variable to store module records
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
    },
    selectModule(index) {
      this.selectedIndex = index; // Set the selected index
      this.fetchModuleRecords(); // Fetch module records when module is selected
    },
    async fetchModuleRecords() {
      try {
        const token = localStorage.getItem("token");
        if (!token || this.selectedIndex === null) {
          console.error("Token not found in localStorage or module not selected");
          return;
        }

        const moduleId = this.selectedIndex + 1; // Adjusted to send the module ID (index + 1)

        const response = await axios.get(
            `http://localhost:8080/module-questions/${moduleId}`,
            {
              headers: {
                Authorization: token,
              },
            }
        );

        if (response.status === 200) {
          this.moduleRecords = response.data || [];
        } else {
          console.error("Failed to fetch module records:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error fetching module records:", error);
      }
    },
    async saveQuection() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        if (this.selectedIndex === null) {
          this.showErrorMessage();
          return;
        }

        const data = {
          moduleId: this.selectedIndex + 1, // Adjusted to send the module ID (index + 1)
          moduleQuestion: this.Question,
          moduleAnswer: this.Answer
        };

        const response = await axios.post(
            "http://localhost:8080/module-question",
            data,
            {
              headers: {
                Authorization: token,
              },
            }
        );

        if (response.status === 201) {
          this.showsavequectionSuccessMessage()
          // Clear input fields after successful save
          this.Question = '';
          this.Answer = '';
          this.selectedIndex = null; // Reset selected index
        } else {
          console.error("Failed to save module question:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error saving module question:", error);
      }
    },

    showsavequectionSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login successful',
      });
    },
    showErrorMessage() {
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Incorrect Password.Please Try Again.',
      });
    },
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
  overflow-y: auto; /* Add scrollbar if content exceeds */
}
.container1 .container-content {
  max-height: 300px; /* Set a maximum height for Container 1 */
  overflow-y: auto; /* Add scrollbar if content exceeds */
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
  width: 150px;
}

.container1 .card.selected {
  background-color: #4CAF50; /* Change background color for selected module */

}

.container2 {
  flex: 0.8;
  display: flex;
  flex-direction: column; /* Display items vertically */
  color: white;
  font-size: 2em;
  margin: 10px; /* Add margin between containers */
  background-color: #ffffff;
}

.form-group {
  margin-bottom: 15px;
}

/* Additional styling for the form controls */
label {
  display: block;
  font-weight: bold;
  color: #030202;
  font-size: 20px;
}

textarea {
  width: 100%;

  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: #4CAF50; /* Change background color for selected module */

}

/* Optional: Style the Save Changes button on hover */
button:hover {
  background-color: #143f17;
}
.container3 {
  flex: 1;
  display: flex;

  color: white;
  font-size: 2em;
  margin: 10px; /* Add margin between containers */
  background-color: #eeeeee;
  flex-direction: column; /* Display items vertically */
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  overflow-y: auto; /* Add scrollbar if content exceeds */

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

.record {
  margin-bottom: 20px;
}

.questionName {
  font-weight: bold;
  color: black;
  font-size: 20px;
}

.answer {
  color: black;
  font-size: 15px;
}
</style>
