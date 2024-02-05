<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { stat_state } from '../stores/stat_state'
const stat_inst = stat_state();
const stat_list: Ref<Array<{statName: string; statValue: number}>> = ref(new Array())

const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';

onBeforeMount(()=>{
    stat_list.value = stat_inst.get_stat_list();
})

</script>

<template>
    <article class="stats_article">
        <div v-for="(stat, i) in stat_list" :key="i">
            <p>{{ stat.statName }}</p>
            <div>
                <p>{{ stat.statValue }}</p>
                <img :src="plus" alt="" class="svg">
                <img :src="minus" alt="" class="svg">
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped></style>