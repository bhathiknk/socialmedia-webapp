<template>
    <div class="profile-edit">


        <div class="circular-button-container">
            <CircularButton
                @click="navigateToSignUp"
                to="/SignUp"
            icon="fa fa-arrow-right"
            label="LogIn"
            style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
            />
        </div>
        <div class="circular-button-container">
            <CircularButton
                @click="navigateToUserDetailEdit"
                to="/UserDetailEdit"
                icon="fa fa-gear"
                label="Settings"
                style="margin-bottom: 10px; margin-top: 5px; margin-left: 5px"
            />
        </div>

        <!-- Display user information -->
        <div class="profile-info">
            <img :src="user.profileImageUrl" alt="Profile Picture" />
            <h3>{{ user.username }}</h3>
            <p>{{ user.email }}</p>
            <p>{{ user.bio }}</p>
        </div>

    </div>
</template>

<script>
import CircularButton from "../CircularButton.vue";
export default {
    components: {
        CircularButton,
    },
    data() {
        return {
            user: {
                username: 'User',
                email: 'user@example.com',
                profileImageUrl: '../assets/profile.jpg',
                bio: 'This is my bio.',
            },
        };
    },
    methods: {
        navigateToSignUp() {
            // Use Vue Router's push method to navigate to the "SignUp.vue" route
            this.$router.push("/SignUp");
        },
        navigateToUserDetailEdit(){
            this.$router.push("/UserDetailEdit")
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
 .circular-button-container {
     position: relative;
     top: 10px;  /* Adjust the top value as needed to control the vertical position */
     margin-left:5px;  /* Adjust the right value as needed to control the horizontal position */
     display: block;
 }



</style>
