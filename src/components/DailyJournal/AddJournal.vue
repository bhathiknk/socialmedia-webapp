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

        <button type="submit" class="form-button">{{ editing ? "Update Entry" : "Save Entry" }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';

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
    async initializeCKEditor() {
      try {
        const ClassicEditor = await import('@ckeditor/ckeditor5-build-classic');
        this.ckeditor = ClassicEditor.default; // Use .default to access the CKEditor instance
      } catch (error) {
        console.error('Error loading CKEditor', error);
      }
    },
  },
  mounted() {
    this.initializeCKEditor();
  },
};
</script>

<style scoped>
.entry-form {
  max-width: 800px; /* Adjust the width as needed */
  margin: 0 auto;
}

.entry-form label {
  display: block;
  margin-bottom: 8px;
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
