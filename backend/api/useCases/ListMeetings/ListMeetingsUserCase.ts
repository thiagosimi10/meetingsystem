import { Meetings } from "../../entities/Meetings";
import { IMeetingsRepository } from "../../repositories/IMeetingsRepository";

export class ListMeetingsUserCase {

    constructor(
        private meetingRepository: IMeetingsRepository,
    ) {}

    async list() {
        const listMeetings = this.meetingRepository.listAll();

        return listMeetings;
    }

}