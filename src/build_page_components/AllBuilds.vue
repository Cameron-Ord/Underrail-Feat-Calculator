
<script setup>
import axios from 'axios';
import { onBeforeMount, onUpdated, ref, version } from 'vue';
const all_builds = ref([])
const all_builds_map = new Map;
const current_build = ref(undefined)
const viewing = ref("")
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

const create_map = (resp_data) => {
    let builds_map = new Map();
    for(let i = 0; i < resp_data.length; i++){
        const build_title = resp_data[i]['Build_Title'];
        
        if(!builds_map.has(build_title)){
            builds_map.set(build_title, []);
        }
        builds_map.get(build_title).push(resp_data[i]);
    }
   
    if(builds_map.size > 0) {
        all_builds_map.value = new Map(builds_map);
    }
}

const get_item_from_map = (event) => {
    const item_name = event.target.innerText;
    const build_item = all_builds_map.value;
    const current_build_object = build_item.get(item_name);
    current_build.value = current_build_object[0];
    console.log(current_build.value.Feat_Slice.length)
} 

const get_all_builds = async () => {
    const response = await build_API();
    if (response.statusText === "OK") {
        const resp_data = response['data'];
        all_builds.value = resp_data;
        create_map(resp_data);
    }
}

const handle_toggle_bitems = (event) => {
    const text = event.target.innerText;
    if(text !== "" || undefined){
        viewing.value = text;
    }
}

onBeforeMount(() => {
    get_all_builds()
});

onUpdated(()=>{
    let all_b_div = document.querySelector('.all_builds');
    setTimeout(()=>{
        if(all_b_div !== null){
            all_b_div.style.opacity = '1';
        }
    }, 100);
})
</script>

<template>
    <div class="all_builds">
        <div class="build_title" v-if="all_builds.length > 0">
            <h3 
            @click="get_item_from_map($event)"
            v-for="(item, i) in all_builds" :key="i"
            >{{all_builds[i]['Build_Title']}}</h3>
        </div>

        <div class="build_feats" v-if="current_build !== undefined && current_build.Feat_Slice.length > 0 && viewing === 'Feats'">
            <div class="loop_div" v-for="(feat, nm) in current_build.Feat_Slice" :key="nm">
                <p>
                    {{ feat['Name'] }}
                </p>
            </div>
        </div>

        <div class="build_skills" v-if="current_build !== undefined && current_build.Skill_Slice.length > 0 && viewing === 'Skills'">
            <div class="loop_div" v-for="(feat, sk) in current_build.Skill_Slice" :key="sk">
                <p>
                    {{ feat['Name'] }}
                </p>
                <p>
                    {{ feat['Value'] }}
                </p>
            </div>
        </div>

        <div class="build_stats" v-if="current_build !== undefined && current_build.Stat_Slice.length > 0 && viewing === 'Stats'">
            <div class="loop_div" v-for="(feat, sk) in current_build.Stat_Slice" :key="sk">
                <p>
                    {{ feat['Name'] }}
                </p>
                <p>
                    {{ feat['Value'] }}
                </p>
            </div>
        </div>

        <div class="controls_div" v-if="current_build !== undefined && current_build.Feat_Slice.length">
            <h4 class="ctrls_tag" @click="handle_toggle_bitems($event)">Feats</h4>
            <h4 class="ctrls_tag" @click="handle_toggle_bitems($event)">Skills</h4>
            <h4 class="ctrls_tag" @click="handle_toggle_bitems($event)">Stats</h4>
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
