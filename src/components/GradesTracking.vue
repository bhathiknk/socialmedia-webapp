<template>

  <div id="calculator" class="scroll">
    <h1>GPA Calculator</h1>
    <form id="gpa-form">
      <div id="subject-list">
        <div class="subject-item" v-for="(subject, index) in subjects" :key="index">
          <input type="text" class="subject-name" v-model="subject.name" placeholder="Subject Name" required>
          <input type="number" class="subject-mark" v-model="subject.mark" placeholder="Subject Mark" min="0" max="100" required>
          <button   type="button" class="remove-subject-button"  @click="removeSubject(index)" >Remove</button>
        </div>
      </div>
      <button type="button" id="add-subject-button" @click="addSubject">Add Subject</button>
      <button type="button" id="calculate-button" @click="calculateGPA">Calculate GPA</button>
    </form>
    <div id="result" v-if="gpa !== null">Your GPA is: {{ gpa }}</div>
    <div id="result" v-else>Please add subjects and marks first.</div>
  </div>
  
  <div id="text-grid" >
    <div class="alert alert-dismissible alert-primary">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>Under maintenance !</strong> <a href="#" class="alert-link">Changed a few things</a> @Vilochana Rajapaksha
    </div>
    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 5%;"></div>
    </div>
  </div>
</template>


<script setup>

import { ref } from 'vue';

const subjects = ref([{ name: '', mark: '' }]);
const gpa = ref(null);

const addSubject = () => {
  subjects.value.push({ name: '', mark: '' });
};

const removeSubject = (index) => {
  subjects.value.splice(index, 1);
};

const calculateGPA = () => {
  let totalCredits = 0;
  let totalGradePoints = 0;


  subjects.value.forEach((subject) => {
    const mark = parseFloat(subject.mark);
    const gradePoints = calculateGradePoints(mark);

    totalCredits += 1;
    totalGradePoints += gradePoints;
  });

  if (totalCredits > 0) {
    const calculatedGPA = (totalGradePoints / totalCredits).toFixed(2);
    gpa.value = ` ${calculatedGPA}`;
  } else {
    gpa.value = null;
  }
};

const calculateGradePoints = (mark) => {
  if (mark >= 90) return 4.0;
  else if (mark >= 85) return 3.7;
  else if (mark >= 80) return 3.3;
  else if (mark >= 75) return 3.0;
  else if (mark >= 65) return 2.7;
  else if (mark >= 55) return 2.3;
  else if (mark >= 45) return 2.0;
  else return 0.0;
};
</script>


<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}

#calculator {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-top: 200px;
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

.subject-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px; /* Add more spacing between textareas */
}

.subject-item input[type="text"],
.subject-item input[type="number"] {
  width: 42%;

}

#add-subject-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px; /* Add space between buttons */
  border-radius: 5px;
}


.remove-subject-button {
  background-color: #e7132c;
  color: #fff;
  border: none;
  padding: 4px 5px;
  cursor: pointer;
  margin-right: 10px; /* Add space between buttons */
  margin-left: 10px;
  border-radius: 5px;
  font-size: 12px;
}

.remove-subject-button:hover{
  background-color: #100f0f;
  transition: 0.8s;

}


#add-subject-button:hover{
  background-color: #3636ef;
  transition: 0.8s;
}

#calculate-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

#calculate-button:hover{
  background-color: #3636ef;
  transition: 0.8s;
}

#result {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}


.scroll {
  max-height: 600px; /*  maximum height for the scrollable area */
  overflow-y: scroll;
  scroll-behavior: smooth;
}

#text-grid{
  margin-top: 200px;
  margin-right: 500px;
  margin-left: 500px;
  margin-bottom: 200px;
}

</style>

