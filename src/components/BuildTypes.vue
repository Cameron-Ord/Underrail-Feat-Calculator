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
        <div class="loop_wrapper">
            <div class="type_item" v-for="(type, i) in types_array" :key="i">
                <p>{{ type }}</p>
                <img :src="plus" alt="button_tag" class="svg">
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.build_types{
    display: grid;
    justify-items: center;
    row-gap: 30px;
    >.header_types{
        display: flex;
        text-align: center;
    }
    >.loop_wrapper{
        display: flex;
        flex-wrap: wrap;
        row-gap: 20px;
        column-gap: 10px;
        justify-content: space-evenly;
        width: 80%;
        overflow-y: auto;
        height: 200px;
        >.type_item{
            text-align: center;
            column-gap: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>