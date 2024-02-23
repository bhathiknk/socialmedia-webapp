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
              {{ friend.userName }}
            </li>
          </ul>
        </div>
      </div>


      <!-- Middle Container: Friends -->
      <div class="col-md-4">
        <div class="friends-container">
          <!-- Display Friends -->
          <div v-if="friends.length > 0">
            <h3>Friends</h3>
            <ul>
              <li v-for="friend in friends" :key="friend.id">
                {{ friend.userName }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right Container: Pending Connection Requests -->
      <div class="col-md-4">
        <div class="pending-requests-container">
          <!-- Display Pending Connection Requests -->
          <div v-if="pendingConnections.length > 0">
            <h3>Pending Requests</h3>
            <ul>
              <li v-for="request in pendingConnections" :key="request.id">
                {{ request.sender.userName }} wants to connect
                <button @click="acceptConnection(request)">Accept</button>
                <button @click="rejectConnection(request)">Reject</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
/* eslint-disable */
export default {
  data() {
    return {
      pendingConnections: [],
      friends: [],
      friendUsername: '',
      suggestedFriends: [],
    };
  },
  methods: {
    fetchSuggestedFriends() {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('User token not found');
        return;
      }

      axios.get(`http://localhost:8080/user/suggested-friends`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
          .then(response => {
            console.log('Fetched suggested friends:', response.data);
            this.suggestedFriends = response.data;
          })
          .catch(error => {
            console.error('Error fetching suggested friends:', error);
          });
    },

  },
  mounted() {
    // Fetch initial connections when the component is mounted
    this.fetchSuggestedFriends();
  },
};
</script>

<style scoped>
.connections-container {
  margin-top: 20px;
  height: 100vh; /* Make the container fill the entire viewport height */
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
  height: 100%; /* Make each container fill the entire height of its parent */
}

.friends-container h2,
.pending-requests-container h3,
.add-friend-container h3 {
  color: #333; /* Change heading text color */
}

.friends-container ul,
.pending-requests-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.friends-container li,
.pending-requests-container li {
  margin-bottom: 10px;
}

.connections-container {
  margin-top: 20px;
  height: 100vh; /* Make the container fill the entire viewport height */
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
  color: #333; /* Change heading text color */
}

.search-friend-section input {
  width: 70%; /* Adjust width as needed */
  margin-right: 10px;
}

.search-friend-section button {
  width: 28%; /* Adjust width as needed */
}
</style>
