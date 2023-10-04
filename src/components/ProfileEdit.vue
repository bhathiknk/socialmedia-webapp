<template>
    <div class="profile-edit">

        <div>
            <!-- Navigation Bar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="#">Your App Name</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Display user information -->
        <div class="profile-info">
            <img :src="user.profileImageUrl" alt="Profile Picture" />
            <h3>{{ user.username }}</h3>
            <p>{{ user.email }}</p>
            <p>{{ user.bio }}</p>
        </div>

        <div class="button-container">
            <button @click="toggleEditForm">Edit Profile</button>
        </div>

        <!-- Edit profile form (initially hidden) -->
        <form v-if="showEditForm" @submit.prevent="updateProfile">
            <label for="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" @change="handleProfilePictureChange" />

            <label for="username">Username:</label>
            <input type="text" id="username" v-model="user.username" />

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" />

            <label for="bio">Bio:</label>
            <textarea id="bio" v-model="user.bio"></textarea>

            <button type="submit">Save Changes</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: 'User',
                email: 'user@example.com',
                profileImageUrl: '../assets/profile.jpg',
                bio: 'This is my bio.',
            },
            showEditForm: false, // Initially, the edit form is hidden
            newProfilePicture: null,
        };
    },
    methods: {
        toggleEditForm() {
            this.showEditForm = !this.showEditForm;
        },
        handleProfilePictureChange(event) {
            this.newProfilePicture = event.target.files[0];
        },
        updateProfile() {
            // In this front-end-only example, you can simulate an update by updating the user object.
            // In a real application, you would send this data to a back end to update the user's profile.
            // Handle the file upload using an appropriate library or API.
            // Update the user object with the server's response.
            // Here, we simulate the update by setting the user's profile data directly.
            this.user.profileImageUrl = URL.createObjectURL(this.newProfilePicture);
            // You can also send other user data to a back end here if needed.
            this.showEditForm = false; // Hide the edit form after saving changes
        },
    },
};
</script>

<style scoped>
/* Add your CSS styles for the profile edit component here */
</style>


<style>
/* Add CSS styles for the user profile page */

body {
    font-family: Arial, sans-serif;
}

h2 {
    color: #333;
}

.profile-info {
    max-width: 400px;
    margin: 5% auto;
    padding: 20px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

}

.profile-container img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;

}

.profile-container h3 {
    font-size: 24px;
    margin-top: 10px;
    color: #333;
}

.profile-container p {
    margin: 5px 0;
    color: #666;
}

form {
    margin-top: 20px;
}

label {
    font-weight: bold;
    color: #333;
}

input[type="text"],
input[type="email"],
textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button{
    margin-top: 50px;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
    .profile-container {
        max-width: 100%;
        padding: 10px;
    }
}



</style>
