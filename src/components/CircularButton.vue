<template>
    <router-link :to="to" class="circular-button">
        <div class="button-content">
            {{ label }}
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        to: String, // Route to navigate to
        label: String, // Button label
    },
};
</script>

<style scoped>
.circular-button {
    width: 80px;
    height: 80px;
    background-color: lightslategrey;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: black;
    cursor: pointer;
    transition: transform 0.3s; /* Add a transition for the transform property */
}

.circular-button:hover {
    transform: scale(1.2); /* Increase the size on hover */
}
.button-content {
    font-size: 13px; /* Adjust the font size as needed */
    font-weight: bold;
}
</style>
