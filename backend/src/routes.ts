import { Router } from "express";
import { createMeetingController } from "../api/useCases/CreateMeeting";

const router = Router()

router.get('/meetings/list', (request, response) => {
    return createMeetingController.handle(request, response);
});

router.post('/meetings/save', (request, response) => {
    return createMeetingController.handle(request, response);
});

export { router }