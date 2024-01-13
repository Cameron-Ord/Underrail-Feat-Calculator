
<script setup>
import axios, { all } from 'axios';
import { nextTick, onBeforeMount, onBeforeUpdate, onUpdated, ref } from 'vue';
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

const click_effect = (event) => {
    event.target.style.backgroundColor = 'var(--orange_rgba)';

    if(window.innerWidth < 1024){
        event.target.style.fontSize = '1.10rem';
    } else if (window.innerWidth >= 1024){
        event.target.style.fontSize = '1.25rem';
    }
    setTimeout(()=>{
            event.target.style.backgroundColor = '';
            event.target.style.fontSize = '';
    }, 300)
}

const get_item_from_map = (event) => {
    click_effect(event);
    const item_name = event.target.innerText;
    current_build.value = undefined
    let build_item;
    if(item_name !== ''){
        build_item = all_builds_map.value;
    }

    let current_build_object;
    if(build_item !== undefined || build_item !== null){
        current_build_object = build_item.get(item_name);
    }


    nextTick(()=>{
        if(current_build_object !== undefined || current_build_object !== null){
            current_build.value = current_build_object[0];
        }
    })
} 

const get_all_builds = async () => {
    try {
        const response = await build_API();
        if (response.statusText === "OK") {
            const resp_data = response['data'];
            all_builds.value = resp_data;
            create_map(resp_data);
        }
    } catch (err) {
        console.log("Promise was rejected: ", err);
        all_builds.value = new Array;
    }
}

const handle_toggle_bitems = (event) => {
    click_effect(event);
    const text = event.target.innerText;
    if(text !== "" || undefined){
        viewing.value = text;
    }
}

onBeforeMount(() => {
    get_all_builds()
});

const make_item_visible = (wrapper_div) =>{
    const div_children = wrapper_div.childNodes;
    if(div_children.length !== null){
        for(let n = 0; n < div_children.length; n ++){
            const child = div_children[n]
            let exists;
            let contains;
            if(child.nodeType === 1 && child['data'] !== "v-if"){
                exists = true;
                try{
                    if(child.classList.contains('b_item')){
                        contains = true;
                    }
                } catch (error) {
                    console.log('error: ', error)
                }
            }
            if(exists && contains){
                nextTick(()=>{
                    setTimeout(()=>{
                        child.style.opacity = '1';
                    }, 100)
                })
            }
        }
    }
}

onUpdated(()=>{

    let ctrls_div = document.querySelector('.allb_controls_div');
    let all_b_div = document.querySelector('.all_builds');

    if(all_b_div !== null){
        nextTick(()=>{
            setTimeout(()=>{
                all_b_div.style.opacity = '1';
            }, 100)
        })
    }
    if(ctrls_div !== null && !ctrls_div.classList.contains('is_present')) {
        
        nextTick(()=>{
            setTimeout(()=>{
                ctrls_div.classList.add('is_present');
            }, 100)
        })
    }
    let wrapper_div = document.querySelector('.build_selection_wrapper')
    make_item_visible(wrapper_div);
})

onBeforeUpdate(()=>{

})


</script>

<template>
    <div class="all_builds">
        <div class="build_title" v-if="all_builds.length > 0 && all_builds !== undefined">
            <h3 
            @click="get_item_from_map($event)"
            v-for="(item, i) in all_builds" :key="i"
            >{{all_builds[i]['Build_Title']}}</h3>
        </div>

        <div class="build_selection_wrapper">
            <div class="build_name b_item" v-if="current_build !== undefined && current_build.Build_Title !== undefined">
                <p>
                    Selected: 
                </p>
                <h4>{{ current_build.Build_Title }}</h4>
            </div>

            <div class="build_feats b_item" v-if="current_build !== undefined && current_build.Feat_Slice.length > 0 && viewing === 'Feats'">
                <div class="allb_loop_div" v-for="(feat, nm) in current_build.Feat_Slice" :key="nm">
                    <p>
                        {{ feat['Name'] }}
                    </p>
                </div>
            </div>

            <div class="build_skills b_item" v-if="current_build !== undefined && current_build.Skill_Slice.length > 0 && viewing === 'Skills'">
                <div class="allb_loop_div" v-for="(skill, sk) in current_build.Skill_Slice" :key="sk">
                    <p>
                        {{ skill['Name'] }}
                    </p>
                    <p>
                        {{ skill['Value'] }}
                    </p>
                </div>
            </div>

            <div class="build_stats b_item" v-if="current_build !== undefined && current_build.Stat_Slice.length > 0 && viewing === 'Stats'">
                <div class="allb_loop_div" v-for="(stat, sk) in current_build.Stat_Slice" :key="sk">
                    <p>
                        {{ stat['Name'] }}
                    </p>
                    <p>
                        {{ stat['Value'] }}
                    </p>
                </div>
            </div>

            <div class="allb_controls_div" v-if="current_build !== undefined">
                <h3 class="ctrls_tag" @click="handle_toggle_bitems($event)">Feats</h3>
                <h3 class="ctrls_tag" @click="handle_toggle_bitems($event)">Skills</h3>
                <h3 class="ctrls_tag" @click="handle_toggle_bitems($event)">Stats</h3>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.all_builds {
    display: grid;
    align-items: center;
    row-gap: 25px;
    opacity: 0;
    transition: 0.3s ease-in-out;

    >.build_title{
        padding-top: 10px;
        padding-bottom: 10px;
        justify-self: center;
        display: flex;
        flex-wrap: wrap;
        column-gap: 25px;
        row-gap: 25px;
        width: 80%;
        height: 300px;
        overflow-y: auto;
        align-items: center;
        justify-content: space-evenly;
        >h3{
            word-break: break-word;
            transition: 0.3s ease-in-out;
            border: solid var(--orange) 1px;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
    }

    >.build_selection_wrapper{
        display: grid;
        align-items: center;
        justify-items: center;
        row-gap: 50px;

        >.build_name{
            opacity: 0;
            transition: 0.3s ease-in-out;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            column-gap: 10px;
        }

        >.allb_controls_div.is_present {
            opacity: 1;
        }
        >.allb_controls_div{
            opacity: 0;
            transition: 0.3s ease-in-out;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-evenly;
            column-gap: 25px;
            row-gap: 15px;

            >h3{
                transition: 0.3s ease-in-out;
                border: solid var(--orange) 1px;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
            }
        }

        >.build_stats{
            padding: 10px;
            border-radius: 5px;
            border: solid var(--orange) 1px;
            opacity: 0;
            transition: 0.3s ease-in-out;
            display: grid;
            align-items: center;
            justify-items: center;
            width: 80%;
            row-gap: 10px;
            >.allb_loop_div{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 95%;
                column-gap: 15px
            }
        }

        >.build_skills{
            padding: 10px;
            border-radius: 5px;
            border: solid var(--orange) 1px;
            opacity: 0;
            transition: 0.3s ease-in-out;
            display: grid;
            align-items: center;
            justify-items: center;
            width: 80%;
            row-gap: 10px;
            >.allb_loop_div{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 95%;
                column-gap: 15px
            }
        }
        >.build_feats{
            padding: 10px;
            border-radius: 5px;
            border: solid var(--orange) 1px;
            opacity: 0;
            transition: 0.3s ease-in-out;
            display: flex;
            flex-wrap: wrap;
            max-width: 80%;
            align-items: center;
            justify-content: space-evenly;
            row-gap: 15px;
            column-gap: 25px;
            >.allb_loop_div{
                text-align: center;
                display: flex;
                flex-wrap: wrap;
                >p{

                }
            }
        }
    }
}
@media only screen and (min-width: 770px) {
    .all_builds {

    >.build_title{
        width: 60%;
        height: 250px;
    }

    >.build_selection_wrapper{

        >.build_name{
        }

        >.allb_controls_div.is_present {
        }
        >.allb_controls_div{

            >h4{
            }
        }

        >.build_stats{
            width: 60%;

            >.allb_loop_div{
            }
        }

        >.build_skills{
            width: 60%;

            >.allb_loop_div{
            }
        }
        >.build_feats{
            max-width: 60%;
            >.allb_loop_div{
   
                >p{

                }
            }
        }
    }
}
}
@media only screen and (min-width: 1024px) {

    .all_builds {
        grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));

>.build_title{
 
    height: 400px;
    width: 70%;
}

>.build_selection_wrapper{

    >.build_name{
    }

    >.allb_controls_div.is_present {
    }
    >.allb_controls_div{

        >h4{
        }
    }

    >.build_stats{
        width: 70%;
        >.allb_loop_div{
        }
    }

    >.build_skills{
        width: 70%;
        >.allb_loop_div{
        }
    }
    >.build_feats{
        max-width: 70%;
        >.allb_loop_div{

            >p{

            }
        }
    }
}
}
}
</style>
