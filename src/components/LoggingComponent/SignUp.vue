<template>
    <div class="signup-form">

        <div>
            <p>If you have an account, please <router-link to="/SignIn">Sign In</router-link></p>
        </div>

        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="first-name">First Name:</label>
                <input type="text" id="first-name" v-model="firstName" required />
            </div>
            <div class="form-group">
                <label for="last-name">Last Name:</label>
                <input type="text" id="last-name" v-model="lastName" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>


</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
        submitForm() {
            // You can perform form validation here
            // For a front-end-only example, you can simply log the form data
            console.log('Submitted Form Data:', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword
            });
        }
    }
};
</script>

<style scoped>

.signup-form {
    max-width: 400px;
    margin: 10px auto;
    padding: 20px;
    border: 1px solid #007bff; /* Change border color to match the button */
    border-radius: 5px;
    background-color: #f8f8f8; /* Add a background color */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
    overflow-y: auto;
}

.form-group {
    margin-bottom: 5px; /* Increase spacing between form groups */
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px; /* Add space below labels */
}

input {
    width: 100%;
    padding: 4px; /* Increase input padding */
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none; /* Remove input outline */
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 15px; /* Add space above the button */
}

button:hover {
    background-color: #0056b3; /* Change button color on hover */
}
</style>
