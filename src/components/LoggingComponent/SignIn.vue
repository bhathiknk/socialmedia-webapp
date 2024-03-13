<template>
    <div class="signin-form">
        <h2>Sign In</h2>
        <form @submit="signin">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" required />
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
import axios from "axios";
import baseURL from "@/config";
import Swal from "sweetalert2";

export default {
    // Your existing component setup
    methods: {
        async signin(e) {
            e.preventDefault();
            const body = {
                email: this.email,
                password: this.password,
            };
            await axios
                .post(`${baseURL}user/signin`, body)
                .then((res) => {

                    localStorage.setItem("token", res.data.token);

                  this.showSuccessMessage();

                    this.$emit("fetchData");
                    this.$router.push({ name: "ProfileEdit" });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        // Incorrect password error
                      this.showErrorMessage();
                    }
                  if (err.response && err.response.status === 500) {
                    // Incorrect password error
                    this.showErrorMessage();
                  }else {
                        console.log("err", err);
                    }
                });
        },
      showSuccessMessage() {
        // Show success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful',
        });
      },
      showErrorMessage() {
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect Password.Please Try Again.',
        });
      },
    },
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