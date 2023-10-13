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

        <div class="container">
        <!-- Display user information -->
            <div class="profile-info">
                <div class="profile-picture-container">
                    <img :src="user.profileImageUrl" alt="Profile Picture" />
                </div>
                <h3>{{ user.username }}</h3>
                 <p>{{ user.email }}</p>
                 <p>{{ user.bio }}</p>
          </div>
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
                username: 'Kavindya',
                email: 'user@example.com',
                profileImageUrl: require('@/assets/profile.jpg'),
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
    margin: -12% auto;
    max-width: 60%;
    padding: 20px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    text-align: center; /* Center the content horizontally */
}

.profile-picture-container {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 20px auto;
}

.profile-picture-container img {
    max-width: 100%;
    height: auto;

}

.profile-info h3 {

    font-size: 24px;
    margin-top: 10px;
    color: #333;
    margin-bottom: 60px; /* Add margin below the username */
}

.profile-info p {

    color: #666;
    margin-bottom: 30px;
}


 .circular-button-container {

     top: 10px;  /* Adjust the top value as needed to control the vertical position */
     margin-left:5px;  /* Adjust the right value as needed to control the horizontal position */
     display: block;
     position: relative;
 }



</style>
