<template>
  <html data-theme='cupcake'>

  <!--    middle textarea-->
  <textarea class="textarea textarea-accent" placeholder="Bio">Your notes here.....</textarea>

  <ul class="menu bg-base-200 w-56 rounded-box" data-theme="dark">
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
    <li><a class="modules">Module 03</a></li>
    <li><a class="modules">Module 14</a></li>
    <li><a class="modules">Module 15</a></li>
  </ul>

  </html>
</template>

<script setup>


</script>

<style lang="scss" scoped>

//screen resolution set
@media (max-width: 680px) {


}

.textarea-accent {
  height: 40.5rem;
  width: 55rem;
  margin-top: 1.2rem;
  margin-left: 2rem;
  border: solid black;
  border-radius: 2px;
  overflow: auto;

}
li{
  padding: 5px;
  list-style: none;
  font-size: 16px;
}

.rounded-box{
  height: 40.5rem;
  width: 20.5rem;
  position: fixed;
  bottom: 56.2px;
  left: 8px;
  display: block;
  gap: 5px;
  text-align: left;
  background-color: #afc6a3;
  color: whitesmoke;
  padding: 20px;
  border: 3px solid black;

}

.menu-title-div{
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

</style>