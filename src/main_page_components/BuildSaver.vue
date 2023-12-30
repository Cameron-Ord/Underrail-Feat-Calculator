<script setup>
import axios from 'axios';
import { onUpdated, ref } from 'vue';
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies();
const status = ref(undefined)
const use_api = (data_array, input_tag_content) =>{
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
        try{
            parsed_array.push(JSON.parse(item)); 
        } catch (error) {
            console.log('Error parsing JSON on: ', item);
        }
    }
    return parsed_array
}


const button_clicked = (tag) => {
    const win_size = window.innerWidth;
    if(win_size < 1024){
        tag.style.fontSize = '1.10rem';
    } else if (win_size >= 1024){
        tag.style.fontSize = '1.25rem';
    }
}

const reset_button = (tag) => {
    setTimeout(()=>{
     tag.style.fontSize = '';
    },300)
}
const submit_build = async (input_tag_content, event) => {

    button_clicked(event.target);
    if(input_tag_content !== ""){
        const item_array = retrieve_cookies();
        let no_missing_data = true;
        for(let i = 0; i < item_array.length; i++){
            const item = item_array[i];
            if(item === null){
                no_missing_data = false;
            }
        }
        if(no_missing_data){
            try{
                const response = await use_api(item_array,input_tag_content);
                
                if(response.statusText === "OK"){
                    status.value = "Build saved!";
                    reset_button(event.target);
                } else {
                    reset_button(event.target);
                    status.value = "Error saving build";
                }
            } catch (err) {
                status.value = "Build name already exists."
                console.log("Failed to resolve promise: ", err.response);   
                reset_button(event.target);
            }
        } else {
            status.value = "Required data is missing";
            console.error('Missing Data');
            reset_button(event.target);
        }
    } else {
        status.value = "Enter a build name!";
        reset_button(event.target);
    }
}

onUpdated(()=>{
    let status_tag = document.querySelector('.status_tag_saver');
    if(status_tag !== null){

        setTimeout(()=>{
            status_tag.style.opacity = '1';
        }, 100)
    
        setTimeout(()=>{
            status_tag.style.opacity = '0';
        
            setTimeout(()=>{
                status.value = undefined
            },500)
        }, 1500)
    }
})
</script>

<template>
    <div class="build_saver">
        <p v-if="status !== undefined" class="status_tag_saver">{{status}}</p>
        <input type="text" placeholder="Enter build name.." ref="build_input">
        <h3 class="submit_tag" @click="submit_build($refs.build_input.value, $event)">Submit</h3>
    </div>
</template>

<style lang="scss" scoped>

.status_tag_saver{
    opacity: 0;
    transition: 0.3s ease-in-out;
}

.build_saver{
    display: grid;
    align-items: center;
    justify-items: center;
    row-gap: 25px;
    >input{
        box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.2);
        border-width: 1px;
        border-radius: 5px;
        border-color: var(--orange);
        padding: 2.5px;
        background-color: var(--black);
        text-align: center;
        color: var(--orange);
        font-weight: 900;
        width: 70%;
        font-size: 16px;
        max-width: 175px;
    }
    >h3{
        transition: 0.3s ease-in-out;
        text-align: center;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 5.5px;
        padding-right: 5.5px;
        border: solid var(--orange) 1px;
        border-radius: 10px;
        cursor: pointer;
        justify-self: center;
    }
}
@media only screen and (min-width: 770px){
    .build_saver{
 
    >input{
        
    }
    >h3{
   
    }
}
}

@media only screen and (min-width: 1024px){
    .build_saver{
 
 >input{


 }
 >h3{

 }
}
}
</style>
