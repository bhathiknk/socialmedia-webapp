<template>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-zXMk3IuTbjgbGvFHS5JGtVStCN3yvCizV1/aBw9EYS6ztlM9R38Ap2+Jl2GJK5xM0C7uwZHQa1jn/Zpz65GCOQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/"
          icon="fa fa-arrow-left"
          label="Back to Note"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
  </div>

  <div class="resourceLibrary">
    <!-- First container -->
    <div class="container1">
      <div class="container-content">
        <button class="addModuleButton" @click="redirectToAddShortNote">Add Module</button>
        <div v-for="(module, index) in modules" :key="index" class="card" @click="selectModule(module.id)" :class="{ 'selected': selectedModuleId === module.id }">
          <p class="moduleName">{{ module.moduleName }}</p>
          <i class="fas fa-trash-alt delete-icon" @click="deleteModule(module.id)"></i>
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
      <button @click="saveQuestion" class="btn btn-primary">Save</button>
    </div>

    <!-- Third container -->
    <div class="container3">
      <div v-for="(record, index) in moduleRecords" :key="index" class="record">
        <p class="questionName">{{ index + 1 }}. {{ record.moduleQuestion }}</p>
        <p class="answer">★ {{ record.moduleAnswer }}</p>
        <i class="fas fa-trash-alt delete-icon" @click="deleteQuestion(record.id)"></i>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import CircularButton from "@/components/CircularButton.vue";

export default {
  components: {CircularButton},
  data() {
    return {
      modules: [],
      selectedModuleId: null,
      Question: '',
      Answer: '',
      moduleRecords: [],
    };
  },
  mounted() {
    this.fetchModules();
  },
  methods: {
    async fetchModules() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }
        const response = await axios.get("http://localhost:8080/modules", {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          this.modules = response.data || [];
          console.log("Received modules:", response.data);

        } else {
          console.error("Failed to fetch modules:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    },


    redirectToAddShortNote() {
      this.$router.push('/AddShortNote');
    },


    selectModule(id) {
      this.selectedModuleId = id;
      this.fetchModuleQuestions(id);
    },


    saveQuestion() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        // Ensure both moduleId and moduleName are available
        if (!this.selectedModuleId) {
          console.error("Module ID or Module Name is not available");
          return;
        }

        const data = {
          moduleId: this.selectedModuleId,
          moduleQuestion: this.Question,
          moduleAnswer: this.Answer
        };

        axios.post("http://localhost:8080/module-question-create", data, {
          headers: {
            Authorization: token,
          },
        }).then(response => {
          if (response.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Question and Answer saved successfully',
            });
            // Clear input fields after successful save
            this.Question = '';
            this.Answer = '';
            this.selectedModuleId = null; // Reset selected index
          } else {
            console.error("Failed to save question:", response.status, response.data);
          }
        }).catch(error => {
          console.error("Error saving question:", error);
          this.showErrorMessage();
        });
      } catch (error) {
        console.error("Error saving question:", error);
        this.showErrorMessage();
      }
    },

    async fetchModuleQuestions(moduleId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(`http://localhost:8080/module-questions/${moduleId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          this.moduleRecords = response.data || [];
          console.log("Received module questions:", response.data);
        } else {
          console.error("Failed to fetch module questions:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error fetching module questions:", error);
      }
    },

    async deleteQuestion(questionId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.delete(`http://localhost:8080/module-question/${questionId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          // Remove the deleted question from the moduleRecords array
          this.moduleRecords = this.moduleRecords.filter(record => record.id !== questionId);
          console.log("Question deleted successfully");
          Swal.fire(
              'Deleted!',
              'Your Answer has been deleted.',
              'success'
          );
        } else {
          console.error("Failed to delete question:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    },

    deleteModule(moduleId) {
      // Method to delete a module
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will Erase all Answers And not be able to recover this module!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("Token not found in localStorage");
              return;
            }

            axios.delete(`http://localhost:8080/modules/${moduleId}`, {
              headers: {
                Authorization: token,
              },
            }).then(response => {
              if (response.status === 200) {
                // Remove the deleted module from the modules array
                this.modules = this.modules.filter(module => module.id !== moduleId);
                console.log("Module deleted successfully");
                Swal.fire(
                    'Deleted!',
                    'Your module has been deleted.',
                    'success'
                );
              } else {
                console.error("Failed to delete module:", response.status, response.data);
                Swal.fire(
                    'Error!',
                    'Failed to delete module. Please try again.',
                    'error'
                );
              }
            }).catch(error => {
              console.error("Error deleting module:", error);
              Swal.fire(
                  'Error!',
                  'Failed to delete module. Please try again.',
                  'error'
              );
            });
          } catch (error) {
            console.error("Error deleting module:", error);
            Swal.fire(
                'Error!',
                'Failed to delete module. Please try again.',
                'error'
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
              'Cancelled',
              'Your module is safe :)',
              'error'
          );
        }
      });
    },
    showErrorMessage() {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save question. Please try again.',
      });
    },
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
  background: rgb(24, 15, 15);

}
.resourceLibrary {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
}

.container1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  position: relative;
  border-radius: 10px;
  padding: 20px;
  flex: 0.7;
  background-color: rgba(255, 255, 255, 0.01);
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  margin-left: 7%;
  margin-top: 10px;
  max-height: calc(100vh - 100px);

}

.container1 .container-content {
  max-height: 400px;
  overflow-y: auto;
  margin-left: 20px;
}
.addModuleButton {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;
  background-color: #3636ef;
  color: #fff;
  margin-right: 15px;
}

.container1 .card.selected {
  background-color: #3636ef;
  color: white;

}

.container2 {
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  flex: 1;
  background-color: rgba(255, 255, 255, 0.2);
  /* Set maximum height for container3 */
  max-height: calc(100vh - 100px); /* Adjust 100px according to your design */
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
  width: 50%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: #007bff;
  margin: 10px auto;

}

/* Optional: Style the Save Changes button on hover */
button:hover {
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
.container3 {
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 50px rgba(17, 15, 15, 0.2);
  flex: 1.2;
  background-color: rgba(255, 255, 255, 0.01);
  color: white;
  font-size: 2em;
  flex-direction: column;
  justify-content: flex-start; /* Align flex items to the start (left side) */
  align-items: flex-start;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
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
  color: #ffffff;
  font-size: 20px;
}

.answer {
  color: #ffffff;
  font-size: 16px;
}
.record {
  margin-bottom: 20px;
  text-align: left; /* Align text to the left within the record */
}
.delete-icon {
  cursor: pointer;
  color: red;
  margin-left: 10px; /* Adjust the margin as needed */
  font-size: 15px; /* Adjust the font size to make the icon smaller */
}

.small {
  font-size: 20px; /* Adjust the font size as needed */
}
</style>
