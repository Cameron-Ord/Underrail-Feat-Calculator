<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { types_state } from '../stores/types_state'
const types_inst = types_state();
const types_array: Ref<Array<string>> = ref(new Array());
const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';
const img_tag_src: Ref<Array<string>> = ref(new Array());

const select_filter_item = (i: number) => {
    const types_list: Array<string> = types_inst.get_list();
    const selection: string = types_list[i];
    const added: boolean = types_inst.add_to_chosen(selection);
    if(!added){
        console.error("Failed to add item");
        return
    }
    img_tag_src.value[i] = minus;

}

const handle_selection = (i: number) => {
    const current_tag = img_tag_src.value[i]
    switch (current_tag) {
        case minus:
            remove_filter_item(i)
            break;
        case plus:
            select_filter_item(i)
            break;
        default:
            break;
    }
}

const define_index=(stl: string): number =>{
    const chosen_arr: Array<string> = types_inst.get_chosen();
    for(let i = 0; i < chosen_arr.length; i++){
        const item_str: string = chosen_arr[i];
        if(item_str === stl){
            return i;
        }
    } 
    return -1;
}

const remove_filter_item = (i: number) => {
    const types_list: Array<string> = types_inst.get_list();
    const string_to_lookup: string = types_list[i];
    const arr_index: number = define_index(string_to_lookup);
    if(arr_index < 0){
        console.log("Str not found");
        return
    }
    const removed: boolean = types_inst.remove_from_chosen(arr_index);
    if(!removed){
        console.error("Failed to remove item");
        return
    }
    img_tag_src.value[i] = plus;
}

onBeforeMount(()=>{
    const init_list = types_inst.get_list();
    types_array.value = init_list;
    const len = init_list.length;
    for(let i = 0; i < len; i++){
        img_tag_src.value.push(plus);
    }
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
                <img @click="handle_selection(i)" :src="img_tag_src[i]" alt="button_tag" class="svg">
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