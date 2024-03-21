<template>
  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/DailyJournaling"
          icon="fa fa-arrow-left"
          label="Back to Journal"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
    <div class="body">
      <h1>My Journal</h1>

      <form @submit.prevent="saveEntry" class="entry-form">
        <label for="entryDate">Date:</label>
        <input type="date" v-model="entry.date" id="entryDate" required />

        <label for="ckeditorContent">Content:</label>
        <div class="ckeditor-wrapper">
          <ckeditor v-if="ckeditor" :editor="ckeditor" v-model="entry.content" :config="editorConfig"></ckeditor>
        </div>

        <label for="entryMood">Mood:</label>
        <input type="text" v-model="entry.mood" id="entryMood" />

        <label for="entryGoals">Goals:</label>
        <input type="text" v-model="entry.goals" id="entryGoals" />

        <button type="submit" class="form-button">{{ editing ? "Save Journal" : "Save Entry" }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios';
import Swal from "sweetalert2";
import CircularButton from "@/components/CircularButton.vue";

export default {
  components: {
    CircularButton,
    ckeditor: CKEditor.component,
  },
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
      editorConfig: {
        // CKEditor configuration options
        // For example:
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'undo',
          'redo',
        ],
        // Set the height of the editor content area
        height: '800px',
      },
      ckeditorContent: 'uniqueIdForCkeditor',
      ckeditor: null,
    };
  },
  methods: {

    async initializeCKEditor() {
      try {
        const ClassicEditor = await import('@ckeditor/ckeditor5-build-classic');
        this.ckeditor = ClassicEditor.default; // Use .default to access the CKEditor instance
      } catch (error) {
        console.error('Error loading CKEditor', error);
      }
    },


    async saveEntry() {
      try {
        const response = await axios.post(
            'http://localhost:8080/journals/create',
            this.entry,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
        );

        if (response.status === 201) {
          // Successfully created the journal entry

          console.log('Journal entry created:');

          // Clear input fields
          this.entry = {
            date: "",
            content: "",
            mood: "",
            goals: "",
          };

          // Show success message using SweetAlert
          this.showSuccessMessage();

          // You can handle further actions, such as redirecting the user.
        } else {
          // Handle other HTTP response statuses if needed
          console.error('Failed to create journal entry:', response.status, response.data);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error creating journal entry:', error);
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
    this.initializeCKEditor();
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
body {
  overflow-y: auto; /* Enable vertical scrolling for the entire page */
  height: 100%; /* Ensure body expands to full height of viewport */
}
.body{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.body h1{
  color: white;
  margin-top: 10px;
}

.entry-form {
  width: 80%;
  max-width: 1000px;
  margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.04);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
}

.entry-form label {
  display: block;
  margin-bottom: 10px;
  color: black;
}

.entry-form input,
.ckeditor-wrapper {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}


.entry-form button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 5px;
}

.entry-form button:hover{
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
</style>
