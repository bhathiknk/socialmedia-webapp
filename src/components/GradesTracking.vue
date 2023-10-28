<template>

  <div class="container">
    <div id="margin-top">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div class="col"></div>
        <div class="col">
          <!--
           <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          </button>
          -->
          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

            <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">Enter your Grading method</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div>
                you can add your University GPA Grading marks to here. Which means A = 90 / B = 75 / C = 55 /S = 35 Like That
              </div>

             <!-- <div class="dropdown mt-3"> drop down button  -->

                <!--
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                  Dropdown button
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                -->
                <div class="gpa-calculator-edit">
                  <h5>Add your GPA Calculator grades</h5>
                  <form id="gpa-form">
                    <div id="subject-list">
                      <div class="subject-item">
                        <div class="input-group mb-3">
                          <input type="text" class="mark" placeholder="A" required>
                          <input type="number" class="subject-mark" placeholder="Subject Mark" min="0" max="100" required>
                          <input type="text" class="mark" placeholder="B" required>
                          <input type="number" class="subject-mark" placeholder="Subject Mark" min="0" max="100" required>
                          <input type="text" class="mark" placeholder="C" required>
                          <input type="number" class="subject-mark" placeholder="Subject Mark" min="0" max="100" required>
                          <input type="text" class="mark" placeholder="S" required>
                          <input type="number" class="" placeholder="Subject Mark" min="0" max="100" required>
                        </div>
                      </div>
                    </div>
                    <button type="button" id="add-subject-button">Save</button>
                    <button type="button" id="calculate-button">Clear</button>
                  </form>
                </div>
              <!--  </div> Drop down button yaf end-->
            </div>
          </div>
        </div>

        <div class="col">
          <!--<div class="p-3 border bg-light">Reset</div>-->
          <button class="add-gpa-method-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            Add your GPA method
          </button>
        </div>
        <div class="col">
          <!--<button class="btn btn-primary">Add your GPA method 3</button>-->
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>

  <div id="scr-pg">
    <div id="calculator" class="scroll">
      <h3 id="cal-topic">GPA Calculator</h3>
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
      <div class="gpa-result-show" id="result" v-if="gpa !== null">Your GPA is: {{ gpa }}</div>
      <div class="gpa-result-show" id="result" v-else>Please add subjects and marks first.</div>
    </div>
  </div>
  <div id="DB-gpa-sub-data-show" class="DB-export-data-scroll">
    <h5 id="DB-gpa-sub-data-topic">Your Subjects</h5>
    <!-- Still testing this-->
    <table class="table table-hover">
      <thead>
      <tr class="tbl-topic">
        <th scope="col" class="table-primary">Subject Name</th>
        <th scope="col"  class="table-dark">Marks</th>
        <th scope="col"  class="table-danger">GPA</th>

      </tr>
      </thead>
      <tbody>
      <tr class="table-secondary">
        <th scope="row">Algo</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>

      </tr>
      <tr class="table-secondary">
        <th scope="row">Database management</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>

      </tr>
      <tr class="table-secondary">
        <th scope="row">FD Mathematics</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row">Advanced Statics</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row">Mobile Application Developement</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row">Machine Learning</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>

      </tr>
      <tr class="table-secondary">
        <th scope="row">IOT</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row">C#</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row">Robotics</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row">Artificial Intelegence</th>
        <td class="table-light">75</td>
        <td class="table-info">3.0</td>
      </tr>
      </tbody>
    </table>
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

//edit marsk


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
  width: 45%;

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
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;

}


#add-subject-button:hover{
  background-color: #3636ef;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
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
  margin-right: 100px;

}

#calculate-button:hover{
  background-color: #3636ef;
  transition: 0.8s;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

#result {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
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