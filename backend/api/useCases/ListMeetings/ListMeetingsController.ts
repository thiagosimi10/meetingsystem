import { Request, Response } from "express";
import { ListMeetingsUserCase } from "./ListMeetingsUserCase";

export class ListMeetingsController {
    constructor(
        private listMeetingsUserCase: ListMeetingsUserCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try { 
            return response.status(200).json(
                await this.listMeetingsUserCase.list()
            )
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Error.'
            })
        }   
    }
}