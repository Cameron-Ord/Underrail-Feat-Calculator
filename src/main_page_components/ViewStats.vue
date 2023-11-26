<template>
    <div>
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

</style>