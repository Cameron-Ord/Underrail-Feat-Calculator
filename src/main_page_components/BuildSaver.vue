<script setup>
import axios from 'axios';
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies();
const use_api = (data_array, input_tag_content) =>{
    console.log(data_array, input_tag_content)
    return new Promise((resolve, reject) => {
        axios({
            url: `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/savebuild`,
            method: "POST",
            data:{
                stats: data_array[0],
                skills: data_array[1],
                feats: data_array[2],
                title: input_tag_content,
                client_id: data_array[3],
                session_token: data_array[4],
            }
        }).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    })
}

const retrieve_cookies = () => {
    const item_array = [
        cookies.get('stat_array_values'),
        cookies.get('skill_array_values'),
        cookies.get('chosen_feats'),
        cookies.get('Client_ID'),
        cookies.get('Client_Session_Token'),
    ];
    const parsed_array = [];
    for(let i = 0; i < item_array.length; i++){
        const item = item_array[i];
        console.log(item)
        try{
            parsed_array.push(JSON.parse(item)); 
        } catch (error) {
            console.log('Error parsing JSON on: ', item);
        }
    }
    console.log(parsed_array, "ITEM ARRAY")
    return parsed_array
}

const submit_build = async (input_tag_content) => {
    if(input_tag_content !== ""){
        const item_array = retrieve_cookies();
        let no_missing_data = true;
        for(let i = 0; i < item_array.length; i++){
            const item = item_array[i];
            console.log(item)
            if(item === null){
                no_missing_data = false;
            }
        }
        if(no_missing_data){
            const response = await use_api(item_array,input_tag_content);
            console.log(response.status)
        } else {
            console.error('Missing Data');
        }
    }
}
</script>

<template>
    <div class="build_saver">
        <input type="text" placeholder="Enter build name.." ref="build_input">
        <h3 @click="submit_build($refs.build_input.value)">Submit</h3>
    </div>
</template>

<style lang="scss" scoped>
.build_saver{
    display: grid;
    align-items: center;
    justify-items: center;
    >input{
        text-align: center;
    }
    >h3{
        text-align: center;
    }
}
</style>