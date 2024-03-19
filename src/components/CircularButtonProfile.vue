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
      return this.icon ? this.icon : '';
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

  width: 190px;
  height: 190px;
  margin-top: 60px;
  margin-bottom: 60px !important;
  background-color: lightslategrey;
  border-radius: 10%;
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
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
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
  font-size: 48px;
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
  top: -40px; /* Adjust the value to position the label on top of the button */
  left: 50%; /* Position the label horizontally at the center */
  transform: translateX(-50%); /* Center the label horizontally */
  text-align: left; /* Align label text to the left */
  display: none;
  white-space: nowrap; /* Prevent label text from wrapping */
  background-color: rgba(0, 0, 0, 0.8); /* Add a background color for better visibility */
  color: white; /* Text color for the label */
  padding: 20px; /* Add some padding for better styling */
  border-radius: 10px;
  z-index: 1; /* Ensure label is on top of the button */
}

.circular-button:hover .label {
  display: block;

}

</style>