<script setup lang="ts">
import StatContainer from './StatContainer.vue';
import SkillContainer from './SkillContainer.vue';

</script>

<template>
  <article class="allocator_box">
    <stat-container></stat-container>
    <skill-container></skill-container>
  </article>
</template>

<style lang="scss" scoped>
.allocator_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  row-gap: 50px;
}

@media only screen and (min-width: 1024px) {
  .allocator_box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items:center;
    width: 90%;
    row-gap: 50px;
  }
}

@media only screen and (min-width: 770px) {
  .allocator_box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items:center;
    width: 90%;
    row-gap: 50px;
  }
}

</style>
