<template>
  <div class="connections-container">
    <!-- Search Friend Section -->
    <!-- Inside your Vue component template -->

    <div class="search-friend-section">
      <h3>Sent Friend Requests</h3>
      <!-- Display profile images as circles -->
      <div class="sender-profile-images-container">
        <div v-for="(image, index) in pendingConnectionImages" :key="index" class="sender-profile-image-circle">
          <img :src="getProfileImageUrl(image)" alt="Profile Image" class="profile-image" />
        </div>
      </div>
    </div>




    <div class="row">
      <!-- Left Container: Suggested Friends -->
      <div class="col-md-4">
        <div class="suggested-friends-container">
          <h3>
            Suggested Friends
          </h3>
          <ul>
            <li v-for="friend in suggestedFriends" :key="friend.id">
              <div class="user-card">
                <div class="profile-image-container">
                  <img :src="getProfileImageUrl(friend.profileImage)" alt="Profile Image" class="profile-image" />
                </div>
                <div class="user-info">
                  <h4>{{ friend.userName }}</h4>
                </div>
                <button @click="sendFriendRequest(friend)" class="add-friend-button">Add Friend</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Middle Container: Friends -->
      <div class="col-md-4">
        <div class="friends-container">
          <h3>Friends</h3>
          <ul>
            <li v-for="friend in friends" :key="friend.id">
              <div class="user-card">
                <div class="profile-image-container">
                  <img :src="getProfileImageUrl(friend.profileImage)" alt="Profile Image" class="profile-image" />
                </div>
                <div class="user-info">
                  <h4>{{ friend.userName }}</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Container: Pending Connection Requests -->
      <div class="col-md-4">
        <div class="pending-requests-container">
          <h3>Pending Requests</h3>
          <ul>
            <li v-for="request in pendingConnections" :key="request.id">
              <div class="user-card">
                <div class="profile-image-container">
                  <img :src="getProfileImageUrl(request.profileImage)" alt="Profile Image" class="profile-image" />
                </div>
                <div class="user-info">
                  <h4>{{ request.userName }}</h4>
                  <button @click="acceptConnection(request)" class="add-friend-button accept-button">Accept</button>
                  <button @click="rejectConnection(request)" class="add-friend-button reject-button">Reject</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchFriendQuery: '',
      suggestedFriends: [],
      friends: [],
      pendingConnections: [],
      sentFriendRequests: [],
      pendingConnectionImages: [],
    };
  },
  methods: {
    fetchSuggestedFriendsDetails() {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.get(`http://localhost:8080/connection/suggested-friends-details`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Fetched suggested friends details:', response.data);
            this.suggestedFriends = response.data;
          })
          .catch(error => {
            console.error('Error fetching suggested friends details:', error);
          });
    },
    getProfileImageUrl(profileImage) {
      // Adjust the URL based on your backend configuration
      return profileImage ? `http://localhost:8080/static/images/${profileImage}` : ''; // Updated to handle undefined profileImage
    },

    sendFriendRequest(friend) {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.post(`http://localhost:8080/connection/send-friend-request/${friend.id}`, null, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Friend request sent successfully:', response.data);

            // Increment the friend request count for the logged-in user
            this.sentFriendRequests.push(response.data);

            // Remove the friend from suggestedFriends
            const index = this.suggestedFriends.indexOf(friend);
            if (index !== -1) {
              this.suggestedFriends.splice(index, 1);
            }

            // Show modal with friend request details
            this.selectedFriend = response.data;
          })
          .catch(error => {
            console.error('Error sending friend request:', error);
          });
    },



    fetchPendingConnectionRequests() {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.get(`http://localhost:8080/connection/pending-connection-requests`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Fetched pending connection requests:', response.data);
            this.pendingConnections = response.data;
          })
          .catch(error => {
            console.error('Error fetching pending connection requests:', error);
          });
    },


    acceptConnection(request) {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.post(`http://localhost:8080/connection/accept-connection/${request.id}`, null, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Connection accepted successfully:', response.data);

            // Remove the accepted request from pendingConnections
            const index = this.pendingConnections.indexOf(request);
            if (index !== -1) {
              this.pendingConnections.splice(index, 1);
            }

            // Add the connection to friends for the receiver
            this.friends.push(response.data);

            // Fetch and update the sender's friend list
            this.fetchFriendsForSender();

          })
          .catch(error => {
            console.error('Error accepting connection:', error);
          });
    },

    fetchFriendsForSender() {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.get(`http://localhost:8080/connection/friends`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Fetched friends for sender:', response.data);
            this.sentFriendRequests = response.data;
          })
          .catch(error => {
            console.error('Error fetching friends for sender:', error);
          });
    },



    fetchFriends() {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.get(`http://localhost:8080/connection/friends`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Fetched friends:', response.data);
            this.friends = response.data;
          })
          .catch(error => {
            console.error('Error fetching friends:', error);
          });
    },


    fetchPendingConnectionRequestsImages() {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.get(`http://localhost:8080/connection/pending-connection-requests-images`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Fetched pending connection requests images:', response.data);
            this.pendingConnectionImages = response.data;
          })
          .catch(error => {
            console.error('Error fetching pending connection requests images:', error);
          });
    },

  },
  mounted() {
    // Fetch initial connections when the component is mounted
    this.fetchSuggestedFriendsDetails();
    this.fetchPendingConnectionRequests();
    this.fetchFriends();
    this.fetchPendingConnectionRequestsImages();
    // You may also want to fetch friends and pendingConnections here if needed
  },
};
</script>

<style scoped>
.connections-container {
  margin-top: 20px;
  height: 100vh;
}

.suggested-friends-container,
.friends-container,
.pending-requests-container,
.add-friend-container {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
  height: 100%;
}

.suggested-friends-container h3,
.friends-container h2,
.pending-requests-container h3,
.add-friend-container h3 {
  color: #333;
}

.suggested-friends-container ul,
.friends-container ul,
.pending-requests-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggested-friends-container li,
.friends-container li,
.pending-requests-container li {
  margin-bottom: 10px;
}

.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Align items to the start and end */
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.user-card:hover {
  transform: scale(1.05); /* Scale the card slightly on hover for an interactive effect */
}

.profile-image-container {
  text-align: center;
}

.profile-image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  margin-right: 10px;
}

.user-info {
  flex-grow: 1;
}

.search-friend-section {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
}

.search-friend-section h3 {
  color: #333;
}

.search-friend-section input {
  width: 70%;
  margin-right: 10px;
}

.search-friend-section button {
  width: 28%;
}

.user-name-container {
  display: flex;
  align-items: center;
}

.add-friend-button {
  background-color: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-friend-button:hover {
  background-color: #45a049;
}

.circle-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  cursor: pointer;
}

/* Inside your Vue component style */

.profile-image-circle {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-image-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Inside your Vue component style */

.sender-profile-images-container {
  display: flex;
  align-items: center; /* Align items vertically in the center */
}

.sender-profile-image-circle {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 80%;
  margin-right: 10px;
}

.sender-profile-image-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Add the following styles to your existing style block */

.pending-requests-container .user-card button {
  margin-top: 8px;
}

.pending-requests-container .user-card button.accept-button,
.pending-requests-container .user-card button.reject-button {
  background-color: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px;
}

.pending-requests-container .user-card button.accept-button {
  background-color: #4caf50;
}

.pending-requests-container .user-card button.reject-button {
  background-color: #e74c3c;
}

</style>
