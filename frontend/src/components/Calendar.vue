<template>
    <div>
        <h1>🍞📅 </h1>
        <div>
            <select v-model="selectedView">
                <option v-for="(options, index) in viewModeOptions" :value="options.value" :key="index">
                    {{options.title}}
                </option>
            </select>
            <span @click="onClickNavi($event)">
                <button type="button" class="btn btn-default btn-sm move-today" data-action="move-today">Hoje</button>
                <button type="button" class="btn btn-default btn-sm move-day" data-action="move-prev">Anterior</button>
                <button type="button" class="btn btn-default btn-sm move-day" data-action="move-next">Próximo</button>
            </span>
            <span class="render-range" style="color: beige;">{{dateRange}}</span>
        </div>
        <calendar style="height: 800px"
            ref="tuiCal"
            :useDetailPopup="useDetailPopup"
            :view="selectedView"
            :calendars="calendarList"
            :schedules="scheduleList"
            :theme="theme"
            :template="template"
            :taskView="true"
            :scheduleView="true"
            :month="month"
            :week="week"
            :timezones="timezones"
            :disableDblClick="disableDblClick"
            :isReadOnly="isReadOnly"
            @clickSchedule="onClickSchedule"
            @clickDayname="onClickDayname"
            @beforeDeleteSchedule="onBeforeDeleteSchedule"
            @afterRenderSchedule="onAfterRenderSchedule"
            @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
            />
    </div>
</template>
<script>
import { Calendar } from '@toast-ui/vue-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { meetingService } from '@/services/meeting.service';

export default {
    name: 'myCalendar',
    components: {
        'calendar': Calendar
    },
     data() {
        return {
            viewModeOptions: [
                {
                    title: 'Mensal',
                    value: 'month'
                },
                {
                    title: 'Semanal',
                    value: 'week'
                },
                {
                    title: 'Diário',
                    value: 'day'
                }
            ],
            calendarList: [
                {
                    id: '0',
                    name: 'Equipe',
                    bgColor: '#9e5fff',
                    borderColor: '#9e5fff'
                },
                {
                    id: '1',
                    name: 'Workshop',
                    bgColor: '#00a9ff',
                    borderColor: '#00a9ff'
                },
                {
                    id: '2',
                    name: 'Feature',
                    bgColor: '#bbdc00',
                    borderColor: '#bbdc00'
                },
                {
                    id: '3',
                    name: 'BugFix',
                    bgColor: '#ff4040',
                    borderColor: '#ff4040'
                }
            ],
            scheduleList: [],
            dateRange: '',
            selectedView: 'month',
            taskView: true,
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
                timezonesCollapsed: false,
                daynames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            },
            month: {
                visibleWeeksCount: 6,
                startDayOfWeek: 1,
                daynames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
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
                    return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
                },
                milestoneTitle: function() {
                    return 'Marco Histórico';
                },
                task: function(schedule) {
                    return '&nbsp;&nbsp;#' + schedule.title;
                },
                taskTitle: function() {
                    return 'Tarefa';
                },
                allday: function(schedule) {
                    return schedule.title + ' <i class="fa fa-refresh"></i>';
                },
                alldayTitle: function() {
                    return 'Dia Todo';
                },
                time: function(schedule) {
                    return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
                }
            },
            useCreationPopup: true,
            useDetailPopup: true,
        }
    },
    watch: {
        selectedView(newValue) {
            this.$refs.tuiCal.invoke('changeView', newValue, true);
            this.setRenderRangeText();
        }
    },
    methods: {
        loadMeetings() {
            meetingService.list()
                .then((resp) => {
                    this.scheduleList = resp.meetingRepository.meetings;
                    console.log(resp.meetingRepository.meetings);
                })
                .catch((err) => {
                    meetingService.handleError(err);
                });
        },
        setRenderRangeText() {
            const {invoke} = this.$refs.tuiCal;
            const view = invoke('getViewName');
            const calDate = invoke('getDate');
            const rangeStart = invoke('getDateRangeStart');
            const rangeEnd = invoke('getDateRangeEnd');
            let year = calDate.getFullYear();
            let month = calDate.getMonth() + 1;
            let date = calDate.getDate();
            let dateRangeText = '';
            let endMonth, endDate, start, end;
            switch (view) {
            case 'month':
                dateRangeText = `${year}-${month}`;
                break;
            case 'week':
                year = rangeStart.getFullYear();
                month = rangeStart.getMonth() + 1;
                date = rangeStart.getDate();
                endMonth = rangeEnd.getMonth() + 1;
                endDate = rangeEnd.getDate();
                start = `${year}-${month}-${date}`;
                end = `${endMonth}-${endDate}`;
                dateRangeText = `${start} ~ ${end}`;
                break;
            default:
                dateRangeText = `${year}-${month}-${date}`;
            }
            this.dateRange = dateRangeText;
        },
        onClickNavi(event) {
            if (event.target.tagName === 'BUTTON') {
                const {target} = event;
                let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
                action = action.replace('move-', '');
                this.$refs.tuiCal.invoke(action);
                this.setRenderRangeText();
            }
        },
        onClickSchedule(res) {
            console.group('onClickSchedule');
            console.log('MouseEvent : ', res.event);
            console.log('Calendar Info : ', res.calendar);
            console.log('Schedule Info : ', res.schedule);
            console.groupEnd();
        },
            onClickDayname(res) {
            // view : week, day
            console.group('onClickDayname');
            console.log(res.date);
            console.groupEnd();
        },
            onBeforeDeleteSchedule(res) {
            console.group('onBeforeDeleteSchedule');
            console.log('Schedule Info : ', res.schedule);
            console.groupEnd();
            const idx = this.scheduleList.findIndex(item => item.id === res.schedule.id);
            this.scheduleList.splice(idx, 1);
        },
            onAfterRenderSchedule(res) {
            console.group('onAfterRenderSchedule');
            console.log('Schedule Info : ', res.schedule);
            console.groupEnd();
        },
            onClickTimezonesCollapseBtn(timezonesCollapsed) {
            // view : week, day
            console.group('onClickTimezonesCollapseBtn');
            console.log('Is Collapsed Timezone? ', timezonesCollapsed);
            console.groupEnd();
            if (timezonesCollapsed) {
                this.theme['week.timegridLeft.width'] = '100px';
                this.theme['week.daygridLeft.width'] = '100px';
            } else {
                this.theme['week.timegridLeft.width'] = '50px';
                this.theme['week.daygridLeft.width'] = '50px';
            }
        }
    },
    mounted() {
        this.setRenderRangeText();
        this.loadMeetings();
    },
}
</script>
<style>
body {
    font-family: 'Noto Sans', sans-serif;
    color: '#333';
    font-size: 12px;
}

/**  custom bootstrap - start */
.btn {
    border-radius: 25px;
    border-color: #ddd;
}

.btn:hover {
    border: solid 1px #bbb;
    background-color: #fff;
}

.btn:active {
    background-color: #f9f9f9;
    border: solid 1px #bbb;
    outline: none;
}

.btn:disabled {
    background-color: #f9f9f9;
    border: solid 1px #ddd;
    color: #bbb;
}

.btn:focus:active, .btn:focus, .btn:active {
    outline: none;
}

.open > .dropdown-toggle.btn-default {
    background-color: #fff;
}

.dropdown-menu {
    top: 25px;
    padding: 3px 0;
    border-radius: 2px;
    border: 1px solid #bbb;
}

.dropdown-menu > li > a {
    padding: 9px 12px;
    cursor: pointer;
}

.dropdown-menu > li > a:hover {
    background-color: rgba(81, 92, 230, 0.05);
    color: #333;
}

.bi15 {
    width: 15px;
    height: 15px;
}
/** custom fontawesome - end */

.calendar-icon {
    width: 14px;
    height: 14px;
}

#top {
    height: 49px;
    border-bottom: 1px solid #bbb;
    padding: 16px;
    font-size: 10px;
}

#lnb {
    position: absolute;
    width: 200px;
    top: 49px;
    bottom: 0;
    border-right: 1px solid #d5d5d5;
    padding: 12px 10px;
    background: #fafafa;
}

#right {
    position: absolute;
    left: 200px;
    top: 49px;
    right: 0;
    bottom: 0;
}

#lnb label {
    margin-bottom: 0;
    cursor: pointer;
}

.lnb-new-schedule {
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e5e5;
}

.lnb-new-schedule-btn {
    height: 100%;
    font-size: 14px;
    background-color: #ff6618;
    color: #ffffff;
    border: 0;
    border-radius: 25px;
    padding: 10px 20px;
    font-weight: bold;
}

.lnb-new-schedule-btn:hover {
    height: 100%;
    font-size: 14px;
    background-color: #e55b15;
    color: #ffffff;
    border: 0;
    border-radius: 25px;
    padding: 10px 20px;
    font-weight: bold;
}

.lnb-new-schedule-btn:active {
    height: 100%;
    font-size: 14px;
    background-color: #d95614;
    color: #ffffff;
    border: 0;
    border-radius: 25px;
    padding: 10px 20px;
    font-weight: bold;
}

.lnb-calendars > div {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e5e5;
    font-weight: normal;
}

.lnb-calendars-d1 {
    padding-left: 8px;
}

.lnb-calendars-d1 label {
    font-weight: normal;
}

.lnb-calendars-item {
    min-height: 14px;
    line-height: 14px;
    padding: 8px 0;
}

.lnb-footer {
    color: #999;
    font-size: 11px;
    position: absolute;
    bottom: 12px;
    padding-left: 16px;
}

#menu {
    padding: 16px;
}

#dropdownMenu-calendarType {
    padding: 0 8px 0 11px;
}

#calendarTypeName {
    min-width: 62px;
    display: inline-block;
    text-align: left;
    line-height: 30px;
}

.move-today {
    padding: 0 16px;
    line-height: 30px;
}

.move-day {
    padding: 8px;
}

.render-range {
    padding-left: 12px;
    font-size: 19px;
    vertical-align: middle;
}

.dropdown-menu-title .calendar-icon {
    margin-right: 8px;
}

.calendar-bar {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    display: inline-block;
    border: 1px solid #eee;
    vertical-align: middle;
}

.calendar-name {
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
}

.schedule-time {
    color: #005aff;
}

#calendar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    top: 64px;
}

/** custom fontawesome */
.fa {
    width: 12px;
    height: 12px;
    margin-right: 2px;
}

.tui-full-calendar-month-week-item .tui-full-calendar-today .tui-full-calendar-weekday-grid-date-decorator {
    background-color: #009688;
}
</style>
