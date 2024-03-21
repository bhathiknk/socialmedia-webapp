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

  width: 100px;
  height: 100px;
  margin-bottom: 5px !important;
  background: rgb(0, 47, 255);
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
  top: 100%; /* Place the top edge of the label at the center of the button */
  left: 50%; /* Place the left edge of the label at the center of the button */
  transform: translate(-50%, -50%); /* Translate the label to center both horizontally and vertically */
  text-align: center; /* Center-align the label text */
  white-space: nowrap; /* Prevent label text from wrapping */
  background-color: rgba(0, 0, 0, 0.8); /* Add a background color for better visibility */
  color: white; /* Text color for the label */
  padding: 10px; /* Add padding for better styling */
  border-radius: 5px;
  z-index: 1; /* Ensure label is on top of the button */
  max-width: 150%; /* Ensure label doesn't exceed the width of the button */
}


.circular-button:hover .label {
  display: block;

}

</style>