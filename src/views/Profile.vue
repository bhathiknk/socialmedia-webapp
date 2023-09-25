<template>
  <div class="profile">
      <CircularButton to="/Profile.vue" label="ToDo" style="margin-bottom: 10px; margin-left: 5px"  />
      <CircularButton to="/Profile.vue" label="Calander" style="margin-bottom: 10px; margin-left: 5px"  />
      <CircularButton to="/Profile.vue" label="Goal Setting" style="margin-bottom: 10px; margin-left: 5px"  />
      <CircularButton to="/Profile.vue" label="Daily Journaling" style="margin-bottom: 10px; margin-left: 5px"  />
      <CircularButton to="/Profile.vue" label="Study Timetable" style="margin-bottom: 10px; margin-left: 5px"  />
      <CircularButton to="/Profile.vue" label="Reflective Journals" style="margin-bottom: 10px; margin-left: 5px"  />
  </div>
    <div>
        <h2>Learning Chart</h2>
        <canvas ref="chart" width="400" height="200"></canvas>
    </div>
</template>

<script>

import CircularButton from'../components/CircularButton.vue'
export default {
  name: 'ProfileView',
  components: {
      CircularButton,
  },
};
</script>
