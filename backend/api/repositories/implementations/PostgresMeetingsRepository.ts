import { Meetings } from "../../entities/Meetings";
import { IMeetingsRepository } from "../IMeetingsRepository";


export class PostgresMeetingsRepository implements IMeetingsRepository {
    private meetings: Meetings[] = [];

    async findByPeriod(start: string): Promise<Meetings> {
        const meeting = this.meetings.find(start => meeting.start === start);

        return meeting;
    }

    async save(meeting: Meetings): Promise<void> {
        this.meetings.push(meeting);
    }

    async listAll(): Promise<Meetings> {
        const meeting = this.meetings.find(id => meeting.id > id);

        return meeting;
    }
}