import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProviders";
import { PostgresMeetingsRepository } from "../../repositories/implementations/PostgresMeetingsRepository";
import { CreateMeetingUserCase } from "./CreateMeetingUserCase";
import { CreateMeetingController } from "./CreateMeetingController";

const mailtrapMailProvider = new MailtrapMailProvider()
const postgresMeetingsRepository = new PostgresMeetingsRepository()

const createMeetingUserCase = new CreateMeetingUserCase(
    postgresMeetingsRepository,
    mailtrapMailProvider
)

const createMeetingController = new CreateMeetingController(
    createMeetingUserCase
)

export { createMeetingUserCase, createMeetingController }