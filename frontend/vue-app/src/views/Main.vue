<template>
    <div class="am-wrapper">
        <side-bar></side-bar>
    </div>
</template>
<script>
import Sidebar from '@/components/Sidebar/Sidebar.vue'
export default {
    components: {
        Sidebar
    },
    data () {
        return {
            showModal: false
        }
    }
}
</script>
