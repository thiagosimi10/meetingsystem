<template>
    <div class="row">
        <div class="col-12">
            <card :title="card.title">
                <calendar style="height: 800px;"
                    :calendars="calendarList"
                    :schedules="scheduleList"
                    :view="view"
                />
            </card>
        </div>       
    </div>
</template>
<script>
import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'

export default {
    name: 'myCalendar',
    components: {
        'calendar': Calendar
    },
    data() {
        return {
            card: {
                title: "Reuniões Agendadas"
            },
            calendarList: [
                {
                    id: '0',
                    name: 'home'
                },
                {
                    id: '1',
                    name: 'office'
                }
            ],
            scheduleList: [
                {
                    id: '1',
                    calendarId: '1',
                    title: 'my schedule',
                    category: 'time',
                    dueDateClass: '',
                    start: '2021-05-05 22:30:00',
                    end: '2021-05-06 02:30:00'
                },
                {
                    id: '2',
                    calendarId: '1',
                    title: 'second schedule',
                    category: 'time',
                    dueDateClass: '',
                    start: '2018-10-18T17:30:00+09:00',
                    end: '2018-10-19T17:31:00+09:00'
                }
            ],
            view: 'month',
            taskView: false,
            scheduleView: ['time'],
            theme: {
                'month.dayname.height': '30px',
                'month.dayname.borderLeft': '1px solid #ff0000',
                'month.dayname.textAlign': 'center',
                'week.today.color': '#333',
                'week.daygridLeft.width': '100px',
                'week.timegridLeft.width': '100px'
            },
            week: {
                narrowWeekend: true,
                showTimezoneCollapseButton: true,
                timezonesCollapsed: false
            },
            month: {
                visibleWeeksCount: 6,
                startDayOfWeek: 1
            },
            timezones: [{
                timezoneName: 'America/Sao_Paulo',
                displayLabel: 'GMT+09:00',
                tooltip: 'São Paulo'
            }],
            disableDblClick: true,
            isReadOnly: false,
            template: {
                milestone: function(schedule) {
                    return `<span style="color:red;">${schedule.title}</span>`;
                },
                milestoneTitle: function() {
                    return 'MILESTONE';
                },
            },
            useCreationPopup: true,
            useDetailPopup: false,
        }
    }
}
</script>
<style>

</style>