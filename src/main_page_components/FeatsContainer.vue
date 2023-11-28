<script setup>
import {ref, watch} from 'vue'
import { useFeatStore } from '../stores/feat_store';
const feat_store_instance = useFeatStore();
const generated_feat_list = ref(feat_store_instance.state.feats_list)
const svg_list = ref(feat_store_instance.state.svg_list)

//Watching for changes in the store instance.
watch(()=>feat_store_instance.state.feats_list, (new_value)=>{
    generated_feat_list.value = new_value
})

watch(()=>feat_store_instance.state.svg_list, (new_value)=>{
    svg_list.value = new_value
})


</script>
<template>
    <div class="_feats_">
        <div class="feat_container" v-for="(item, i) in generated_feat_list" :key="i">
            <p>{{ item }}</p>
            <img
            :src="svg_list[i]"
            alt="plus"
            class="plus"
            @click="handle_click(this.$refs.featText, i)"
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