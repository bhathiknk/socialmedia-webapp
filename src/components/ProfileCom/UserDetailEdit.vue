<template>
    <div class="user-detail-edit">
        <h2>Edit User Details</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="profile-picture">Profile Picture:</label>
                <input type="file" id="profile-picture" @change="updateProfilePicture" />
                <div class="profile-picture-container">
                    <img :src="editedUser.profileImageUrl" alt="Profile Picture" />
                </div>
            </div>
            <div class="form-group">
                <label for="user-name">User Name:</label>
                <input type="text" id="user-name" v-model="editedUser.userName" />
            </div>
            <div class="form-group">
                <label for="user-email">Email:</label>
                <input type="email" id="user-email" v-model="editedUser.email" />
            </div>
            <div class="form-group">
                <label for="bio">Bio:</label>
                <textarea id="bio" v-model="editedUser.bio"></textarea>
            </div>
            <button type="submit">Save Changes</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editedUser: {
                profileImageUrl: require('@/assets/profile.jpg'),
                userName: '',
                email: '',
                bio: ''
            }
        };
    },
    methods: {
        /*updateProfilePicture(event) {
            // Handle profile picture upload and update editedUser.profilePicture
            // You can use FileReader API to display the selected image preview
            // Example:
            // const file = event.target.files[0];
            // const reader = new FileReader();
            // reader.onload = (e) => {
            //   this.editedUser.profilePicture = e.target.result;
            // };
            // reader.readAsDataURL(file);
        },
        submitForm() {
            // You can perform form validation here and save changes to the backend if required
            // For this example, we will just log the edited user data
            console.log('Edited User Data:', this.editedUser);
        }

    */}
};
</script>

<style scoped>
.user-detail-edit {
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
    margin-bottom: 5px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="file"] {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.profile-picture-container {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 20px auto;
}

input[type="text"],
input[type="email"],
textarea {
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
</style>
