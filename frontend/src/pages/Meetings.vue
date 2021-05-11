<template>
    <div class="row">
        <div class="col-12">
            <card :title="card.title">
                <calendar/>
            </card>
        </div>       
    </div>
</template>
<script>
import Calendar from '@/components/Calendar';

export default {
    name: 'meetings',
    components: {
        'calendar': Calendar
    },
    data() {
        return {
            card: {
                title: "Reuniões Agendadas"
            },
        }
    }
}
</script>
<style>

</style>