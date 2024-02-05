<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { types_state } from '../stores/types_state'
const types_inst: any = types_state();
const types_array: Ref<Array<string>> = ref(new Array());
const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';


onBeforeMount(()=>{
    types_array.value = types_inst.get_list();
})
</script>

<template>
    <article class="build_types">
        <div class="header_types">
            <h2>Build Type Filtering</h2>
        </div>
        <div class="type_item" v-for="(type, i) in types_array" :key="i">
            <p>{{ type }}</p>
            <img :src="plus" alt="button_tag" class="svg">
        </div>
    </article>
</template>

<style lang="scss" scoped>

</style>