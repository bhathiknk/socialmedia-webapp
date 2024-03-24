<template>
<div class="body">

      <form @submit="signin" class="form_main">
        <h1 class="heading">Login</h1>
        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input type="text" class="inputField" id="email" v-model="email" required placeholder="Email">

        </div>

        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input type="password" class="inputField" id="password"  v-model="password" required placeholder="Password">

        </div>


        <button id="button">Submit</button>
        <div>
          <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
        </div>
      </form>

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
.body{
  background: rgb(158,158,158);
  background: radial-gradient(circle, rgba(158,158,158,1) 0%, rgba(0,0,0,1) 100%);
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
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
  background-color: #77a9f1;
  transform: rotate(45deg);
  left: -180px;
  bottom: 30px;
  z-index: 1;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.082);
}
.form_main h1{
  color: black;
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
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.inputIcon {
  position: absolute;
  left: 3px;
}

.inputField {
  width: 200%;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgb(28, 17, 17);
  margin: 10px 0;
  color: black;
  font-size: .8em;
  font-weight: 500;
  box-sizing: border-box;
  padding-left: 30px;
}

.inputField:focus {
  outline: none;
  border-bottom: 2px solid rgb(2, 53, 241);
}

.inputField::placeholder {
  color: rgb(0, 0, 0);
  font-size: 1em;
  font-weight: 500;
}

#button {
  z-index: 2;
  position: relative;
  width: 200%;
  border: none;
  background-color: #007bff;
  height: 30px;
  color: white;
  font-size: .8em;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 10px;
  cursor: pointer;
  border-radius: 10px;
}

#button:hover {
  background-color: rgb(126, 84, 255);
}

.forgotLink {
  z-index: 2;
  font-size: .7em;
  font-weight: 500;
  color: rgb(44, 24, 128);
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
}


</style>