
<template>
    <div v-for="(item, i) in type_list" :key="i" class="class_types_div">
        <p v-if="type_list.length > 0" ref="item">{{ item }}</p>
        <img class="bt_tag_svg" v-if="svg_list.length > 0" :src="svg_list[i]" @click="toggle_type($refs.item, i, $event)" alt="a icon">
    </div>
</template>

<style lang="scss" scoped>

.class_types_div{
    opacity: 0;
    display: grid;
    align-items: center;
    justify-self: center;
    justify-items: center;
    text-align: center;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    row-gap: 15px;
    width: 90%;
    padding: 2px;
    >img{
        opacity: 0;
        padding:2.5px ;
        transition: 0.3s ease-in-out;
        border: solid var(--orange) 1px;
        border-radius: 6px;
    }
    >p{
        transition: 0.3s ease-in-out;
        cursor: pointer;
        padding-top: 2px;
        padding-right: 4px;
        padding-left: 4px;
        padding-bottom: 2px;
        border-radius: 7px;
    }

}

@media only screen and (min-width: 770px){
.class_types_div{
    width: 90%;
    >img{
        border: solid var(--orange) 1px;
        border-radius: 6px;
    }
    >p{
    }

}
}

@media only screen and (min-width: 1024px){
.class_types_div{
    
    width: 90%;
    >img{
        border: solid var(--orange) 1px;
        border-radius: 6px;
    }
    >p{
    }

}
}
</style>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useCookies } from 'vue3-cookies';

onMounted(()=>{
    let page = document.querySelectorAll('.class_types_div');
    for(let l = 0; l < page.length; l++){
        page[l]['style']['opacity'] = '1';
    }

    let images = document.querySelectorAll('.bt_tag_svg');
    console.log(images)
    let loadedImages = 0;

    function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            for(let j = 0; j < images.length; j++){
                images[j]['style']['opacity'] = '1';
            }
        }
    }

    for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
            checkAllImagesLoaded();
        } else {
            images[i].addEventListener('load', checkAllImagesLoaded);
        }
    }
})

const type_list = [
    'Knife', 'Sword', 'Fist', 'Spear',
    'Hammer', 'Pistol', 'Assault Rifle',
    'Enery Pistol', 'Throwing Knives', 'Crossbow',
    'Jetski', 'Sniper Rifle', 'Stealth', 'Spear',
    'Traps', 'Crafting', 'Throwing', 'Grenades',
    'Shotgun', 'Thought Control', 'Metathermics',
    'Psychokinesis', 'Temporal Manipulation'
]
const svg_list = ref([])
const plus = '/images/plus.svg';
const minus = '/images/minus.svg';
const {cookies} = useCookies();


onBeforeMount(()=>{
    cookies.remove('char_types_array');
    for(let i = 0; i<type_list.length; i++){
        svg_list.value.push(plus);
    }
})

const remove_from_array = (array, index) =>{
    array.splice(index, 1);
    cookies.set('char_types_array', JSON.stringify(array));
    return array;
}

const add_to_array = (ref, sent_array) =>{
    sent_array.push(ref.textContent)
    console.log(ref.textContent);
    cookies.set('char_types_array', JSON.stringify(sent_array))
}

const toggle_type = (ref, index, event)=>{
    const type_arr_copy = cookies.get('char_types_array');
    const _parsed_ = JSON.parse(type_arr_copy);
    if(_parsed_ === null){
        console.log('Was null')
        let arr = []
        add_to_array(ref[index], arr);
        event['target']['style']['width'] = '34px';
        event['target']['style']['background-color'] = 'var(--orange_rgba)';
        svg_list.value[index] = minus
        setTimeout(()=>{
            event['target']['style']['width'] = '';
            event['target']['style']['background-color'] = '';
        },175)
        return
    }

    if(_parsed_.length === 0){
        console.log('Was []')
        let arr = []
        add_to_array(ref[index], arr);
        event['target']['style']['width'] = '34px';
        event['target']['style']['background-color'] = 'var(--orange_rgba)';
        svg_list.value[index] = minus;
        setTimeout(()=>{
            event['target']['style']['width'] = '';
            event['target']['style']['background-color'] = '';
        },175)
        return
    }

    const items_to_remove = []
    for(let i = 0; i < _parsed_.length; i++){
        const arr_substr = _parsed_[i];
        if(arr_substr === ref[index].textContent){
            items_to_remove.push(i)
        }
    }

    let spliced_arr = undefined;
    if(items_to_remove.length > 0) {
        spliced_arr = [..._parsed_]
        for(let k = items_to_remove.length - 1; k >= 0; k--){
            const index = items_to_remove[k]
            spliced_arr = remove_from_array(spliced_arr, index);
        }
    }

    if(spliced_arr !== undefined){
        event['target']['style']['width'] = '34px';
        event['target']['style']['background-color'] = 'var(--orange_rgba)';
        svg_list.value[index] = plus;
        setTimeout(()=>{
            event['target']['style']['width'] = '';
            event['target']['style']['background-color'] = '';
        },175)
        return
    }

    add_to_array(ref[index], _parsed_);
    event['target']['style']['width'] = '34px';
    event['target']['style']['background-color'] = 'var(--orange_rgba)';
    svg_list.value[index] = minus;
    setTimeout(()=>{
        event['target']['style']['width'] = '';
        event['target']['style']['background-color'] = '';
    },175)
}

</script>

