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
</style>
