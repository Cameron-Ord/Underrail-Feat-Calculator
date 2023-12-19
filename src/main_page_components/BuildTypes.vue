
<template>
    <div class="class_types_div">
        <p @click="toggle_type($event)">Knife</p>
        <p @click="toggle_type($event)">Sword</p>
        <p @click="toggle_type($event)">Fist</p>
        <p @click="toggle_type($event)">Spear</p>
        <p @click="toggle_type($event)">Hammer</p>
        <p @click="toggle_type($event)">Pistol</p>
        <p @click="toggle_type($event)">Assault Rifle</p>
        <p @click="toggle_type($event)">Enery Pistol</p>
        <p @click="toggle_type($event)">Throwing Knives</p>
        <p @click="toggle_type($event)">Crossbow</p>
        <p @click="toggle_type($event)">Jetski</p>
        <p @click="toggle_type($event)">Sniper Rifle</p>
        <p @click="toggle_type($event)">Stealth</p>
        <p @click="toggle_type($event)">Spear</p>
        <p @click="toggle_type($event)">Traps</p>
        <p @click="toggle_type($event)">Crafting</p>
        <p @click="toggle_type($event)">Throwing</p>
        <p @click="toggle_type($event)">Grenades</p>
        <p @click="toggle_type($event)">Shotgun</p>
        <p @click="toggle_type($event)">Thought Control</p>
        <p @click="toggle_type($event)">Metathermics</p>
        <p @click="toggle_type($event)">Psychokinesis</p>
        <p @click="toggle_type($event)">Temporal Manipulation</p>
    </div>
</template>

<script setup>
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies();

const remove_from_array = (array, index) =>{
    console.log("SENT: ",array)
    array.splice(index, 1);
    cookies.set('char_types_array', JSON.stringify(array));
    console.log("RETURNED: ",array)
    return array;
}

const add_to_array = (event, sent_array) =>{
    sent_array.push(event.target.innerText)
    cookies.set('char_types_array', JSON.stringify(sent_array))
}

const toggle_type = (event)=>{
    const type_arr_copy = cookies.get('char_types_array');
    const _parsed_ = JSON.parse(type_arr_copy);
    if(_parsed_ === null){
        console.log('Was null')
        let arr = []
        add_to_array(event, arr);
        return
    }

    if(_parsed_.length === 0){
        console.log('Was []')
        let arr = []
        add_to_array(event, arr);
        return
    }

    const items_to_remove = []
    for(let i = 0; i < _parsed_.length; i++){
        const arr_substr = _parsed_[i];
        if(arr_substr === event.target.innerText){
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
        return
    }

    add_to_array(event, _parsed_);
}

</script>

<style lang="scss" scoped>

</style>