<template>
    <div>
        <h2>Learning Chart</h2>
       
    </div>
    <div class="profile">
        <div class="profile">
            <CircularButton to="/Profile.vue" icon="fa fa-check" label="ToDo" style="margin-bottom: 10px; margin-left: 5px"  />
            <CircularButton to="/Profile.vue" icon="fa fa-calendar" label="Calander" style="margin-bottom: 10px; margin-left: 5px"  />
            <CircularButton to="/Profile.vue" icon="fa fa-bullseye" label="Goal Setting" style="margin-bottom: 10px; margin-left: 5px"  />
            <CircularButton to="/Profile.vue" icon="fa fa-book" label="Daily Journaling" style="margin-bottom: 10px; margin-left: 5px"  />
            <CircularButton to="/Profile.vue" icon="fa fa-file" label="Study Timetable" style="margin-bottom: 10px; margin-left: 5px"  />
            <CircularButton to="/Profile.vue" icon="fa fa-table" label="Reflective Journal" style="margin-bottom: 10px; margin-left: 5px"  />
        </div>

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
