<template>
  <div>
    <div class="circular-button-container">
      <CircularButton
          @click="navigateToAddFeed"
          to="/ShortNote"
          icon="fa fa-arrow-left"
          label="Back to Note"
          style="margin-bottom: 10px; margin-top: 5px; margin-left: -10px"
      />
    </div>
  </div>
  <div class="body-form">
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
import CircularButton from "@/components/CircularButton.vue";

export default {
  components: {CircularButton},
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
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Module saved successfully',
        });
      } catch (error) {
        console.error('Error saving question:', error.response ? error.response.data : error);
        alert('Failed to save question. Please try again.');
      }
    },





  },
  mounted() {
  },
};
</script>

.circular-button-container {
position: fixed;
top: 0;
left: 0;
bottom: 0;
padding: 20px;
background: rgb(24, 15, 15);

}
<style scoped>
.body-form{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.entry-form {
  max-width: 800px;
  margin: 100px auto;

}

.body-form h1{
  color: white;
  padding: 30px;
}

.entry-form label {
  display: block;
  margin-bottom: 1px;
  color: white;
  padding: 20px;

}

.entry-form input,
.entry-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  box-shadow: 0 0 50px rgb(28, 17, 17);
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

.entry-form button:hover {
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
</style>
