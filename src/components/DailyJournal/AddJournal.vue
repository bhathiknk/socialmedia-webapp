<template>
  <div>
    <h1>My Journal</h1>
    <div>
      <form @submit.prevent="saveEntry" class="entry-form">
        <label for="entryDate">Date:</label>
        <input type="date" v-model="entry.date" id="entryDate" required />

        <label for="ckeditorContent">Content:</label>
        <div :id="ckeditorContent">
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

export default {
  components: {
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
