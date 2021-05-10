import { Meetings } from "../../entities/Meetings";
import { IMeetingsRepository } from "../../repositories/IMeetingsRepository";

export class ListMeetingUserCase {

    constructor(
        private meetingRepository: IMeetingsRepository,
    ) {}

    async list() {
        const listMeetings = await this.meetingRepository.listAll();

        return listMeetings;
    }

}