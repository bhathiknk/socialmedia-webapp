<template>

  <div class="container">

    <div id="margin-top">

<!--nedd to add side panel for add Gpa methods from User-->
<h1>Testing issues in this web page</h1>
    </div>
  </div>

  <div id="scr-pg">
    <div id="calculator" class="scroll">
      <h1>GPA Calculator</h1>
      <form id="gpa-form">
        <div id="subject-list">
          <div class="subject-item" v-for="(subject, index) in subjects" :key="index">
            <input type="text" class="subject-name" v-model="subject.name" placeholder="Subject Name" required>
            <input type="number" class="subject-mark" v-model="subject.mark" placeholder="Subject Mark" min="0" max="100" required>
            <button   type="button" class="remove-subject-button"  @click="removeSubject(index)" >Remove  <i class="bi bi-trash"></i></button>
          </div>
        </div>
        <button type="button" id="add-subject-button" @click="addSubject">  Add Subject <i class="bi bi-plus-square"></i></button>
        <button type="button" id="calculate-button" @click="calculateGPA">Calculate GPA</button>
      </form>
      <div id="result" v-if="gpa !== null">Your GPA is: {{ gpa }}</div>
      <div id="result" v-else>Please add subjects and marks first.</div>
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
  max-width: 990px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-top: 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#calculator:hover{
  box-shadow: 0 0 5px rgba(37, 80, 166, 0.2);

}

h1 {
  text-align: center;
  color: #333;
}



</style>