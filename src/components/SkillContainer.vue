<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { skill_state } from '../stores/skill_state';
const skill_inst = skill_state();
const skill_list: Ref<Array<{skillName: string; skillValue: number}>> = ref(new Array())

const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';

onBeforeMount(()=>{
    skill_list.value = skill_inst.get_skill_list();

})

</script>

<template>
    <article class="stats_article">
        <div v-for="(skill, i) in skill_list" :key="i">
            <p>{{ skill.skillName }}</p>
            <div>
                <p>{{ skill.skillValue }}</p>
                <img :src="plus" alt="" class="svg">
                <img :src="minus" alt="" class="svg">
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped></style>