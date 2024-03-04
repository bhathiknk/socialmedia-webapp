<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    <div class="modal-container" @click.stop>
      <h3>Journal Details</h3>

      <div v-if="contentLoading">Loading content...</div>
      <div v-else>
        <div class="journal-details" v-html="formattedContent"></div>
      </div>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isOpen: Boolean,
    selectedEntry: Object,
  },
  data() {
    return {
      contentLoading: true,
      loadedContent: "",
    };
  },
  computed: {
    formattedContent() {
      // Directly use the loaded content as HTML
      return this.loadedContent;
    },
  },
  methods: {
    async fetchContent() {
      try {
        const response = await axios.get(
            `http://localhost:8080/journals/content/${this.selectedEntry.textFileName}`
        );

        if (response.status === 200) {
          this.loadedContent = response.data;
        } else {
          console.error(
              "Failed to fetch content:",
              response.status,
              response.data
          );
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        this.contentLoading = false;
      }
    },

    closeModal() {
      this.$emit("close");
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.contentLoading = true;
        this.fetchContent();
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
  max-height: 80vh; /* Set maximum height for scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
}

/* Add specific styles for formatting content sections if needed */
.journal-details {
  /* Add styling as needed */
}
</style>
