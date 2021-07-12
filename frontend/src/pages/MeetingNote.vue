<template>
    <div class="row">
        <div class="col-12">
            <card :title="card.title">
                <table-list></table-list>  
            </card>
        </div>       
    </div>
</template>
<script>
import Calendar from '@/components/Calendar';
import TableList from './TableList.vue';

export default {
    name: 'meetingnote',
    components: {        
        TableList
    },
    data() {
        return {
            card: {
                title: "Atas!"
            },
        }
    }
}
</script>
<style>

</style>