<script setup lang="ts">
import StatContainer from './StatContainer.vue';
import SkillContainer from './SkillContainer.vue';
import AllocatorSwitch from './AllocatorSwitch.vue';
import { ref, type Ref } from 'vue';
const is_switched: Ref<boolean> = ref(true)
const switch_box = (switched: boolean) => {
    if(!switched){
        is_switched.value = switched;
        return
    }
    is_switched.value = switched;
}
</script>

<template>
    <article class="allocator_box">
        <stat-container v-if="is_switched"></stat-container>
        <skill-container v-if="!is_switched"></skill-container>
        <allocator-switch :switch_box="switch_box"></allocator-switch>
    </article>
</template>

<style lang="scss" scoped>
.allocator_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    row-gap: 25px;
}
</style>