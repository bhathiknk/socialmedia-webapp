<template>
  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/AddJournal"
          icon="fa fa-plus"
          label="Add Feed"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>

    <div class="centered-container">
      <h2>Journal Entries</h2>
      <div class="card-container">
        <div v-for="entry in entries" :key="entry.id" class="journal-card" @click="openModal(entry)">
          <div class="card-header">
            <p>Created Date: {{ entry.date }}</p>
          </div>
          <div class="card-content">
            <p><strong>Mood:</strong> {{ entry.mood }}</p>
            <p><strong>Goals:</strong> {{ entry.goals }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Include the modal component -->
    <JournalDetailsModal
        :is-open="isModalOpen"
        :selected-entry="selectedModalEntry"
        @close="closeModal"
    ></JournalDetailsModal>
  </div>
</template>

<script>
import CircularButton from "@/components/CircularButton.vue";
import JournalDetailsModal from "@/components/DailyJournal/JournalDetailsModal.vue";
import axios from "axios";

export default {
  components: { CircularButton, JournalDetailsModal },
  data() {
    return {
      entries: [],
      isModalOpen: false,
      selectedModalEntry: null,
    };
  },
  methods: {
    navigateToAddFeed() {
      // Navigate to AddJournal or handle the button click as needed
    },

    async fetchUserJournalEntries() {
      try {
        const response = await axios.get(
            "http://localhost:8080/journals/user",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );

        if (response.status === 200) {
          this.entries = response.data;
        } else {
          console.error("Failed to fetch user journal entries:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error fetching user journal entries:", error);
      }
    },

    openModal(entry) {
      this.selectedModalEntry = entry;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.selectedModalEntry = null;
    },
  },
  mounted() {
    this.fetchUserJournalEntries();
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

.centered-container {
  max-width: 1200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.04); /* Container background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto; /* Horizontally center the container */
  margin-top: 20px; /* Adjust as needed */
  margin-bottom: 20px; /* Adjust as needed */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.journal-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  max-width: 300px;
  width: 100%;
  cursor: pointer; /* Add pointer cursor on hover */
}

.card-header {
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.card-content {
  padding: 10px;
}

/* Modal overlay */
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

/* Modal container */
.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
