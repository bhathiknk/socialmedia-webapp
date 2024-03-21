<template>
    <router-link :to="to" class="circular-button" @mouseover="showLabel = true" @mouseleave="showLabel = false">
        <div class="button-content">
            <i class="button-icon" :class="iconClass"></i>
        </div>
        <div class="label" v-if="showLabel">{{ label }}</div>
    </router-link>
</template>


<script>
export default {
    props: {
        to: String, // Route to navigate to
        label: String, // Button label
        icon: String,  // Icon class name
    },
    data() {
        return {
            showLabel: false,
        };
    },
    computed: {
        iconClass() {
            return this.icon ? this.icon : ''; // Use the provided icon class, if available
        },
    },
    methods: {
        toggleLabelVisibility() {
            this.showLabel = !this.showLabel;
        },
    },
};
</script>

<style scoped>
.circular-button {
    width: 80px;
    height: 80px;
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(90,115,255,1) 82%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: black;
    cursor: pointer;
    transition: transform 0.3s;
    position: relative; /* Add position relative for label positioning */
}

.circular-button:hover {
    transform: scale(1.2);
}

.button-content {
    font-size: 13px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button-icon {
    font-size: 24px; /* Adjust the icon size as needed */
}

.label {
    display: none; /* Initially hide the label */
}

.circular-button:hover .label {
    display: block; /* Show the label on hover */
    margin-top: 5px; /* Adjust margin as needed */
}

.label {
  position: absolute;
  top: 0;
  right: -135px; /* Adjust the value to control the label's position */
  width: 140px; /* Adjust the width of the label as needed */
  text-align: left; /* Align label text to the left */
  white-space: nowrap; /* Prevent label text from wrapping */
  background-color: rgb(255, 255, 255); /* Add a background color for better visibility */
  color: #000000; /* Text color for the label */
  padding: 5px; /* Add some padding for better styling */
  border-top-left-radius: 5px; /* Round the top-left corner */
  border-bottom-left-radius: 5px; /* Round the bottom-left corner */
  border-top-right-radius: 5px; /* Round the top-left corner */
  border-bottom-right-radius: 5px; /* Round the bottom-left corner */
  z-index: 2; /* Ensure the label is on top of the button */
}

.circular-button:hover .label {
  display: block;
}
</style>
