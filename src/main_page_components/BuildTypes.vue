
<template>
    <div>
        <p @click="toggle_type($event)">Knife</p>
    </div>
</template>

<script setup>
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies();

const remove_from_array = (array, index) =>{
    array.splice(index, 1);
    cookies.set('char_types_array', JSON.stringify(array))
    return array;
}

const add_to_array = (item, sent_array) =>{
    sent_array.push(item)
    cookies.set('char_types_array', JSON.stringify(sent_array))
}

const toggle_type = (event)=>{
    const type_arr_copy = cookies.get('char_types_array');
    const _parsed_ = JSON.parse(type_arr_copy);
    if(_parsed_ === null){
        let arr = []
        add_to_array(event.target.innerText, arr);
        return
    }

    if(_parsed_.length === 0){
        let arr = []
        add_to_array(event.target.innerText, arr);
        return
    }

    let trimmed_array;
    for(let i = 0; i < _parsed_.length; i++){
        trimmed_array = undefined;
        const arr_substr = _parsed_[i];
        if(arr_substr === event.target.innerText){
            trimmed_array = remove_from_array(_parsed_, i);
        }
    }
    if(trimmed_array.length === 0){
        console.log("Trimming created empty array");
        cookies.remove('char_types_array');
        return
    }

    add_to_array(event.target.innerText, _parsed_);

}

</script>

<style lang="scss" scoped>

</style>