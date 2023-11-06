<!-- eslint-disable no-unused-vars -->
<template>
  <!--    middle textarea-->
  <div>
    <textarea class="textarea textarea-accent" placeholder="Bio" v-model="noteContent"></textarea>
    <div class="join join-vertical lg:join-horizontal">
      <button class="btn join-item" @click="submitNotes">Submit</button>
      <button class="btn join-item" @click="clearNotes">Clear</button>
    </div>
  </div>

  <div class="module-section">
    <!-- Modules section -->
    <ul class="menu bg-base-200 w-56 rounded-box module-box">
      <li class="menu-title-div">
        Modules
      </li>
      <li v-for="(module, index) in modules" :key="index">
        <a class="modules">{{ module.name }}</a>
      </li>
      <li>
        <a class="modules-fixed-anchor" @click="showModulePopup = true">
          <img class="add-btn-modules" src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1" />
        </a>
      </li>
    </ul>

    <!-- Add Module Popup -->
    <div class="popup" v-if="showModulePopup">
      <div class="popup-content">
        <h2>Add Module</h2>
        <input type="text" v-model="newModuleName" placeholder="enter the module name">
        <button class="btn-save" @click="addModule">Save</button>
        <button class="btn-cancel" @click="showModulePopup = false">Cancel</button>
      </div>
    </div>
  </div>

  <div class="questions-section">
    <!-- Questions section -->
    <ul class="menu bg-base-200 w-56 rounded-box questions-box">
      <li class="menu-title-div">Questions</li>
      <li v-for="(question, index) in questions" :key="index">
        <a class="modules">{{ question.name }}</a>
      </li>
      <li>
        <a class="modules-fixed-anchor" @click="showQuestionPopup = true">
          <img class="add-btn-questions" src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1" />
        </a>
      </li>
    </ul>

    <!-- Add Question Popup -->
    <div class="popup" v-if="showQuestionPopup">
      <div class="popup-content">
        <h2>Add Question</h2>
        <input type="text" v-model="newQuestionName" placeholder="enter the question">
        <button class="btn-save" @click="addQuestion">Save</button>
        <button class="btn-cancel" @click="showQuestionPopup = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  el: "#app",
  data() {
    return {
      noteContent: "Your notes here.....",
      modules: [
        { name: "" },
        { name: "" },
        // ...other initial modules...
      ],
      showModulePopup: false,
      newModuleName: "",
      questions: [
        { name: "" },
        { name: "" },
        // ...other initial questions...
      ],
      showQuestionPopup: false,
      newQuestionName: "",
    };
  },
  methods: {
    submitNotes() {
      // Assuming you have a textarea element within your template.
      var noteTextarea = document.querySelector(".textarea");
      //var noteContent = noteTextarea.value;

      // Send the noteContent to your server using an AJAX request or form submission

      // After successfully submitting the note, clear the textarea
      noteTextarea.value = "Your notes here.....";
    },
    clearNotes() {
      // Assuming you have a textarea element within your template.
      var noteTextarea = document.querySelector(".textarea");
      noteTextarea.value = "Your notes here.....";
    },
    addModule() {
      if (this.newModuleName) {
        // Save the module to the database (simulated by adding it to the modules array).
        this.modules.push({ name: this.newModuleName });

        // Clear the input and hide the popup
        this.newModuleName = "";
        this.showModulePopup = false;
      }
    },
    addQuestion() {
      if (this.newQuestionName) {
        // Save the question to the database (simulated by adding it to the questions array).
        this.questions.push({ name: this.newQuestionName });

        // Clear the input and hide the popup
        this.newQuestionName = "";
        this.showQuestionPopup = false;
      }
    },
  },
};

</script>


<style lang="scss" scoped>

//screen resolution set
@media (max-width: 680px) {


}

.textarea-accent {
  height: 41rem;
  width: 55rem;
  margin-top: 1.2rem;
  border: 3px solid black;
  overflow: auto;
  border-radius: 7px;
  position: fixed;
  right: 316px;
}

li {
  padding: 5px;
  list-style: none;
  font-size: 16px;
}

.module-box {
  height: 41rem;
  width: 20.5rem;
  position: absolute;
  bottom: 3rem;
  left: 5px;
  display: block;
  gap: 5px;
  text-align: left;
  background-color: #afc6a3;
  color: whitesmoke;
  padding: 20px;
  border: 3px solid black;
  overflow: auto;
  border-radius: 7px;
}

.menu-title-div {
  display: block;
  height: 35px;
  width: 100%;
  color: black;
  background-color: #778899;
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
  overflow: auto;
}

.questions-box {
  height: 41rem;
  width: 19rem;
  background-color: #6d99e3;
  text-align: left;
  position: absolute;
  right: 5px;
  bottom: 3rem;
  border: 3px solid black;
  padding: 20px;
  overflow: auto;
  border-radius: 7px;
}

.btn {
  display: inline-block;
  position: relative;
  top: 39.3rem;
  width: 16%;
  border-radius: 7px;
  padding: 1px;
  margin: 12px;
  background-color: #778899;
  color: black;
  font-weight: bold;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.add-btn-modules{
  position: fixed;
  top: 43px;
  height: 33px;
}

.add-btn-questions{
  position: fixed;
  top: 43px;
  height: 33px;
}

.btn-save{
  background-color: #778899;
  color: black;
  padding: 2px;
  margin: 10px;
  width: 70px;
  border-radius: 5px;
  border: 2px solid black;
}

.btn-cancel{
  background-color: #778899;
  color: black;
  padding: 2px;
  width: 70px;
  border-radius: 5px;
  border: 2px solid black;
}

h2{
  color: black;
}


</style>