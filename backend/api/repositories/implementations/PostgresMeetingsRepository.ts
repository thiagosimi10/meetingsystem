import { Meetings } from "../../entities/Meetings";
import { IMeetingsRepository } from "../IMeetingsRepository";


export class PostgresMeetingsRepository implements IMeetingsRepository {
    private meetings: Meetings[] = [];

    async findByPeriod(start: string): Promise<Meetings> {
        const meeting = this.meetings.find(start => meeting.start === start);

        return meeting;
    }

    async save(meeting: Meetings): Promise<void> {
        const data = require('./dbmeetings.json')

        data.push({
            id: meeting.id,
            calendarId: meeting.calendarId,
            title: meeting.title,
            category: "time",
            start: meeting.start,
            end: meeting.end
        });

        this.meetings.push(meeting);
    }

    async listAll(): Promise<Meetings> {
        const data = require('./dbmeetings.json')

        return data;
    }
}