
<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">


  <div class="container">
    <div id="margin-top">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div class="col"></div>
        <div class="col"></div>
      </div>
    </div>
  </div>

  <div id="scr-pg">
    <div id="calculator" class="scroll">
      <h3 id="cal-topic">GPA Calculator</h3>
      <div class="gpa-result-show" id="result">Please add subjects and marks first.</div>
      <form id="gpa-form">
        <div id="subject-list">
          <div class="subject-item" v-for="(subject, index) in subjects" :key="index">
            <input type="text" class="subject-name" v-model="subject.name" placeholder="Subject Name" required>
            <input type="number" class="subject-mark" v-model="subject.mark" placeholder="Subject Mark" min="0" max="100" required>
            <span v-if="subject.mark > 100" style="color: red;">Marks cannot exceed 100</span>
          </div>
        </div>
        <button type="button" id="add-subject-button" @click="submitSubjectData">Save</button>
      </form>
    </div>
  </div>

  <div id="DB-gpa-sub-data-show" class="DB-export-data-scroll">
    <h5 id="DB-gpa-sub-data-topic">Your Subjects</h5>
    <div class="gpa-result-show" id="result" v-if="finalGPA !== null">Your final Calculated GPA: {{ finalGPA.toFixed(2) }}</div>
    <div class="gpa-result-show" id="result" v-else>No data available.</div>

    <table class="table table-hover">
      <thead>
      <tr class="tbl-topic">
        <th scope="col" class="table-primary">Subject Name</th>
        <th scope="col" class="table-dark">Marks</th>
        <th scope="col" class="table-danger">GPA</th>
        <th scope="col" class="table-info">Actions</th> <!-- New column for delete icon -->
      </tr>
      </thead>
      <tbody>
      <tr class="table-secondary" v-for="(subjectDB, index) in subjectsDB" :key="index">
        <th scope="row">{{ subjectDB.name }}</th>
        <td class="table-light">{{ subjectDB.mark }}</td>
        <td class="table-info">{{ subjectDB.gpa }}</td>
        <td class="table-info"><button @click="deleteSubject(index)"><i class="fas fa-trash-alt"></i></button></td> <!-- Delete icon -->
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

export default {
  setup() {
    const subjects = ref([{ name: '', mark: '' }]);
    const gpa = ref(null);
    const subjectsDB = ref([]);
    const finalGPA = ref(null);

    const fetchSubjectsDataWithFinalGPA = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/subjects/allWithFinalGPA', {
          headers: {
            Authorization: token,
          },
        });
        subjectsDB.value = response.data.subjects;
        finalGPA.value = response.data.finalGPA;
      } catch (error) {
        console.error('Failed to fetch subjects data with final GPA', error);
        // Handle error, show message, etc.
      }
    };

    const submitSubjectData = async () => {
      const validSubjects = subjects.value.filter((subject) => subject.name.trim() !== '' && subject.mark !== '');

      const invalidMarks = validSubjects.some((subject) => subject.mark > 100);

      if (invalidMarks) {
        alert('Marks cannot exceed 100. Please correct the marks.');
        return;
      }

      if (validSubjects.length > 0) {
        const token = localStorage.getItem('token');
        try {
          for (const subject of validSubjects) {
            const subjectData = {
              name: subject.name,
              mark: subject.mark,
            };

            await axios.post('http://localhost:8080/api/subjects/save', subjectData, {
              headers: {
                Authorization: token,
              },
            });
          }

          validSubjects.forEach((subject) => {
            subject.name = '';
            subject.mark = '';
          });
          // After saving the subjects, fetch the data again
          fetchSubjectsData();

          showSuccessMessage();
        } catch (error) {
          console.error('Failed to save subject data', error);
          // Handle error, show message, etc.
        }
      }
    };

    const showSuccessMessage = () => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Subject details added successfully',
      });
    };

    const fetchSubjectsData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/subjects/all', {
          headers: {
            Authorization: token,
          },
        });
        subjectsDB.value = response.data;
      } catch (error) {
        console.error('Failed to fetch subjects data', error);
        // Handle error, show message, etc.
      }
    };

    const deleteSubject = async (index) => {
      const subjectIdToDelete = subjectsDB.value[index].id; // Assuming each subject has an ID
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:8080/api/subjects/delete/${subjectIdToDelete}`, {
          headers: {
            Authorization: token,
          },
        });
        // After successfully deleting, fetch the updated data
        fetchSubjectsData();
        showDeleteSuccessMessage();
      } catch (error) {
        console.error('Failed to delete subject', error);
        // Handle error, show message, etc.
      }
    };

    const showDeleteSuccessMessage = () => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Subject deleted successfully',
      });
    };

    onMounted(() => {
      fetchSubjectsData();
      fetchSubjectsDataWithFinalGPA();
    });

    return {
      subjects,
      gpa,
      subjectsDB,
      submitSubjectData,
      deleteSubject,
      finalGPA,
    };
  },
};
</script>

<style>

body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}

#cal-topic{
  max-width: 990px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: rgb(100, 122, 204);
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#canva-h5-topic{
  max-width: 990px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: rgb(25, 67, 222);
  color: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

#canva-description{
  max-width: 990px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: rgb(179, 190, 234);
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#canva-description:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}
#calculator {
  max-width: 990px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-top: 80px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#calculator:hover{
  box-shadow: 0 0 5px rgba(37, 80, 166, 0.2);
}

h1 {
  text-align: center;
  color: #333;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="text"]:hover{
  border: 1px solid #6d99e3;
}
input[type="number"]:hover{
  border: 1px solid #6d99e3;
}

.subject-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px; /* Add more spacing between textareas */
}

.subject-item input[type="text"],
.subject-item input[type="number"] {
  width: 50%;
  margin-right: 10px;

}

#add-subject-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 5px;
}


#add-subject-button:hover{
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;
}


#result {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

.scroll {
  max-height: 400px; /*  maximum height for the scrollable area (default 500px) */
  overflow-y: scroll;
  scroll-behavior: smooth;
}


#margin-top{
  padding-top: 80px;
}

.gpa-calculator-edit{
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 80px;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

/*showing Gpa result Output*/
.gpa-result-show{
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 80px;
  box-shadow: 0 0 5px rgba(37, 80, 166, 0.2);

}

h5{
  margin-left: 55px;
  margin-right: 20px;
}
.add-gpa-method-btn{
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px; /* Add space between buttons */
  border-radius: 5px;
}

.add-gpa-method-btn:hover{
  background-color: #3636ef;
  transition: 0.8s;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

#DB-gpa-sub-data-show{
  max-width: 990px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 200px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.DB-export-data-scroll{
  max-height: 310px; /*  maximum height for the scrollable area */
  overflow-y: scroll;
  scroll-behavior: smooth;
}

#DB-gpa-sub-data-topic{
  max-width: 990px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: rgb(45, 79, 213);
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

</style>
