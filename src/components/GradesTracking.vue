<template>

  <div id="calculator">
    <h1>GPA Calculator</h1>
    <form id="gpa-form">
      <div id="subject-list">
        <div class="subject-item">
          <input type="text" class="subject-name" placeholder="Subject Name" required>
          <input type="number" class="subject-mark" placeholder="Subject Mark" min="0" max="100" required>
        </div>
      </div>
      <button type="button" id="add-subject-button">Add Subject</button>
      <button type="button" id="calculate-button">Calculate GPA</button>
    </form>
    <div id="result"></div>
  </div>

</template>


<script setup>
</script>


<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}

#calculator {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
  border-radius: 3px;
}

.subject-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px; /* Add more spacing between textareas */
}

.subject-item input[type="text"],
.subject-item input[type="number"] {
  width: 45%;
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

</style>