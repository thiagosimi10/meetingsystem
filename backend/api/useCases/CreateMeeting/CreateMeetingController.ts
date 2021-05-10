import { Request, Response } from "express";
import { CreateMeetingUserCase } from "./CreateMeetingUserCase";

export class CreateMeetingController {
    constructor(
        private createMeetingUserCase: CreateMeetingUserCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { calendarId, title, category, start, end } = request['body'];

        try {
            await this.createMeetingUserCase.execute({
                calendarId,
                title,
                category,
                start,
                end
            })

            return response.status(201).send('<p>Email enviado com sucesso</p>');
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Error.'
            })
        }   
    }
}