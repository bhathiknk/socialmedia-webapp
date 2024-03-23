<template>
  <nav class="custom-navbar">
    <div class="navbar-content">
      <router-link to="/profile">Tools</router-link> |
      <router-link to="/feed">Feed</router-link> |
      <router-link to="/connection">Connection</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.custom-navbar {
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(90,115,255,1) 82%);
  color: white;
  position: fixed;
  bottom: 0; /* Fixed to the top */
  left: 0;
  right: 0;
  padding: 15px 20px; /* Adjusted padding */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Ensures it's above other elements */
}

.navbar-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.custom-navbar a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.custom-navbar a.router-link-exact-active {
  color: #002ac4;
}
</style>
