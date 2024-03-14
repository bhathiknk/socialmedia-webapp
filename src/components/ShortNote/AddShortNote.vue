<template>
  <div>
    <h1>Add Module</h1>
    <div>
      <form @submit.prevent="saveModule" class="entry-form">

        <label for="entryMood">Module Name:</label>
        <input type="text" v-model="moduleName" id="entryMood" />


        <button type="submit" class="form-button">{{ editing ? "Save Journal" : "Save Module Name" }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
    return {
        moduleName: "",

    };
  },
  methods: {

    async saveModule() {
      try {
        const token = localStorage.getItem('token');
        //console.log('Token:', token);
        if (!token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.post(
            'http://localhost:8080/create-module',
            { moduleName: this.moduleName },
            {
              headers: {
                Authorization: token, // Use the retrieved token directly
                'Content-Type': 'application/json',
              },
            }
        );

        console.log(response.data);
        this.showSuccessMessage(); // Call function to show success message
      } catch (error) {
        console.error('Error saving question:', error.response ? error.response.data : error);
        alert('Failed to save question. Please try again.');
      }
    },

    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Journal saved successfully',
      });
    },

  },
  mounted() {
  },
};
</script>

<style scoped>
body {
  overflow-y: auto; /* Enable vertical scrolling for the entire page */
  height: 100%; /* Ensure body expands to full height of viewport */
}

.entry-form {
  max-width: 800px;
  margin: 100px auto;

}

.entry-form label {
  display: block;
  margin-bottom: 1px;
}

.entry-form input,
.entry-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.entry-form button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.entry-form button:hover {
  background-color: #45a049;
}
</style>
