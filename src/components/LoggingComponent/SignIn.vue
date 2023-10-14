<template>
    <div class="signin-form">
        <h2>Sign In</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email-username">Email or Username:</label>
                <input type="text" id="email-username" v-model="emailOrUsername" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Sign In</button>
        </form>
        <div>
            <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emailOrUsername: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            // You can perform authentication here
            // For a front-end-only example, you can simply log the form data
            console.log('Submitted Form Data:', {
                emailOrUsername: this.emailOrUsername,
                password: this.password,
            });
        }
    }
};
</script>

<style scoped>

.signin-form {
    max-width: 400px;
    margin: 90px auto;
    padding: 20px;
    border: 1px solid #007bff; /* Change border color to match the button */
    border-radius: 5px;
    background-color: #f8f8f8; /* Add a background color */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */}

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
    margin-bottom: 15px;
}

button:hover {
    background-color: #0056b3; /* Change button color on hover */
}
</style>
