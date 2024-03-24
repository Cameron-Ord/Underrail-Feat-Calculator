<template>
    <div class="switch_wrapper">
        <p class="switch_tag" @click="set_state($event.target)" @mouseleave="leave($event.target)" @mouseenter="hover($event.target)">Public builds</p>
        <p class="switch_tag" @click="set_state($event.target)" @mouseleave="leave($event.target)" @mouseenter="hover($event.target)">Private builds</p>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue';
import { universal_store } from '../stores/universal'
const u_inst = universal_store();

const { update_build_view } = defineProps(['update_build_view']);
const current_target: Ref<string> = ref("")

onMounted(()=>{
    set_element_style();
})

const set_element_style = () => {
    const current: string = u_inst.get_current_view();
    let tag_nodes: NodeListOf<HTMLElement> = document.querySelectorAll('.switch_tag');
    for(let i = 0; i < tag_nodes.length; i++){
        if(tag_nodes[i] !== null){
            const text: string = (tag_nodes[i] as HTMLElement).innerText;
            const substr: string = get_substr(text);
            if(substr === current){
                set_state(tag_nodes[i]);
                return;
            }
        }
    }
}


const get_substr = (text: string): string => {
    let index: number = text.indexOf(' ');
    const substr = text.substring(0, index).toLowerCase();
    return substr;
}

const clear_styles = () => {
    let tag_nodes: NodeListOf<HTMLElement> = document.querySelectorAll('.switch_tag');
    for(let i = 0; i < tag_nodes.length; i++){
        remove_styles(tag_nodes[i]);
    }
}

const set_state = (target: EventTarget | HTMLElement | null) => {
    if(target !== null && target instanceof HTMLElement){
        const text: string = target.innerText;
        const substr: string = get_substr(text);
        current_target.value = substr;
        update_build_view(substr);
        clear_styles();
        set_style_on_click(target);
    }
}

const remove_styles = (t: HTMLElement) => {
    t.style.transition = '';
    t.style.color = '';
    t.style.padding = '';
    t.style.border = '';
    t.style.borderRadius = '';
}
const set_style_on_click = (t: HTMLElement) => {
    t.style.transition = '150ms ease-in-out';
    t.style.color = 'var(--orange)';
    t.style.padding = '5px';
    t.style.border = 'solid var(--orange) 1px';
    t.style.borderRadius = '5px';
}

const hover_style = (t: EventTarget) => {
    if(t instanceof HTMLElement){
        t.style.transition = '150ms ease-in-out';
        t.style.color = 'var(--orange)';
        t.style.cursor = 'pointer'
    }
}

const remove_hover = (t: EventTarget) => {
    if(t instanceof HTMLElement){
        const text: string = t.innerText;
        const substr: string = get_substr(text);
        if(substr !== current_target.value){
            t.style.transition = '150ms ease-in-out';
            t.style.color = '';
            t.style.cursor = ''
        }
    }
}

const hover = (target: EventTarget | null) => {
    if(target !== null) {
        hover_style(target);
    }
}

const leave = (target: EventTarget | null) => {
    if(target !== null ) {
        remove_hover(target);
    }
}

</script>

<style lang="scss" scoped>
.switch_wrapper{
    display: flex;
    align-items:center;
    justify-content: space-evenly;
    max-width: 475px;
    justify-self: center;
    column-gap: 15px;
    row-gap: 10px;
    width: 80%;
}
</style>