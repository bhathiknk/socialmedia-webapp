<template>
    <div class="signup-form">
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
    <div>
        <p>If you have an account, please <router-link to="/SignIn">Sign In</router-link></p>
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
    border: 1px solid #ccc;
    border-radius: 5px;

}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
</style>
