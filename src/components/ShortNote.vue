<!-- eslint-disable no-unused-vars -->
<template>
  <html data-theme='cupcake'>
  <!--    middle textarea-->
  <div>
    <textarea class="textarea textarea-accent" placeholder="Bio" v-model="noteContent"></textarea>
    <div class="join join-vertical lg:join-horizontal">
      <button class="btn join-item" @click="submitNotes">Submit</button>
      <button class="btn join-item" @click="clearNotes">Clear</button>
    </div>
  </div>


      <ul class="menu bg-base-200 w-56 rounded-box module-box">
        <div class="menu-title-div">
          <li class="menu-title">Modules</li>
        </div>
        <li><a class="modules">Module 01</a></li>
        <li><a class="modules">Module 02</a></li>
        <li><a class="modules">Module 03</a></li>
        <li><a class="modules">Module 04</a></li>
        <li><a class="modules">Module 05</a></li>
        <li><a class="modules">Module 06</a></li>
        <li><a class="modules">Module 07</a></li>
        <li><a class="modules">Module 08</a></li>
        <li><a class="modules">Module 09</a></li>
        <li><a class="modules">Module 10</a></li>
        <li><a class="modules">Module 11</a></li>
        <li><a class="modules">Module 12</a></li>
        <li><a class="modules">Module 13</a></li>
        <li><a class="modules">Module 14</a></li>
        <li><a class="modules">Module 15</a></li>
      </ul>



      <ul class="menu bg-base-200 w-56 rounded-box questions-box">
        <div class="menu-title-div">
          <li class="menu-title">Questions</li>
        </div>
        <li><a class="modules">Question 01</a></li>
        <li><a class="modules">Question 02</a></li>
        <li><a class="modules">Question 03</a></li>
        <li><a class="modules">Question 04</a></li>
        <li><a class="modules">Question 05</a></li>
        <li><a class="modules">Question 06</a></li>
        <li><a class="modules">Question 06</a></li>
        <li><a class="modules">Question 07</a></li>
        <li><a class="modules">Question 08</a></li>
      </ul>

  </html>
</template>

<script>

export default {
  data() {
    return {
      noteContent: "Your notes here....."
    };
  },
  methods: {
    submitNotes() {
      var noteTextarea = document.querySelector(".textarea");
      var noteContent = noteTextarea.value;

      // Send the noteContent to your server using an AJAX request or form submission

      // After successfully submitting the note, clear the textarea
      // eslint-disable-next-line no-unused-vars
      noteContent = "Your notes here.....";
    },
    clearNotes() {
      var noteTextarea = document.querySelector(".textarea");
      noteTextarea.value = "Your notes here.....";
    }
  }
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


</style>