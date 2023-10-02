<template>
  <div>
    <h1>Resource Library</h1>

    <!-- Input to add files -->
    <input type="file" @change="addFile" accept=".pdf, .jpg, .jpeg, .png, .gif, .zip, .mp4, .avi" multiple />

    <!-- List of files -->
    <ul>
      <li v-for="(file, index) in files" :key="index">
        {{ file.name }}
        <button @click="displayFile(file)">View</button>
      </li>
    </ul>

    <!-- Display selected file content -->
    <div v-if="selectedFile" class="selected-file">
      <h2>Selected File: {{ selectedFile.name }}</h2>
      <div v-if="isImage(selectedFile.type)" class="image-preview">
        <img :src="selectedFile.content" alt="Selected File" />
      </div>
      <div v-else class="file-content">
        <pre>{{ selectedFile.content }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      selectedFile: null,
    };
  },
  methods: {
    addFile(event) {
      const fileList = event.target.files;
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();

        reader.onload = () => {
          this.files.push({
            name: file.name,
            content: reader.result,
            type: file.type,
          });
        };

        // Read the file content based on its type
        if (this.isImage(file.type)) {
          reader.readAsDataURL(file); // For images
        } else {
          reader.readAsText(file); // For other file types
        }
      }
    },
    displayFile(file) {
      this.selectedFile = file;
    },
    isImage(fileType) {
      return fileType.startsWith('image/');
    },
  },
};
</script>

<style scoped>
/* Add your CSS styling for the component here */
.selected-file {
  padding: 20px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.file-content pre {
  max-width: 100%;
  overflow-x: auto;
}
</style>
