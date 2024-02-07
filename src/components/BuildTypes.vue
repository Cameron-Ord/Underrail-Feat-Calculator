<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { types_state } from '../stores/types_state'
const types_inst = types_state();
const types_array: Ref<Array<{Type: string, Svg: string}>> = ref(new Array());
const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';

const select_filter_item = (i: number) => {
    const types_list: Array<{Type: string, Svg: string}> = types_inst.get_list();
    const selection: {Type: string, Svg: string} = types_list[i];
    const added: boolean = types_inst.add_to_chosen(selection);
    if(!added){
        console.error("Failed to add item");
        return
    }
    types_array.value[i]['Svg'] = minus;
}

const handle_selection = (i: number) => {
    const current_tag = types_array.value[i]['Svg']
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
    const chosen_arr: Array<{Type: string, Svg: string}> = types_inst.get_chosen();
    for(let i = 0; i < chosen_arr.length; i++){
        const item_str: string = chosen_arr[i]['Type'];
        if(item_str === stl){
            return i;
        }
    } 
    return -1;
}

const remove_filter_item = (i: number) => {
    const types_list: Array<{Type: string, Svg: string}> = types_inst.get_list();
    const string_to_lookup: string = types_list[i]['Type'];
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
    types_array.value[i]['Svg'] = plus;
}

const search_index = (arr: Array<{Type:string, Svg: string}>, target: string) =>{
    let left = 0;
    let right = arr.length -1;
    while(left <= right){
        const mid = Math.floor((left+right)/2);
        if(arr[mid].Type===target){
            return mid;
        }
        if(arr[mid].Type < target){
            left = mid +1;
        } else {
            right = mid -1;
        }
    }
    return -1;
}

const check_for_saved=(): [Array<{Type:string, Svg:string}>, number] =>{
    const result: boolean = types_inst.check_cookie();
    if(result){
        const err: number = types_inst.load_from_cookies();
        if(err < 0){
            return [[], -1];
        }
        const default_list: Array<{Type:string, Svg:string}> = types_inst.get_list();
        const chosen_arr: Array<{Type: string, Svg: string}> = types_inst.get_chosen();
        default_list.sort((a,b)=>a.Type.localeCompare(b.Type));
        chosen_arr.sort((a,b)=>a.Type.localeCompare(b.Type));
        const found = new Array();
        for(const item of chosen_arr){
            const index: number = search_index(default_list, item.Type);
            if(index !== -1){
                found.push(index);
            }
        }

        if(found.length === 0){
            return [[], -1];
        }
        for(let f = 0; f < found.length; f++){
            default_list[found[f]]['Svg'] = minus
        }

        return [default_list, 0];
    }
    return [[], -1];
}

const handle_result=(modified_list: Array<{Type:string, Svg:string}>, result: number)=>{
    if(result < 0){
        const default_list: Array<{Type:string, Svg:string}> = types_inst.get_list();
        types_array.value = default_list;
        return
    }
    types_array.value = modified_list;

}

onBeforeMount(()=>{
    const[modified_list, result] = check_for_saved();
    handle_result(modified_list, result);
    

})
</script>

<template>
    <article class="build_types">
        <div class="header_types">
            <h2>Build Type Filtering</h2>
        </div>
        <div class="loop_wrapper">
            <div class="type_item" v-for="(type, i) in types_array" :key="i">
                <p>{{ type['Type'] }}</p>
                <img @click="handle_selection(i)" :src="type['Svg']" alt="button_tag" class="svg">
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