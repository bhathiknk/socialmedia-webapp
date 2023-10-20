<template>

  <div class="container">
    <div id="margin-top">



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


<script>


</script>


<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}


h1 {
  text-align: center;
  color: #333;
}


</style>