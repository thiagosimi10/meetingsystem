import { Request, Response } from "express";
import { ListMeetingUserCase } from "./ListMeetingsUserCase";

export class ListMeetingController {
    constructor(
        private listMeetingUserCase: ListMeetingUserCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            return this.listMeetingUserCase.list();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Error.'
            })
        }   
    }
}