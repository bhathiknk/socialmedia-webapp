<template>
  <div class="body">
  <div class="signup-form form_main">
    <h2 class="heading">Sign Up</h2>
    <form @submit="signup" class="inputContainer">
      <div class="form-group">
        <div class="name-group">
          <div class="name-input">
            <label for="first-name" class="inputIcon"><i class="fas fa-user"></i></label>
            <input type="text" id="first-name" v-model="firstName" class="inputField" placeholder="First Name" required />
          </div>
          <div class="name-input">
            <label for="last-name" class="inputIcon"><i class="fas fa-user"></i></label>
            <input type="text" id="last-name" v-model="lastName" class="inputField" placeholder="Last Name" required />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="inputIcon"><i class="fas fa-envelope"></i></label>
        <input type="email" id="email" v-model="email" class="inputField" placeholder="Email" required />
      </div>
      <div class="form-group">
        <label for="username" class="inputIcon"><i class="fas fa-user"></i></label>
        <input type="text" id="userName" v-model="userName" class="inputField" placeholder="Username" required />
      </div>

      <div class="form-group">
        <label for="interest" class="inputIcon"><i class="fas fa-heart"></i></label>
        <select id="interest" v-model="interest" class="inputField">
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="science">Science</option>
        </select>
      </div>

      <div class="form-group">
        <label for="password" class="inputIcon"><i class="fas fa-lock"></i></label>
        <input type="password" id="password" v-model="password" class="inputField" placeholder="Password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password" class="inputIcon"><i class="fas fa-lock"></i></label>
        <input type="password" id="confirm-password" v-model="confirmPassword" class="inputField" placeholder="Confirm Password" required />
      </div>
      <button type="submit" id="button">Sign Up</button>
      <div v-if="passwordFeedback" class="password-feedback">{{ passwordFeedback }}</div>
      <p>If you have an account, please <router-link to="/SignIn">Sign In</router-link></p>
    </form>
  </div>

  </div>
</template>

<script>
import axios from "axios";
import baseURL from "@/config";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      userName: null,
      interest: null,
      password: null,
      confirmPassword: null,
      passwordFeedback: null,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      if (this.password === this.confirmPassword) {
        // Check password complexity
        if (!this.isPasswordComplex()) {
          this.passwordFeedback = "Password must contain at least one letter, one number, and one symbol.";
          return;
        }

        // Call signup API
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

            this.$router.replace("/SignIn");
            this.showSuccessMessage();

          } else {
            // Handle other cases if needed
          }
        } catch (error) {
          console.log("Error:", error);
          // Handle error cases if needed
        }
      } else {
        // Show password mismatch error
        this.showErrorMessage();
      }
    },

    isPasswordComplex() {
      // Password complexity rules: at least 6 characters, one letter, one number, and one symbol
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      return regex.test(this.password);
    },

    showErrorMessage() {
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Password Do Not Match.',
      });
    },
    showSuccessMessage() {
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Question saved successfully',
      });
    },

  },
};
</script>

<style scoped>

.body{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
}
.password-feedback {
  color: red;
  margin-top: 5px;
  font-size: 12px;
}
.form_main {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding: 150px;
  box-shadow: 0 0 50px rgb(0, 0, 0);
  position: relative;
  overflow: hidden;
  margin: 10px auto;
  max-height: calc(100vh - 100px);
  border-radius: 10px;
}

.form_main::before {
  position: absolute;
  content: "";
  width: 300px;
  height: 100%;
  background-color: rgb(209, 193, 255);
  transform: rotate(45deg);
  left: -180px;
  bottom: 30px;
  z-index: 1;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.082);
}

.heading {
  font-size: 2em;
  color: #2e2e2e;
  font-weight: 700;
  margin: 5px 0 10px 0;
  z-index: 2;
}

.inputContainer {
  width: 200%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  z-index: 2;
}

.inputIcon {
  position: absolute;
  left: 5px;
}

.inputField {
  width: calc(160% - 40px); /* Adjusted width to occupy the entire width of the form */
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgb(173, 173, 173);
  margin: 10px 0;
  color: black;
  font-size: .8em;
  font-weight: 500;
  box-sizing: border-box;
  padding-left: 40px; /* Add padding for icon */
}
.inputField:focus {
  outline: none;
  border-bottom: 2px solid rgb(199, 114, 255);
}

.inputField::placeholder {
  color: rgb(80, 80, 80);
  font-size: 1em;
  font-weight: 500;
}

button {
  z-index: 2;
  position: relative;
  width: 80%;
  border: none;
  background-color: rgb(162, 104, 255);
  height: 30px;
  color: white;
  font-size: .8em;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(126, 84, 255);
}
</style>