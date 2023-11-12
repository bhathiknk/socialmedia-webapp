<template>
    <div class="feed">
        <h1>This is an about Connection page. Under maintenance by @Vilochana Dont do any changes..</h1>



  <div class="all-body">
    <div class="grid-container">
      <div class="grid-item">
                <div class="interests">
                  <div class="interests-head-tp"> INTERESTS</div>
                    <span class="badge bg-primary">Science</span>
                     <span class="badge bg-secondary">Robotics</span>
                    <span class="badge bg-success">Software</span>
                    <span class="badge bg-danger">Research</span>
                    <span class="badge bg-warning">Cyber</span>
                    <span class="badge bg-info">MachineLearning</span>
                    <span class="badge bg-light">Maths</span>
                    <span class="badge bg-dark">AI</span>
                </div>
      </div>

      <div class="grid-item profile-container">
        <div class="profile-dt"></div>
        <div class="profile-photo"></div>
        <div class="profile-details">
          <h2>Vilo123</h2>
          <p>Current Position: Software Engineer</p>
          <p>Email: Vilo@gmail.com</p>
          <div class="bio">
                Description Lorem pausm jash acasbcawgasc  ahwabach ahsuahwbaw cawuyhauwba scha9shas hduhyd dhdud dhdhaha  ha
          </div>
        </div>
      </div>
      <div class="grid-item friend-list">
        <div class="profile-friendList-head">
          <h2>Friend List</h2>
          <p>Friends: <span class="friend-count">52</span></p>
        </div>
          <input type="text" placeholder="Search friends" class="search-bar">
      </div>
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
  margin: 20px; /* Add margin for spacing */
  margin-bottom: 100px;
  margin-top: 20px;
}

.grid-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  margin: 20px; /* Add margin for spacing */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-photo {
  width: 150px; /* Adjust the width */
  height: 150px; /* Adjust the height */
  background-color: #bbb; /* Placeholder color */
  border-radius: 50%;
  margin-bottom: 10px;
  margin-top: 20px;
}

.friend-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.friend-count {
  font-weight: bold;
  color: #007bff; /* Adjust color as needed */
}

.search-bar {
  width: 80%;
  padding: 8px;
  margin-top: 10px;
}

.interests{
  max-width: 990px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.interests-head-tp{
  max-width: 990px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 20px;
  margin-bottom: 10px;
  color: #ffffff;
  background-color: #2d4fd5;

}

.badge {
  display: inline-block;
  padding: 10px; /* Adjust padding to increase the badge size */
  margin: 5px; /* Adjust margin to add space between badges */
  font-size: 14px; /* Adjust font size to increase the text size */
  border-radius: 5px; /* Adjust border-radius for rounded corners */
}

.badge:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition: 0.8s;

}

.bio{
  ax-width: 990px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  margin-top: 55px;
  margin-bottom: 20px;
  color: #000000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.profile-friendList-head{
  max-width: 990px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 20px;

}

</style>

