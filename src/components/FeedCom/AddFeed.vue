<template>
    <div class="add-feed">
        <div class="container">
            <h2>Add New Feed</h2>
            <form @submit.prevent="submitFeed">
                <div class="form-group">
                    <label for="imageUpload">Upload Image:</label>
                    <input type="file" id="imageUpload" ref="imageInput" @change="handleImageUpload" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label for="caption">Caption:</label>
                    <textarea id="caption" v-model="newFeed.caption" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddFeed',
    data() {
        return {
            newFeed: {
                imageUrl: '',
                caption: ''
            }
        };
    },
    methods: {
        submitFeed() {
            // Handle the form submission, e.g., send the new feed data to your backend
            // You can also clear the form here
            console.log('New feed:', this.newFeed);
            // Reset the form fields
            this.newFeed = {
                imageUrl: '',
                caption: ''
            };
        },
        handleImageUpload() {
            // Handle image upload when a new image is selected in the file input
            const imageInput = this.$refs.imageInput;
            if (imageInput.files.length > 0) {
                // You can now process the selected image, e.g., preview it or upload it to your server
            }
        }
    }
};
</script>

<style scoped>
.add-feed {
    max-width: 600px;
    margin: 90px auto;
    padding: 20px;
    border: 1px solid #007bff; /* Change border color to match the button */
    border-radius: 5px;
    background-color: #f8f8f8; /* Add a background color */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="file"] {
    width: 100%;
    padding: 4px; /* Increase input padding */
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none; /* Remove input outline */
}

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
    margin-bottom: 15px;
}

button:hover {
    background-color: darkslategrey;
}
</style>
