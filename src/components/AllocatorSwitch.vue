<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { universal_store } from '@/stores/universal';
const {switch_box} = defineProps(['switch_box'])
const u_inst = universal_store();
const switcher: Ref<boolean> = ref(false);

const save_state = (event_target: EventTarget | null) => {
    if(event_target){
        if(event_target instanceof HTMLElement){
            const text_content = (event_target as HTMLElement).textContent;
            let mut_switcher: boolean; 
            switch (text_content) {
                case "Skills":
                    mut_switcher = true; 
                    u_inst.update_view_state(mut_switcher);
                    switcher.value = mut_switcher;
                    switch_box(!mut_switcher);
                break;
                case "Stats":
                    mut_switcher = false
                    u_inst.update_view_state(mut_switcher);
                    switcher.value = mut_switcher;
                    switch_box(!mut_switcher);
                break;
                default:
                    mut_switcher = true; 
                    u_inst.update_view_state(mut_switcher);
                    switcher.value = mut_switcher;
                    switch_box(!mut_switcher);
                break;
            }
        }
    }
}

onBeforeMount(()=>{
    u_inst.load_from_cookies();
    const last_state: boolean = u_inst.get_value_state();
    switcher.value = last_state;
})

</script>

<template>
    <div class="switch_div">
        <p v-if="!switcher" @click="save_state($event.target)">Skills</p>
        <p v-if="switcher" @click="save_state($event.target)">Stats</p>
    </div>
</template>

<style lang="scss" scoped>

</style>