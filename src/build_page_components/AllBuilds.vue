
<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
const all_builds = ref([])
let index = ref(0)
const build_API = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/get-all-builds`,
            method: "GET",
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

const get_all_builds = async () => {
    const response = await build_API();
    if (response.statusText === "OK") {
        all_builds.value = response['data'];
    }
}
const decrement = () => {
        
    let all_b_div = document.querySelector('.all_builds');
    all_b_div.style.opacity = '0';
    setTimeout(()=>{
    if (index.value < all_builds.value.length) {
        let index_copy = index.value;
        index_copy = (index.value - 1 + all_builds.value.length) % all_builds.value.length;
        index.value = index_copy;
    }
    }, 300)
}

const increment = () => {

    let all_b_div = document.querySelector('.all_builds');
    all_b_div.style.opacity = '0';
    setTimeout(()=>{
    if (index.value < all_builds.value.length) {
        let index_copy = index.value;
        index_copy = (index.value + 1) % all_builds.value.length;
        index.value = index_copy;
    }
    }, 300)

}
onBeforeMount(() => {
    get_all_builds()

})

onUpdated(()=>{
    let all_b_div = document.querySelector('.all_builds');
    setTimeout(()=>{
        if(all_b_div !== null){
            all_b_div.style.opacity = '1';
        }
    }, 100)
})
</script>

<template>
    <div class="all_builds">

        <div class="build_title" v-if="all_builds.length > 0">
            <div class="item_wrapper">
                <h3>{{all_builds[index]['Build_Title']}}</h3>
            </div>
        </div>

        <div class="build_feats" v-if="all_builds.length > 0">
            <div class="item_wrapper">
                
            </div>
        </div>

        <div class="build_skills" v-if="all_builds.length > 0">

        </div>

        <div class="build_stats" v-if="all_builds.length > 0">
            
        </div>
        
        <div class="index_controls">
            <p @click="decrement">Previous</p>
            <p @click="increment">Next</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.all_builds {
}
@media only screen and (min-width: 770px) {
}
@media only screen and (min-width: 1024px) {
}
</style>
