
<template>
  <div class="goalSettings">
    <h1> discussion-forum </h1>


    <div>
      <textarea v-model="newPostText" placeholder="What's on your mind?"></textarea>
      <button @click="createPost">Post</button>
    </div>

    <!-- Display posts -->
    <div v-for="(post, index) in posts" :key="index">
      <div>{{ post.text }}</div>
      <button @click="likePost(post)">Like</button>
      <span>{{ post.likes }} Likes</span>
    </div>



  </div>
</template>
<script setup>

import { ref } from 'vue';

const newPostText = ref('');
const posts = ref([]);

const createPost = () => {
  if (newPostText.value) {
    posts.value.push({
      text: newPostText.value,
      likes: 0,
    });
    newPostText.value = '';
  }
};


</script>



<Style>

  textarea{
    width: 100%;
    spadding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</Style>
