<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { universal_store } from '../stores/universal'
const u_inst = universal_store();
const complete_build_data: Ref<Array<{
  Build_ID: number,
  Build_Title: string,
  Feat_Slice: Array<{ Name: string, Build_ID: number }>,
  Skill_Slice: Array<{ Name: string, Value: number, Build_ID: number }>,
  Stat_Slice: Array<{ Name: string, Value: number, Build_ID: number }>
}>> = ref(new Array);

onBeforeMount(() => {
  const build_data: any = u_inst.get_general_builds();
  complete_build_data.value = build_data;
})

</script>

<template>
  <article class="build_article">
    <div class="build_container">

    </div>
  </article>
</template>

<style lang="scss" scoped></style>
