<template>
  <div class="feed">
    <h1>This is an about Connection page. Under maintenance by @Vilochana Dont do any changes..</h1>
    <div class="all-body">
      <div class="grid-container">
        <div class="grid-item profile-container">
          <div class="profile-dt"></div>
          <div class="main-profile-photo"></div>
          <div class="profile-details">
            <h2>Vilo123</h2>

            <div class="profile-friendList-head">
              <p>Friends: <span class="friend-count">52</span></p>
            </div>

            <div class="job-university">
              <p>Job: Software Engineer</p>
              <p>University: University of Plymouth</p>
            </div>

           <div class="mid-grid">
              <div class="scroll">

                <div class="friendlist-friend">
                  <div class="profile-card">
                    <div class="profile-photo"></div>
                    <div class="profile-details">
                      <h2>Bhathika</h2>
                      <div class="job-university">
                        <p>Job: Software Engineer</p>
                        <p>University: University of Plymouth</p>
                      </div>
                      <button class="add-button">Friend</button>
                    </div>
                  </div>
                </div>

                <div class="friendlist-friend">
                  <div class="profile-card">
                    <div class="profile-photo"></div>
                    <div class="profile-details">
                      <h2>Dewnith</h2>
                      <div class="job-university">
                        <p>Job: Software Engineer</p>
                        <p>University: University of Plymouth</p>
                      </div>
                      <button class="add-button">Friend</button>
                    </div>
                  </div>
                </div>

                <div class="friendlist-friend">
                  <div class="profile-card">
                    <div class="profile-photo"></div>
                    <div class="profile-details">
                      <h2>Ranidhu</h2>
                      <div class="job-university">
                        <p>Job: Software Engineer</p>
                        <p>University: University of Plymouth</p>
                      </div>
                      <button class="add-button">Friend</button>
                    </div>
                  </div>
                </div>

                <div class="friendlist-friend">
                  <div class="profile-card">
                    <div class="profile-photo"></div>
                    <div class="profile-details">
                      <h2>Tharaka</h2>
                      <div class="job-university">
                        <p>Job: Software Engineer</p>
                        <p>University: University of Plymouth</p>
                      </div>
                      <button class="add-button">Friend</button>
                    </div>
                  </div>
                </div>
              </div>
           </div>
          </div>
        </div>
        <div class="grid-item friend-list">
          <div class="profile-friendList-head">
            <h2 class="search-friend">Search</h2>
            <!--<p>Friends: <span class="friend-count">59</span></p>-->
          </div>
          <input type="text" placeholder="Search friends" class="search-bar">
          <h2 class="suggest-friend">Suggest</h2>
          <div class="friend-list-container">
          <div class="friendlist-friend">
            <div class="profile-card">
              <div class="profile-photo"></div>
              <div class="profile-details">
                <h2>Bhathika</h2>
                <div class="job-university">
                  <p>Job: Developer</p>
                  <p>University: University of Plymouth</p>
                </div>
                <button class="add-button">Add</button>
              </div>
            </div>
          </div>

          <div class="friendlist-friend">
            <div class="profile-card">
              <div class="profile-photo"></div>
              <div class="profile-details">
                <h2>Dewnith</h2>
                <div class="job-university">
                  <p>Job: Developer</p>
                  <p>University: University of Plymouth</p>
                </div>
                <button class="add-button">Add</button>
              </div>
            </div>
          </div>

          <div class="friendlist-friend">
            <div class="profile-card">
              <div class="profile-photo"></div>
              <div class="profile-details">
                <h2>Ranidhu</h2>
                <div class="job-university">
                  <p>Job: Developer</p>
                  <p>University: University of Plymouth</p>
                </div>
                <button class="add-button">Add</button>
              </div>
            </div>
          </div>

          <div class="friendlist-friend">
            <div class="profile-card">
              <div class="profile-photo"></div>
              <div class="profile-details">
                <h2>Tharaka</h2>
                <div class="job-university">
                  <p>Job: Developer</p>
                  <p>University: University of Plymouth</p>
                </div>
                <button class="add-button">Add</button>
              </div>
            </div>
          </div>
          </div>

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
  height: 100vh;
  margin: 20px;
  margin-bottom: 100px;
  margin-top: 20px;
}

.grid-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-profile-photo {
  width: 200px;
  height: 200px;
  background-color: #bbb;
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
  color: #007bff;
}

.search-bar {
  width: 80%;
  padding: 8px;
  margin-top: 10px;
}

.job-university {
  text-align: center;
  margin-bottom: 10px;
}

.friendlist-friend {
  max-width: 990px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #000000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.profile-friendList-head {
  max-width: 990px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 20px;
}


.scroll {
  max-height: 100px; /*  maximum height for the scrollable area (default 500px) */
  overflow-y: scroll;
  scroll-behavior: smooth;

}


.search-friend{
  max-width: 990px;
  width: 790px;
  margin: 0 auto;
  padding: 15px;
  border-radius: 5px;
  margin-top: 2px;
  margin-bottom: 5px;
  background-color: rgb(45, 79, 213);
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

}

.suggest-friend{
  max-width: 990px;
  width: 790px;
  margin: 0 auto;
  padding: 1px;
  border-radius: 5px;
  margin-top: 2px;
  margin-bottom: 5px;
  background-color: rgb(100, 122, 204);
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.mid-grid{
  flex: 1;
  padding: 20px; /* Adjust the padding as needed */
  border-radius: 5px;
  width: auto;
  margin-top: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}



.friend-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.friend-list-container {
  max-height: 1000px; /* Adjust the maximum height as needed */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #007bff #f2f2f2;
}

.friend-list-container::-webkit-scrollbar {
  width: 9px;
}

.friend-list-container::-webkit-scrollbar-thumb {
  background-color: #007bff;
}

.friend-list-container::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}


.profile-card {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  max-width: 990px;
  width: 800px;


}

.profile-card .profile-photo {
  width: 150px;
  height: 150px;
  background-color: #bbb;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-card .profile-details {
  flex-grow: 1;
}

.profile-card .job-university {
  margin-bottom: 10px;
}

.profile-card .add-button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

}

.profile-card .add-button:hover {
  transition: 0.8s;
  background-color: #dc3545;
  color: #f2f2f2;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

}


/* Media Query for Tablet */
@media only screen and (max-width: 768px) {
  .grid-container {
    flex-direction: column;
    align-items: center;
  }

  .grid-item {
    width: 100%;
    margin: 10px 0;
  }

  .mid-grid,
  .friend-list {
    width: 100%;
  }

  .profile-container {
    text-align: center;
  }

  .main-profile-photo {
    margin-top: 10px;
  }

  .search-bar {
    width: 100%;
  }

  .friendlist-friend {
    width: 100%;
  }

  .profile-card {
    width: 100%;
  }

  .profile-card .profile-photo {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  .profile-card .profile-details {
    flex-grow: 1;
  }

  .search-friend,
  .suggest-friend {
    width: 100%;
  }
}

/* Media Query for Mobile */
@media only screen and (max-width: 480px) {
  .main-profile-photo {
    width: 150px;
    height: 150px;
  }

  .profile-card .profile-photo {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }

  .profile-card {
    width: 100%;
  }

  .search-friend,
  .suggest-friend {
    width: 100%;
    margin: 0 auto;
  }
}





</style>

