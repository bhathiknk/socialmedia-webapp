<template>
    <div class="feed">
        <h1>This is an about Connection page. Under maintenance by @Vilochana Dont do any changes..</h1>



  <div class="all-body">
      <div class="grid-container">
        <div class="grid-item">Grid 1</div>
        <div class="grid-item">Grid 2</div>
        <div class="grid-item">Grid 3</div>
      </div>
  </div>



    </div>
</template>

<script>


export default {
    name: 'ConnectionView',
    components: {

    }
}
</script>



<style>


.all-body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
}

.grid-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 100vh; /* Adjust this if needed */
}

.grid-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
}

</style>

