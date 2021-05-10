import { Meetings } from "../entities/Meetings";

export interface IMeetingsRepository {
    findByPeriod(start: string): Promise<Meetings>;
    save(meeting: Meetings): Promise<void>;
    listAll(): Promise<Meetings>;
}