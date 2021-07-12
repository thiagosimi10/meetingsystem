import { uuid } from 'uuidv4'

export class Meetings {
    public readonly id: string;
    
    public calendarId: string;
    public title: string;
    public location: string;
    public category: string;
    public start: string;
    public end: string;

    constructor(props: Omit<Meetings, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}