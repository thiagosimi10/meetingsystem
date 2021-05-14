import { Router } from "express";
import { createMeetingController } from "../api/useCases/CreateMeeting";
import { listMeetingsController } from "../api/useCases/ListMeetings";

var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const router = Router()

router.get('/meetings/list', cors(), (request, response) => {
    return listMeetingsController.handle(request, response);
});

router.post('/meetings/save', cors(), (request, response) => {
    return createMeetingController.handle(request, response);
});

export { router }