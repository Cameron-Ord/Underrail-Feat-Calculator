<template>
    <div class="view_div">
        <h3 @click="send_input(this.$refs.stats)" ref="stats">View Stats</h3>
    </div>
</template>

<script>
    export default {
        methods:{
            send_input(stats_ref){
                const stats_ref_text = stats_ref.textContent.replace(/ /g, "_");
                this.$emit('send_input',stats_ref_text);
            }
        }
    }
</script>

<style lang="scss" scoped>
h3{
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7.5px;
    padding-right: 7.5px;
    border: solid var(--orange) 1px;
    border-radius: 10px;
    cursor: pointer;
}

@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>