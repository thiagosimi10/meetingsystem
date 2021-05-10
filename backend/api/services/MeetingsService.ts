var request = require('request');
var meetingsRepository = require('../repositories/MeetingsRepository');

var meetings = {
    getAll: function(req, res, next) {
        request(meetingsRepository, function (error, response, body) {
                console.log(response);
                res.send();
        });
    }
};

module.exports = meetings;