<template>
    <div class="user-detail-edit">
        <h2>Edit User Details</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="profile-picture">Profile Picture:</label>
                <input type="file" id="profile-picture" @change="updateProfilePicture" />
                <img :src="editedUser.profilePicture" alt="Profile Picture" class="profile-picture" />
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
                profilePicture: '', // You can provide a default image URL here
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
    margin: 0 auto;
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

input[type="file"] {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

img.profile-picture {
    max-width: 100px;
    max-height: 100px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-top: 5px;
}

input[type="text"],
input[type="email"],
textarea {
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
