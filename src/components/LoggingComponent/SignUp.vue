<template>
    <div class="signup-form">
        <div>
            <p>If you have an account, please <router-link to="/SignIn">Sign In</router-link></p>
        </div>

        <h2>Sign Up</h2>
        <form @submit="signup">
            <div class="form-group">
                <div class="name-group">
                    <div class="name-input">
                        <label for="first-name">First Name:</label>
                        <input type="text" id="first-name" v-model="firstName" required />
                    </div>
                    <div class="name-input">
                        <label for="last-name">Last Name:</label>
                        <input type="text" id="last-name" v-model="lastName" required />
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="userName" v-model="userName" required />
            </div>

            <div class="form-group">
                <label for="interest">Choose Your Interest:</label>
                <select id="interest" v-model="interest">
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="science">Science</option>
                </select>
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
import axios from "axios";
import swal from "sweetalert";
import baseURL from "@/config";
export default {
  props: ["baseURL"],
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      userName:null,
      interest:null,
      password: null,
      confirmPassword: null,

    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      if (this.password === this.confirmPassword) {
        // call signup api
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          interest: this.interest,
          userName: this.userName,
          password: this.password,
        };

        try {
          const response = await axios.post(`${baseURL}user/signup`, user);

          if (response.data.status === 'success') {
            this.$router.replace("/");
            swal({
              text: response.data.message,  // Use the message from the backend
              icon: "success",
            });
          } else {
            // Handle other cases if needed
          }
        } catch (error) {
          console.log("Error:", error);
          // Handle error cases if needed
        }
      } else {
        // show some error
        swal({
          text: "Passwords don't match",
          icon: "error",
        });
      }
    },

  },
};
</script>

<style scoped>
.signup-form {
    max-width: 400px;
    margin: 10px auto;
    padding: 20px;
    border: 1px solid #007bff;
    border-radius: 5px;
    background-color: #f8f8f8;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    overflow-y: auto;
}

.form-group {
    margin-bottom: 10px;
}

.name-group {
    display: flex;
    justify-content: space-between;
}

.name-input {
    flex-basis: 48%;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input, select {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 15px;
}

button:hover {
    background-color: #0056b3;
}
</style>
