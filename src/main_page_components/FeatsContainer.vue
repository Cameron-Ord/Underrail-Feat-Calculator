<script setup>
import {ref, watch} from 'vue'
import { useFeatStore } from '../stores/feat_store';
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies()
const feat_store_instance = useFeatStore();
const generated_feat_list = ref(feat_store_instance.state.feats_list)
const svg_list = ref(feat_store_instance.state.svg_list)
const plus = 'images/plus.svg';
const minus = 'images/minus.svg';

//Watching for changes in the store instance.
watch(() => feat_store_instance.state.feats_list, (value) => {
    console.log("UPDATED VALUE: ", value)
    generated_feat_list.value = feat_store_instance.state.feats_list
})

watch(() => feat_store_instance.state.svg_list, (value) => {
    console.log("UPDATED VALUE: ", value)
    svg_list.value = feat_store_instance.state.svg_list
})

const retrieve_cookies = () =>{
    const retrieved_feats = cookies.get('chosen_feats');
    if(retrieved_feats !== null){
        const copied_feats = [...JSON.parse(retrieved_feats)];
        return copied_feats;
    } else {
        return [];
    }
}

const add_init_feat = (feat_ref) =>{
    const init_array = [];
    if(feat_ref){
        init_array.push(feat_ref.textContent);
        return init_array;
    } else {
        return [];
    }
}

const add_to_feats = (feat_ref, retrieved_array) => {
    const retrieved_array_copy = retrieved_array;
    if(feat_ref){
        retrieved_array_copy.push(feat_ref.textContent);
        return retrieved_array_copy
    } else {
        return []
    }
}

const add_feat = (feat_ref) => {
    const retrieved_cookies = retrieve_cookies();
    if(retrieved_cookies.length === 0){
        const added_feat = add_init_feat(feat_ref);
        cookies.set('chosen_feats', JSON.stringify(added_feat));
        console.log("ADDED: ", added_feat);
    } else {
        const feat_array = add_to_feats(feat_ref, retrieved_cookies);
        cookies.set('chosen_feats', JSON.stringify(feat_array));
        console.log("ADDED: ", feat_array);
    }
}

const retrieve_item_index = (feat_ref,retrieved_cookies) => { 
    for(let i = 0; i < retrieved_cookies.length; i++){
        const array_item = retrieved_cookies[i]
        if(array_item === feat_ref.textContent){
            const extracted_index = i;
            return  extracted_index
        }
    }
}

const remove_feat = (feat_ref) => {
    const retrieved_cookies = retrieve_cookies();
    if(retrieved_cookies.length > 0){
        const returned_index = retrieve_item_index(feat_ref,retrieved_cookies);
        const mutant_cookies = [...retrieved_cookies];
        mutant_cookies.splice(returned_index, 1);
        cookies.set('chosen_feats', JSON.stringify(mutant_cookies));
    } else {
        console.error("Empty cookie array: ", retrieved_cookies)
    }
}

const handle_click = (feat_ref, index) => {
    if(svg_list.value[index] === plus){
        feat_store_instance.state.svg_list[index] = minus
        add_feat(feat_ref[index]);
    } else if (svg_list.value[index] === minus){
        feat_store_instance.state.svg_list[index] = plus
        remove_feat(feat_ref[index])
    }
}

</script>
<template>
    <div class="_feats_">
        <div class="feat_container" v-for="(item, i) in generated_feat_list" :key="i">
            <p ref="featText">{{ item }}</p>
            <img
            :src="svg_list[i]"
            alt="plus"
            class="plus"
            @click="handle_click($refs.featText, i)"
            :clicked_plus="i"
            ref="input_svg"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
._feats_{
    display: grid;
    align-items: center;
    height: 375px;
    overflow-y: auto;
    grid-template-rows: auto;
    gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    >.feat_container{
        display: grid;
        align-items: center;
        justify-items: center;

        >p{
            text-align: center;
        }
    }
}
</style>