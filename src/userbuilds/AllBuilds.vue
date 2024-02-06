<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import {universal_store} from '../stores/universal'
const u_inst = universal_store();
const complete_build_data: Ref<any> = ref(new Array())

onBeforeMount(()=>{
    const build_data: any = u_inst.get_general_builds();
    complete_build_data.value = build_data;
})

</script>

<template>
    <article class="build_article">
        <div v-for="(build, b) in complete_build_data" :key="b">
            
        </div>
    </article>
</template>

<style lang="scss" scoped>

</style>