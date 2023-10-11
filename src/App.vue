<template>
    <nav class="custom-navbar">
        <div class="navbar-content">
            <router-link to="/">Profile</router-link> |
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
    background-color: lightslategrey;
    color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
}

.navbar-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
}

.custom-navbar a {
    font-weight: bold;
    color: black;
    text-decoration: none;
}

.custom-navbar a.router-link-exact-active {
    color: white;
}

</style>

<script setup>
</script>
