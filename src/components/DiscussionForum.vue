<template>
  <div class="goalSettings">
    <h1> discussion-forum </h1>


    <div class="container">

      <div class="chat" id="chat">
        <div class="message">
          <img src="copilot.png" alt="Copilot">
          <p>Hello, this is Copilot. How can I help? 😊</p>
        </div>
        <div class="message user">
          <img src="user.png" alt="User">
          <p>Hi. Can you help me with something?</p>
        </div>
        <div class="message">
          <img src="copilot.png" alt="Copilot">
          <p>Of course. What do you need?</p>
        </div>
      </div>
      <div class="footer">
        <input type="text" id="input" placeholder="Type a message...">
        <button id="send">Send</button>
      </div>
    </div>




  </div>
</template>
<script setup>



</script>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.message img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.message p {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
}

.message.user {
  justify-content: flex-end;
}

.message.user img {
  margin-left: 10px;
  margin-right: 0;
}

.message.user p {
  background-color: #e6e6ff;
}

.footer {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.footer input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
}

.footer button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}



</style>