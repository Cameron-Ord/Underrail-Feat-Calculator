<script setup lang="ts">
import axios from 'axios'
import { onBeforeMount } from 'vue';
const fetch_db_builds = () => {
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

const get_builds = async () =>{
    const response = await fetch_db_builds()
    console.log(response)
}

onBeforeMount(()=>{
    get_builds()
})

</script>

<template>
    <article>

    </article>
</template>

<style lang="scss" scoped>

</style>