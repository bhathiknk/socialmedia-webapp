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
    </div>
    <div>
        <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
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
    margin: 50px auto;
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

a {
    text-decoration: none;
    color: #007bff;
    cursor: pointer;
}
</style>
