<template>
    <div class="goalSettings">
        <h1> discussion-forum </h1>


      <div>
        <label for="question">Your Question:</label>
        <input type="text" id="question" v-model="newQuestion" @input="clearError" />
        <button @click="postQuestion">Post Question</button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div>
        <h2>Questions</h2>
        <ul>
          <li v-for="(question, index) in questions" :key="index">
            {{ question }}
          </li>
        </ul>
      </div>







    </div>
</template>
<script setup>





</script>