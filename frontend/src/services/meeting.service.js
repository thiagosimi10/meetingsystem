import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

function list() {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:3000/meetings/list`,
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function save(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:3000/meetings/save`,
            method: 'POST',
            params: {
                calendarId: params.calendarId,
                title: params.title,
                location: params.location,
                category: "time",
                start: params.start,
                end: params.end
            },
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export const meetingService = {
    handleError(err) { defaultErrorHandler.handle(err); },
    list,
    save,
};
