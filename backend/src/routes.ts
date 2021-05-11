import { Router } from "express";
import { createMeetingController } from "../api/useCases/CreateMeeting";
import { listMeetingsController } from "../api/useCases/ListMeetings";

var express = require('express')
var cors = require('cors')
var app = express()

const router = Router()

router.get('/meetings/list', cors(), (request, response) => {
    return listMeetingsController.handle(request, response);
});

router.post('/meetings/save', (request, response) => {
    return createMeetingController.handle(request, response);
});

export { router }