<template>
  <div class="connections-container">
    <!-- Search Friend Section -->
    <div class="search-friend-section">
      <h3>Search Friends</h3>
      <input v-model="searchFriendQuery" placeholder="Search friends by username" />
      <button @click="searchFriend">Search</button>
    </div>

    <div class="row">
      <!-- Left Container: Suggested Friends -->
      <div class="col-md-4">
        <div class="suggested-friends-container">
          <h3>Suggested Friends</h3>
          <ul>
            <li v-for="friend in suggestedFriends" :key="friend.id">
              <div class="user-card">
                <div class="profile-image-container">
                  <img :src="getProfileImageUrl(friend.profileImage)" alt="Profile Image" class="profile-image" />
                </div>
                <div class="user-info">
                  <h4>{{ friend.userName }}</h4>
                </div>
                <button @click="sendFriendRequest(friend.id)" class="add-friend-button">Add Friend</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Middle Container: Friends -->
      <div class="col-md-4">
        <!-- Similar to suggested friends, display friends with profile images -->
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
        <!-- Display Pending Connection Requests with profile images -->
        <div class="pending-requests-container">
          <h3>Pending Requests</h3>
          <ul>
            <li v-for="request in pendingConnections" :key="request.id">
              <div class="user-card">
                <div class="profile-image-container">
                  <img :src="getProfileImageUrl(request.sender.profileImage)" alt="Profile Image" class="profile-image" />
                </div>
                <div class="user-info">
                  <h4>{{ request.sender.userName }}</h4>
                  <button @click="acceptConnection(request)">Accept</button>
                  <button @click="rejectConnection(request)">Reject</button>
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
      return `http://localhost:8080/static/images/${profileImage}`;
    },

    sendFriendRequest(friendId) {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.post(`http://localhost:8080/connection/send-friend-request/${friendId}`, null, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Friend request sent successfully:', response.data);
            // Optionally, you can update the UI to reflect the request is pending
          })
          .catch(error => {
            console.error('Error sending friend request:', error);
          });
    },

  },
  mounted() {
    // Fetch initial connections when the component is mounted
    this.fetchSuggestedFriendsDetails();
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
</style>