import { Meetings } from "../../entities/Meetings";
import { IMeetingsRepository } from "../IMeetingsRepository";


export class PostgresMeetingsRepository implements IMeetingsRepository {
    private meetings: Meetings[] = [{
        id: '3',
        calendarId: '1',
        title: 'Workshop Vinicius',
        category: 'time',
        start: '2021-05-14 15:00:00',
        end: '2021-05-14 18:00:00',
    }];

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