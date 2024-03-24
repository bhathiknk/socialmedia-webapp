<template>
  <div class="container">
    <div class="grid">
      <div class="banner">
        <button>Continue</button>
        <div class="description">
          <p>This is your description text.</p>
          <img src="@/assets/banner.jpg" alt="Description Image">
        </div>
      </div>
      <div class="card mb-3">
        <h3 class="card-header">Card header</h3>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <h6 class="card-subtitle text-muted">Support card subtitle</h6>
        </div>
        <img src="@/assets/banner.jpg" alt="Card Image" width="318" height="180">
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Basic styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.banner {
  position: relative;
  width: 100%;
  height: 500px; /* Adjust height as needed */
  background-image: url('@/assets/banner.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Hide overflow content */
}

.banner button {
  padding: 15px 30px;
  background-color: #0056b3;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 20px;
  z-index: 1; /* Ensure button is above description */
}

.banner button:hover {
  background-color: #1d1e1f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: 0.8s;
}

.description {
  background-color: rgba(0, 0, 0, 0.7); /* Darken the background */
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
  z-index: 1; /* Ensure description is above background image */
  transition: 0.5s ease; /* Smooth transition */
  transform: translateY(100%); /* Initially hide description */
}

.banner:hover .description {
  transform: translateY(0); /* Show description on hover */
}

.description p {
  color: #fff;
  margin-bottom: 10px;
}

.description img {
  max-width: 100%;
  border-radius: 8px;
}

.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card-header {
  margin-bottom: 15px;
}

.card-body {
  margin-bottom: 15px;
}

.card-title {
  margin-bottom: 10px;
}

.card-text {
  margin-bottom: 0;
}

/* Additional styles for responsiveness */
@media (max-width: 768px) {
  .banner {
    height: 300px; /* Adjust height for smaller screens */
  }
}

@media (max-width: 480px) {
  .banner button {
    font-size: 16px; /* Adjust font size for smaller screens */
  }
}
</style>
