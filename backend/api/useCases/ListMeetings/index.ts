import { PostgresMeetingsRepository } from "../../repositories/implementations/PostgresMeetingsRepository";
import { ListMeetingsUserCase } from "./ListMeetingsUserCase";
import { ListMeetingsController } from "./ListMeetingsController";

const postgresMeetingsRepository = new PostgresMeetingsRepository()

const listMeetingsUserCase = new ListMeetingsUserCase(
    postgresMeetingsRepository
)

const listMeetingsController = new ListMeetingsController(
    listMeetingsUserCase
)

export { postgresMeetingsRepository, listMeetingsController }